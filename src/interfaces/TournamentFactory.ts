import Tournament from './Tournament';
import GameFactory from './GameFactory';
import { TournamentRules } from './TournamentRules';

export default interface TournamentFactory {
  createTournament(
    gameFactory: GameFactory,
    tournamentRules: TournamentRules,
  ): Tournament;
}
