import { Rival } from './Rival';

type Team = Rival[];
class RivalTeam implements Rival {
  _team: Team = [];

  constructor(team: Team, name: string) {
    this._team = team;
  }
  getName(): string {
    return '';
  }

  getScore(): number {
    return 0;
  }

  play(): void {
    this._team.forEach((player) => player.play());
  }
}
