import { GameType } from '../../../interfaces/GameType';
import { WrongGameTypeError } from '../../../exceptions/WrongGameTypeError';
import RivalFactory from './RivalFactory';
import UFCFighterRivalFactory from './FighterRivalFactory';

export default abstract class RivalFactoryCreator {
  static create(type: GameType): RivalFactory {
    switch (type) {
      case GameType.UFC:
        return new UFCFighterRivalFactory();
      default:
        throw new WrongGameTypeError();
    }
  }
}
