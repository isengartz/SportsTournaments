import { Game } from '../../../interfaces/Game';
import { Rival } from '../../../interfaces/Rival';

export default interface GameFactory {
  createGame(rivals: Rival[]): Game;
}
