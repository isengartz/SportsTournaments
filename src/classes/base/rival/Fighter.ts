import { Rival } from '../../../interfaces/Rival';
import Fightable from '../../../interfaces/Fightable';

const ATTACK_POWER_RATIO = 0.8;
const DEFENSE_RATING_RATIO = 0.2;
const MISS_CHANCE_PERCENTAGE = 13;
const CRITICAL_STRIKE_CHANCE_PERCENTAGE = 3;
const CRITICAL_STRIKE_CHANCE_RATIO = 0.3;
const ONE_HUNDRED_PERCENTAGE = 100;

export default abstract class Fighter implements Rival {
  _name: string;
  _score: number = 0;

  _rating: number;
  _attackPower: number = 0;
  _defenseRating: number = 0;

  _missChance: number = 0;
  _criticalStrikeChance: number = 0;

  protected constructor(name: string, rating: number) {
    this._name = name;
    this._rating = rating;
    this._calculateBaseStats();
  }

  public getName(): string {
    return this._name;
  }

  public getScore(): number {
    return this._score;
  }

  public play(): void {
    return;
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
    return (
      this._criticalStrikeChance >=
      ((Math.random() * ONE_HUNDRED_PERCENTAGE) % ONE_HUNDRED_PERCENTAGE) + 1
    );
  }
  protected _isAttackDodged(): boolean {
    return (
      this._missChance >=
      ((Math.random() * ONE_HUNDRED_PERCENTAGE) % ONE_HUNDRED_PERCENTAGE) + 1
    );
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
