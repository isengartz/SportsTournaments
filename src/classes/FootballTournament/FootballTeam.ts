import RivalTeam from '../base/rival/RivalTeam';
import { Rival } from '../../interfaces/Rival';
import { Team } from '../../interfaces/Team';
import FootballPlayer, { FootballPlayerType } from './FootballPlayer';
import { InvalidDataError } from '../../exceptions/InvalidDataError';

const VALID_NUMBER_OF_FOOTBALL_PLAYERS = 11;
export default class FootballTeam extends RivalTeam implements Rival {
  _team: FootballPlayer[] = [];
  constructor(team: FootballPlayer[], name: string) {
    super(team, name);
    this._team = team;
  }

  play() {
    super.play();
    const someoneScored = this._team.some((player) => player.getScore() === 1);
    if (someoneScored) {
      this._score += 1;
    }
  }
  isValidTeam(): boolean {
    return this._teamHasElevenPlayers() && this._teamHasGoalkeeper();
  }
  _teamHasElevenPlayers(): boolean {
    return this._team.length === VALID_NUMBER_OF_FOOTBALL_PLAYERS;
  }
  _teamHasGoalkeeper(): boolean {
    const numberOfKeepers = this._team.reduce((previousValue, currentValue) => {
      const isGoalkeeper =
        currentValue.getPlayerPosition() === FootballPlayerType.GOAL_KEEPER;
      return isGoalkeeper ? previousValue + 1 : previousValue;
    }, 0);
    if (numberOfKeepers > 1) {
      throw new InvalidDataError(
        `Team ${this.getName()} has more than 1 goalkeeper.`,
      );
    }
    return numberOfKeepers === 1;
  }

  getTeamPlayers(): FootballPlayer[] {
    return this._team;
  }
}
