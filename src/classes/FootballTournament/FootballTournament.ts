import AbstractTournament from '../base/tournament/AbstractTournament';
import Tournament from '../../interfaces/Tournament';
import { GameType } from '../../interfaces/GameType';
import FootballTeam from './FootballTeam';
import { Game } from '../../interfaces/Game';

export default class FootballTournament
  extends AbstractTournament
  implements Tournament
{
  _rivals: FootballTeam[] = [];
  protected async _playRound(): Promise<void> {
    const games = this._createOneOnOneGames();
    const round: Game[] = [];
    await Promise.all(
      games.map(async (game: Game) => {
        await game.start();
        // @TODO: Move logger inside game
        this._tournamentRules.shouldLogGameEvents() &&
          this._logger?.log(game.getWinner());
        round.push(game);
        this._eliminateLoser(game.getLoser()!);
      }),
    );
    this._rounds.push(round);
  }
  _createOneOnOneGames(): Game[] {
    const games = [];
    const remainingRivals = [...this._remainingRivals];
    while (remainingRivals.length > 0) {
      const rivalPair = remainingRivals.splice(0, 2);
      games.push(this._gameFactory.createGame(rivalPair));
    }
    return games;
  }

  canTournamentStart(): boolean {
    return this._rivals.every((team) => team.isValidTeam());
  }

  getType(): GameType {
    return GameType.FOOTBALL;
  }
}
