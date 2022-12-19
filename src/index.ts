import { GameType } from './interfaces/GameType';

import BaseTournamentRulesBuilder from './classes/base/tournament/BaseTournamentRulesBuilder';
import TournamentSimulator from './classes/base/tournament/TournamentSimulator';

(async () => {
  const gameType = GameType.UFC;

  const tournamentRulesBuilder = new BaseTournamentRulesBuilder();
  const tournamentRules = tournamentRulesBuilder
    .withLogging()
    .withNumberOfPlayers(2)
    .build();

  await new TournamentSimulator(gameType, tournamentRules).simulate();
})();
