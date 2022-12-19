import { Rival } from '../../interfaces/Rival';
import BaseRival from '../base/rival/BaseRival';

export enum FootballPlayerType {
  GOAL_KEEPER,
  DEFENSE,
  OFFENSE,
}
const BASE_CHANCE_PERCENT_TO_SCORE_FOR_OFFENSE_PLAYER = 0.3;
const BASE_CHANCE_PERCENT_TO_SCORE_FOR_DEFENSIVE_PLAYER = 0.1;
const BASE_CHANCE_PERCENT_TO_SCORE_FOR_GOAL_KEEPER = 0;
export default class FootballPlayer extends BaseRival implements Rival {
  _scoreChance: number = 0;
  _playerType: FootballPlayerType;

  constructor(name: string, rating: number, playerType: FootballPlayerType) {
    super(name, rating);
    this._playerType = playerType;
    this._calculateBaseStats();
  }
  _calculateBaseStats(): void {
    if (this._playerType === FootballPlayerType.GOAL_KEEPER) {
      this._scoreChance = BASE_CHANCE_PERCENT_TO_SCORE_FOR_GOAL_KEEPER;
      return;
    }
    const chanceBasedOnRating = this._rating / 10;
    this._scoreChance = chanceBasedOnRating + this._getChanceBasedOnType();
  }
  _getChanceBasedOnType(): number {
    switch (this._playerType) {
      case FootballPlayerType.GOAL_KEEPER:
        return 0;
      case FootballPlayerType.DEFENSE:
        return BASE_CHANCE_PERCENT_TO_SCORE_FOR_DEFENSIVE_PLAYER;
      case FootballPlayerType.OFFENSE:
        return BASE_CHANCE_PERCENT_TO_SCORE_FOR_OFFENSE_PLAYER;
      default:
        return 0;
    }
  }
}
