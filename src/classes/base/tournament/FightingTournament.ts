import Tournament from '../../../interfaces/Tournament';
import AbstractTournament from './AbstractTournament';
import { Game } from '../../../interfaces/Game';
import { GameType } from '../../../interfaces/GameType';
export default class FightingTournament
  extends AbstractTournament
  implements Tournament
{
  public canTournamentStart(): boolean {
    const rivalsLengthIsEvenNumber = this._rivals.length / 2 - 1 === 0;
    return this._rivals.length > 0 && rivalsLengthIsEvenNumber;
  }
  protected async _playRound(): Promise<void> {
    const games = this._createOneOnOneGames();
    const round: Game[] = [];
    await Promise.all(
      games.map(async (game: Game) => {
        await game.start();
        round.push(game);
        this._eliminateLoser(game.getLoser()!);
      }),
    );
    this._rounds.push(round);
  }
  _createOneOnOneGames(): Game[] {
    const numberOfGames = this._remainingRivals.length / 2;
    const games = [];
    for (let game = 0; game < numberOfGames; game++) {
      const rivalPair = this._remainingRivals.slice(0, 2);
      games.push(this._gameFactory.createGame(rivalPair));
    }
    return games;
  }

  getType(): GameType {
    return GameType.MIXED_MARTIAL_ARTS;
  }
}
