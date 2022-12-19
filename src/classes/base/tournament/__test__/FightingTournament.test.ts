import { GameType } from '../../../../interfaces/GameType';
import FightingGameFactory from '../../../factories/game/FightingGameFactory';
import FightingTournament from '../FightingTournament';
import UFCFighterRivalFactory from '../../../factories/rival/FighterRivalFactory';
import { DuplicateRivalNameError } from '../../../../exceptions/DuplicateRivalNameError';
import { Rival } from '../../../../interfaces/Rival';
import BaseLogger from '../BaseLogger';
import { buildBaseTournamentRules } from '../../../../utils';

describe('Testing FightingTournament Class', () => {
  const gameType = GameType.MIXED_MARTIAL_ARTS;
  const gameFactory = new FightingGameFactory();
  const rivalFactory = new UFCFighterRivalFactory();
  const tournamentRules = buildBaseTournamentRules();
  const createSimpleFightingTournament = (): [
    FightingTournament,
    Rival,
    Rival,
  ] => {
    const gameFactory = new FightingGameFactory();
    const rivalFactory = new UFCFighterRivalFactory();

    const tournament = new FightingTournament(gameFactory, tournamentRules);
    const contestantA = rivalFactory.makeRival('Test', 1);
    const contestantB = rivalFactory.makeRival('Test2', 9);
    tournament.addContestant(contestantA);
    tournament.addContestant(contestantB);
    return [tournament, contestantA, contestantB];
  };

  it('should create a new class instance', () => {
    const tournament = new FightingTournament(gameFactory, tournamentRules);
    expect(tournament).toBeTruthy();
  });

  it('should add contestants', () => {
    const tournament = new FightingTournament(gameFactory, tournamentRules);
    const contestantA = rivalFactory.makeRival('Test', 9);
    const contestantB = rivalFactory.makeRival('Test2', 9);
    tournament.addContestant(contestantA);
    expect(tournament._rivals.length).toEqual(1);
    tournament.addContestant(contestantB);
    expect(tournament._rivals.length).toEqual(2);
  });

  it('should throw when adding a duplicate contestant', () => {
    const tournament = new FightingTournament(gameFactory, tournamentRules);
    const contestantA = rivalFactory.makeRival('Test', 9);
    tournament.addContestant(contestantA);
    expect(tournament._rivals.length).toEqual(1);
    expect(() => tournament.addContestant(contestantA)).toThrow(
      DuplicateRivalNameError,
    );
  });

  it('should call eliminate rival only once', async () => {
    const [tournament] = createSimpleFightingTournament();
    // @ts-ignore
    const eliminateContestantMethod = jest.spyOn(tournament, '_eliminateLoser');
    await tournament.start(new BaseLogger());
    expect(eliminateContestantMethod).toHaveBeenCalledTimes(1);
  });

  it('should start the tournament', async () => {
    const [tournament] = createSimpleFightingTournament();
    await tournament.start(new BaseLogger());
    const result = tournament.getResult();
    expect(result.length).toEqual(1);
  });
});
