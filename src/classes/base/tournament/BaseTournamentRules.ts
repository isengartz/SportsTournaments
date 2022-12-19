import { TournamentRules } from '../../../interfaces/TournamentRules';
import { GameFormat } from '../../../interfaces/GameFormat';

export default class BaseTournamentRules implements TournamentRules {
  _gameFormat: GameFormat;
  _numberOfPlayers: number;
  _shouldLogEvents: boolean;
  constructor(
    gameFormat: GameFormat,
    numberOfPlayers: number,
    shouldLogEvents: boolean,
  ) {
    this._gameFormat = gameFormat;
    this._numberOfPlayers = numberOfPlayers;
    this._shouldLogEvents = shouldLogEvents;
  }
  gameFormat(): GameFormat {
    return this._gameFormat;
  }

  numberOfPlayers(): number {
    return this._numberOfPlayers;
  }

  shouldLogGameEvents(): boolean {
    return this._shouldLogEvents;
  }
}
