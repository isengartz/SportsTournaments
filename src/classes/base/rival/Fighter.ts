import { Rival } from '../../../interfaces/Rival';
import Fightable from '../../../interfaces/Fightable';
import BaseRival from './BaseRival';
import { randomNumberFromOneToHundred } from '../../../utils';

const ATTACK_POWER_RATIO = 0.8;
const DEFENSE_RATING_RATIO = 0.2;
const MISS_CHANCE_PERCENTAGE = 13;
const CRITICAL_STRIKE_CHANCE_PERCENTAGE = 3;
const CRITICAL_STRIKE_CHANCE_RATIO = 0.3;

export default abstract class Fighter extends BaseRival implements Rival {
  _attackPower: number = 0;
  _defenseRating: number = 0;

  _missChance: number = 0;
  _criticalStrikeChance: number = 0;

  protected constructor(name: string, rating: number) {
    super(name, rating);
    this._calculateBaseStats();
  }

  public attacked(damage: number): number {
    if (this._isAttackDodged()) {
      return 0;
    }
    // Damage Received
    return damage - this._defenseRating;
  }
  public attack(enemy: Fightable): void {
    const damageToPerform = this.calculateDamage();
    this._score = enemy.attacked(damageToPerform);
  }

  abstract calculateDamage(): number;
  protected _isCriticalDamage(): boolean {
    return this._criticalStrikeChance >= randomNumberFromOneToHundred();
  }
  protected _isAttackDodged(): boolean {
    return this._missChance >= randomNumberFromOneToHundred();
  }
  protected _calculateBaseStats(): void {
    this._attackPower = ATTACK_POWER_RATIO * this._rating;
    this._defenseRating = DEFENSE_RATING_RATIO * this._rating;
    this._missChance = MISS_CHANCE_PERCENTAGE - this._rating;
    this._criticalStrikeChance =
      CRITICAL_STRIKE_CHANCE_PERCENTAGE +
      CRITICAL_STRIKE_CHANCE_RATIO * this._rating;
  }
}
