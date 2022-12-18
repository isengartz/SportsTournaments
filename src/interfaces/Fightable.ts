export default interface Fightable {
  attack(): void;
  attacked(damage: number): number;
}
