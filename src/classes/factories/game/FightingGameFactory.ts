import GameFactory from '../../../interfaces/GameFactory';
import { Game } from '../../../interfaces/Game';
import { FightingGame } from '../../base/game/FightingGame';
import Fighter from '../../base/rival/Fighter';

export default class FightingGameFactory implements GameFactory {
  createGame(rivals: Fighter[]): Game {
    return new FightingGame(rivals);
  }
}
