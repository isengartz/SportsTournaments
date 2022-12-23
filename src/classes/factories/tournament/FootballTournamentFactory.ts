import TournamentFactory from '../../../interfaces/TournamentFactory';
import Tournament from '../../../interfaces/Tournament';
import GameFactory from '../../../interfaces/GameFactory';
import { TournamentRules } from '../../../interfaces/TournamentRules';
import FootballTournament from '../../FootballTournament/FootballTournament';

export default class FootballTournamentFactory implements TournamentFactory {
  createTournament(
    gameFactory: GameFactory,
    tournamentRules: TournamentRules,
  ): Tournament {
    return new FootballTournament(gameFactory, tournamentRules);
  }
}
