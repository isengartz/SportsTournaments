import { GameType } from '../../../interfaces/GameType';
import { WrongGameTypeError } from '../../../exceptions/WrongGameTypeError';
import TournamentFactory from '../../../interfaces/TournamentFactory';
import FightingTournamentFactory from './FightingTournamentFactory';
import FootballTournamentFactory from './FootballTournamentFactory';

export default abstract class TournamentFactoryCreator {
  static create(type: GameType): TournamentFactory {
    switch (type) {
      case GameType.UFC:
        return new FightingTournamentFactory();
      case GameType.FOOTBALL:
        return new FootballTournamentFactory();
      default:
        throw new WrongGameTypeError();
    }
  }
}
