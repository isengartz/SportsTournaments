import RivalFactory from '../../../interfaces/RivalFactory';
import FootballTeam from '../../FootballTournament/FootballTeam';

export default class FootballRivalFactory implements RivalFactory {
  makeRival(name: string, rating: number): FootballTeam {
    return new FootballTeam([], name);
  }
}
