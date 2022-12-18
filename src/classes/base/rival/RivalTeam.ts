import { Rival } from '../../../interfaces/Rival';

type Team = Rival[];
class RivalTeam implements Rival {
  _team: Team = [];
  _name: string;
  _score: number = 0;

  constructor(team: Team, name: string) {
    this._team = team;
    this._name = name;
  }
  getName(): string {
    return this._name;
  }

  getScore(): number {
    return this._score;
  }

  play(): void {
    this._team.forEach((player) => player.play());
  }
}
