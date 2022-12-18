import RivalFactory from './RivalFactory';
import UFCFighter from '../../UFCTournament/UFCFighter';

export default class UFCFighterRivalFactory implements RivalFactory {
  makeRival(name: string, rating: number): UFCFighter {
    return new UFCFighter(name, rating);
  }
}
