import { GameType } from '../../../interfaces/GameType';
import GameFactory from '../../../interfaces/GameFactory';
import FightingGameFactory from './FightingGameFactory';
import { WrongGameTypeError } from '../../../exceptions/WrongGameTypeError';

export default abstract class GameFactoryCreator {
  static create(type: GameType): GameFactory {
    switch (type) {
      case GameType.UFC:
        return new FightingGameFactory();
      default:
        throw new WrongGameTypeError();
    }
  }
}
