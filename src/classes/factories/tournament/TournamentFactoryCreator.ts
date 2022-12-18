import { GameType } from '../../../interfaces/GameType';
import { WrongGameTypeError } from '../../../exceptions/WrongGameTypeError';
import TournamentFactory from '../../../interfaces/TournamentFactory';
import FightingTournamentFactory from './FightingTournamentFactory';

export default abstract class TournamentFactoryCreator {
  static create(type: GameType): TournamentFactory {
    switch (type) {
      case GameType.UFC:
        return new FightingTournamentFactory();
      default:
        throw new WrongGameTypeError();
    }
  }
}
