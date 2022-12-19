import TournamentFactory from '../../../interfaces/TournamentFactory';
import Tournament from '../../../interfaces/Tournament';
import FightingTournament from '../../base/tournament/FightingTournament';
import GameFactory from '../../../interfaces/GameFactory';
import { TournamentRules } from '../../../interfaces/TournamentRules';

export default class FightingTournamentFactory implements TournamentFactory {
  createTournament(
    gameFactory: GameFactory,
    tournamentRules: TournamentRules,
  ): Tournament {
    return new FightingTournament(gameFactory, tournamentRules);
  }
}
