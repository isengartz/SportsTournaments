import { GameType } from '../../../interfaces/GameType';
import { WrongGameTypeError } from '../../../exceptions/WrongGameTypeError';
import RivalFactory from '../../../interfaces/RivalFactory';
import UFCFighterRivalFactory from './FighterRivalFactory';
import FootballRivalFactory from './FootballRivalFactory';

export default abstract class RivalFactoryCreator {
  static create(type: GameType): RivalFactory {
    switch (type) {
      case GameType.UFC:
        return new UFCFighterRivalFactory();
      case GameType.FOOTBALL:
        return new FootballRivalFactory();
      default:
        throw new WrongGameTypeError();
    }
  }
}
