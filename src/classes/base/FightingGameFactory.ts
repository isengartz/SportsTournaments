import GameFactory from '../../interfaces/GameFactory';
import { Game } from '../../interfaces/Game';
import { FightingGame } from '../../interfaces/FightingGame';
import Fighter from './Fighter';

export default class FightingGameFactory implements GameFactory {
  createGame(rivals: Fighter[]): Game {
    return new FightingGame(rivals);
  }
}
