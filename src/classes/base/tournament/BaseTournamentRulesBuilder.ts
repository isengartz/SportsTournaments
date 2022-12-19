import { TournamentRulesBuilder } from '../../../interfaces/TournamentRulesBuilder';
import { GameFormat } from '../../../interfaces/GameFormat';
import { TournamentRules } from '../../../interfaces/TournamentRules';
import BaseTournamentRules from './BaseTournamentRules';

const DEFAULT_TOURNAMENT_PLAYERS = 16;
export default class BaseTournamentRulesBuilder
  implements TournamentRulesBuilder
{
  _shouldLogGameEvents: boolean = false;
  _gameFormat: GameFormat = GameFormat.SINGLE_ELIMINATION;
  _numberOfPlayers: number = DEFAULT_TOURNAMENT_PLAYERS;

  build(): TournamentRules {
    return new BaseTournamentRules(
      this._gameFormat,
      this._numberOfPlayers,
      this._shouldLogGameEvents,
    );
  }

  withLogging(): BaseTournamentRulesBuilder {
    this._shouldLogGameEvents = true;
    return this;
  }

  withFormat(format: GameFormat): BaseTournamentRulesBuilder {
    this._gameFormat = format;
    return this;
  }

  withNumberOfPlayers(players: number): BaseTournamentRulesBuilder {
    this._numberOfPlayers = players;
    return this;
  }
}
