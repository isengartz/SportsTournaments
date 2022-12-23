import { Rival } from '../../../interfaces/Rival';
import { Team } from '../../../interfaces/Team';

export default class RivalTeam implements Rival {
  _team: Team = [];
  _name: string;
  _score: number = 0;
  _rating: number = 0;

  constructor(team: Team, name: string) {
    this._team = team;
    this._name = name;
    this._calculateTeamRating();
  }
  _calculateTeamRating(): void {
    const playerRatingSum = this._team.reduce(
      (previousValue, currentValue) => previousValue + currentValue.getRating(),
      0,
    );
    this._rating = playerRatingSum / this._team.length;
  }
  getName(): string {
    return this._name;
  }

  getScore(): number {
    return this._score;
  }

  getRating(): number {
    return this._rating;
  }

  play(): void {
    this._team.forEach((player) => player.play());
  }

  getTeamPlayers(): Rival[] {
    return this._team;
  }
}
