import Tournament from '../../../interfaces/Tournament';
import AbstractTournament from './AbstractTournament';
import { Game } from '../../../interfaces/Game';
import { GameType } from '../../../interfaces/GameType';
import { Logger } from '../../../interfaces/Logger';
import { WrongInputSizeError } from '../../../exceptions/WrongInputSizeError';

export default class FightingTournament
  extends AbstractTournament
  implements Tournament
{
  public canTournamentStart(): boolean {
    if (this._rivals.length === 0) {
      return false;
    }
    // is even number
    return this._rivals.length / 2 - 1 === 0;
  }

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

  getType(): GameType {
    return GameType.MIXED_MARTIAL_ARTS;
  }
}
