import FootballPlayer, { FootballPlayerType } from '../FootballPlayer';

describe('Testing Football player', () => {
  it('should have score chance 0 when the player is a goalkeeper', () => {
    const player = new FootballPlayer(
      'Gonias',
      10,
      FootballPlayerType.GOAL_KEEPER,
    );

    expect(player._scoreChance).toEqual(0);
  });

  it('should have correct score chance when the player is not a goalkeeper', () => {
    const player = new FootballPlayer('Gonias', 10, FootballPlayerType.OFFENSE);

    expect(player._scoreChance).toBeTruthy();
  });
});
