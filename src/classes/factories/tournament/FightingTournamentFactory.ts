import TournamentFactory from './TournamentFactory';
import Tournament from '../../../interfaces/Tournament';
import FightingTournament from '../../base/tournament/FightingTournament';
import GameFactory from '../game/GameFactory';

export default class FightingTournamentFactory implements TournamentFactory {
  createTournament(gameFactory: GameFactory): Tournament {
    return new FightingTournament(gameFactory);
  }
}
