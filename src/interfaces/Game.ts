import { Score } from './Score';
import { Rival } from './Rival';

export interface Game {
  getScore(): Score;
  getRivals(): Rival[];
  getType(): string;
  getWinner(): Rival | null;
  getLoser(): Rival | null;

  start(): Promise<void>;
}
