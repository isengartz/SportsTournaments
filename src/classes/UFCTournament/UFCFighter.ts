import { Rival } from '../../interfaces/Rival';
import Fighter from '../base/Fighter';
import Fightable from '../../interfaces/Fightable';

const CRITICAL_STRIKE_DAMAGE_MULTIPLIER = 2;
const ATTACK_IS_KICK_PERCENTAGE = 30;
const EXTRA_KICK_DAMAGE = 2;
export default class UFCFighter extends Fighter implements Rival, Fightable {
  constructor(name: string, rating: number) {
    super(name, rating);
  }
  calculateDamage(): number {
    const isAttackCritical = this._isCriticalDamage();
    const baseDamage = this._kickOrPunchDamage();
    return isAttackCritical
      ? baseDamage * CRITICAL_STRIKE_DAMAGE_MULTIPLIER
      : baseDamage;
  }

  private _kickOrPunchDamage(): number {
    const isKick =
      ATTACK_IS_KICK_PERCENTAGE >= Math.floor(Math.random() * 100) + 1;
    return isKick ? this._attackPower + EXTRA_KICK_DAMAGE : this._attackPower;
  }
}
