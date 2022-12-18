import { TournamentResult } from './TournamentResult';
import { Rival } from './Rival';
import { GameType } from './GameType';

export default interface Tournament {
  getType(): GameType;
  start(): Promise<void>;
  getResult(): TournamentResult;
  addContestant(rival: Rival): void;
}
