import Fighter from '../Fighter';

class DerivedTestFighterClass extends Fighter {
  constructor(name: string, rating: number) {
    super(name, rating);
  }
  calculateDamage(): number {
    return this._rating;
  }
}
const DEFAULT_FIGHTER_RATING = 5;
describe('Test Fighter Abstract Class', () => {
  test('FighterShouldCalculateDamageCorrectly', () => {
    const fighter = new DerivedTestFighterClass('test', DEFAULT_FIGHTER_RATING);
    expect(fighter.calculateDamage()).toEqual(DEFAULT_FIGHTER_RATING);
  });
});
