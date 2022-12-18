import TournamentFactory from '../../interfaces/TournamentFactory';
import Tournament from '../../interfaces/Tournament';
import FightingTournament from './FightingTournament';
import GameFactory from '../../interfaces/GameFactory';

export default class FightingTournamentFactory implements TournamentFactory {
  createTournament(gameFactory: GameFactory): Tournament {
    return new FightingTournament(gameFactory);
  }
}
