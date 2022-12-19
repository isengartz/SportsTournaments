import { GameFormat } from './GameFormat';

export interface TournamentRules {
  numberOfPlayers(): number;
  shouldLogGameEvents(): boolean;
  gameFormat(): GameFormat;
}
