import { GameType } from './interfaces/GameType';

import GameFactoryCreator from './classes/factories/game/GameFactoryCreator';
import RivalFactoryCreator from './classes/factories/rival/RivalFactoryCreator';
import TournamentFactoryCreator from './classes/factories/tournament/TournamentFactoryCreator';

(async () => {
  const gameType = GameType.UFC;
  const gameFactory = GameFactoryCreator.create(gameType);
  const rivalFactory = RivalFactoryCreator.create(gameType);
  const tournamentFactory = TournamentFactoryCreator.create(gameType);

  const rival1 = rivalFactory.makeRival('Takis Gonias', 9);
  const rival2 = rivalFactory.makeRival('Mike Tyson', 8);

  const tournament = tournamentFactory.createTournament(gameFactory);
  tournament.addContestant(rival1);
  tournament.addContestant(rival2);

  await tournament.start();

  // @ts-ignore
  tournament.printRounds();
})();
