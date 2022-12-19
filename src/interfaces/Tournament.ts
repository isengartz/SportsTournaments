import { TournamentResult } from './TournamentResult';
import { Rival } from './Rival';
import { GameType } from './GameType';
import { Logger } from './Logger';

export default interface Tournament {
  getType(): GameType;
  start(logger: Logger): Promise<void>;
  getResult(): TournamentResult;
  addContestant(rival: Rival): void;
}
