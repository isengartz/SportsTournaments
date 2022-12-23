import GameFactory from '../../../interfaces/GameFactory';
import { Game } from '../../../interfaces/Game';
import FootballGame from '../../FootballTournament/FootballGame';
import FootballTeam from '../../FootballTournament/FootballTeam';

export default class FootballGameFactory implements GameFactory {
  createGame(rivals: FootballTeam[]): Game {
    return new FootballGame(rivals);
  }
}
