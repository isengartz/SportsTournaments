import RivalTeam from '../base/rival/RivalTeam';
import { Rival } from '../../interfaces/Rival';
import { Team } from '../../interfaces/Team';

export default class FootballTeam extends RivalTeam implements Rival {
  constructor(team: Team, name: string) {
    super(team, name);
  }
}
