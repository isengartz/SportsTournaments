import { GameType } from '../../../interfaces/GameType';
import GameFactoryCreator from '../../factories/game/GameFactoryCreator';
import RivalFactoryCreator from '../../factories/rival/RivalFactoryCreator';
import TournamentFactoryCreator from '../../factories/tournament/TournamentFactoryCreator';
import BaseLogger from './BaseLogger';
import BaseTournamentRulesBuilder from './BaseTournamentRulesBuilder';
import GameFactory from '../../../interfaces/GameFactory';
import RivalFactory from '../../../interfaces/RivalFactory';
import TournamentFactory from '../../../interfaces/TournamentFactory';
import { Logger } from '../../../interfaces/Logger';
import { TournamentRulesBuilder } from '../../../interfaces/TournamentRulesBuilder';
import { TournamentRules } from '../../../interfaces/TournamentRules';

export default class TournamentSimulator {
  _gameType: GameType;
  _gameFactory: GameFactory;
  _rivalFactory: RivalFactory;
  _tournamentFactory: TournamentFactory;
  _logger: Logger;
  _tournamentRules: TournamentRules;
  constructor(gameType: GameType, tournamentRules: TournamentRules) {
    this._gameType = gameType;
    this._gameFactory = GameFactoryCreator.create(gameType);
    this._rivalFactory = RivalFactoryCreator.create(gameType);
    this._tournamentFactory = TournamentFactoryCreator.create(gameType);
    this._logger = new BaseLogger();
    this._tournamentRules = tournamentRules;
  }
  async simulate(): Promise<void> {
    const rival1 = this._rivalFactory.makeRival('Takis Gonias', 9);
    const rival2 = this._rivalFactory.makeRival('Mike Tyson', 8);

    const tournament = this._tournamentFactory.createTournament(
      this._gameFactory,
      this._tournamentRules,
    );
    tournament.addContestant(rival1);
    tournament.addContestant(rival2);

    return tournament.start(this._logger);
  }
}
