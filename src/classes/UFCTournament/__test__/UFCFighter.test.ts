import UFCFighter from '../UFCFighter';

describe('Test UFCFighter Class', () => {
  it('Should calculate base stats on instance creation', () => {
    const fighter = new UFCFighter('Rocky', 10);
    expect(fighter._attackPower).toBeTruthy();
    expect(fighter._criticalStrikeChance).toBeTruthy();
    expect(fighter._defenseRating).toBeTruthy();
    expect(fighter._missChance).toBeTruthy();
  });
  it('Should update the score with the damage gonna deal', () => {
    const fighter = new UFCFighter('Rocky', 10);
    const fighterReceiver = new UFCFighter('Rocky2', 10);

    const mockedCalculateDamage = jest.spyOn(fighterReceiver, 'attacked');
    mockedCalculateDamage.mockImplementation(() => 5);
    fighter.attack(fighterReceiver);
    expect(mockedCalculateDamage).toHaveBeenCalledTimes(1);
    expect(fighter.getScore()).toEqual(5);
  });
});
