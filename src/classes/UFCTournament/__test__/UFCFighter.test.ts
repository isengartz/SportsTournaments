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
    const RANDOM_DAMAGE = 5;
    const mockedDamageReceived = jest.spyOn(fighterReceiver, 'attacked');
    mockedDamageReceived.mockImplementation(() => RANDOM_DAMAGE);
    fighter.attack(fighterReceiver);
    expect(mockedDamageReceived).toHaveBeenCalledTimes(1);
    expect(fighter.getScore()).toEqual(RANDOM_DAMAGE);
  });
});
