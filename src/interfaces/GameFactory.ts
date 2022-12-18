import { Game } from './Game';
import { Rival } from './Rival';

export default interface GameFactory {
  createGame(rivals: Rival[]): Game;
}
