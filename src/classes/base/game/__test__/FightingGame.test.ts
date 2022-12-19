import { FightingGame } from '../FightingGame';
import Fighter from '../../rival/Fighter';
import UFCFighter from '../../../UFCTournament/UFCFighter';

describe('Testing the FightingGame Class', () => {
  const createSimpleFightingGame = (): [
    FightingGame,
    UFCFighter,
    UFCFighter,
  ] => {
    const fighterA = new UFCFighter('GoodFighter', 9);
    const fighterB = new UFCFighter('TerribleFighter', 1);

    const game = new FightingGame([fighterA, fighterB]);
    return [game, fighterA, fighterB];
  };
  it('should create a new class instance', () => {
    const [game] = createSimpleFightingGame();
    expect(game).toBeTruthy();
  });

  it('should throw on duplicate fighter', () => {
    const fighterA = new UFCFighter('GoodFighter', 9);
    const fighterB = new UFCFighter('GoodFighter', 9);
    expect(() => new FightingGame([fighterA, fighterB])).toThrow();
  });

  it('should call finish fight', async () => {
    const [game] = createSimpleFightingGame();
    const finishFightMethod = jest.spyOn(game, '_finishFight');
    await game.start();
    expect(finishFightMethod).toHaveBeenCalled();
  });

  it('should have a winner and loser', async () => {
    const [game, goodFighter, badFighter] = createSimpleFightingGame();
    await game.start();
    expect(game.getWinner()).toBeTruthy();
    expect(game.getLoser()).toBeTruthy();
    // based on stats of both fighters, badFighter isn't possible to ever win :)
    expect(game.getWinner()?.getName()).toEqual(goodFighter.getName());
    expect(game.getLoser()?.getName()).toEqual(badFighter.getName());
  });

  it('should have correct scores', async () => {
    const [game, goodFighter, badFighter] = createSimpleFightingGame();
    await game.start();
    // based on stats of both fighters, badFighter isn't possible to ever win :)
    expect(game.getWinner()?.getName()).toEqual(goodFighter.getName());
    expect(game.getLoser()?.getName()).toEqual(badFighter.getName());
    const [scoreWinner, scoreLoser] = game.getScore();
    expect(scoreWinner).toEqual(1);
    expect(scoreLoser).toEqual(0);
  });

  it('should attack and attacked', async () => {
    const [game, goodFighter, badFighter] = createSimpleFightingGame();
    const goodFighterAttack = jest.spyOn(goodFighter, 'attack');
    const goodFighterAttacked = jest.spyOn(goodFighter, 'attacked');
    const badFighterAttack = jest.spyOn(badFighter, 'attack');
    const badFighterAttacked = jest.spyOn(badFighter, 'attacked');
    await game.start();
    expect(goodFighterAttack).toHaveBeenCalled();
    expect(goodFighterAttacked).toHaveBeenCalled();
    expect(badFighterAttack).toHaveBeenCalled();
    expect(badFighterAttacked).toHaveBeenCalled();
  });
});
