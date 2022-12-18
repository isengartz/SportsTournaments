export default interface Fightable {
  attack(fightable: Fightable): void;
  attacked(damage: number): number;
}
