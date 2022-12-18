import { Rival } from './Rival';

export default interface RivalFactory {
  makeRival(name: string, rating: number): Rival;
}
