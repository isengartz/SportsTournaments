import { Rival } from '../../../interfaces/Rival';

export default interface RivalFactory {
  makeRival(name: string, rating: number): Rival;
}
