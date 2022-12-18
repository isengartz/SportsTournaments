import Tournament from '../../interfaces/Tournament';
import { Rival } from '../../interfaces/Rival';
import { TournamentResult } from '../../interfaces/TournamentResult';

import { Round } from '../../interfaces/Round';
import { WrongInputSizeError } from '../../exceptions/WrongInputSizeError';
import { shuffleArray } from '../../utils';
import GameFactory from '../../interfaces/GameFactory';
import { GameType } from '../../interfaces/GameType';
import { DuplicateRivalNameError } from '../../exceptions/DuplicateRivalNameError';

export default abstract class AbstractTournament implements Tournament {
  _rivals: Rival[] = [];
  _remainingRivals: Rival[] = [];
  _rounds: Round[] = [];
  _gameFactory: GameFactory;

  constructor(gameFactory: GameFactory) {
    this._gameFactory = gameFactory;
  }

  public addContestant(rival: Rival): void {
    if (this._rivalNameAlreadyExists(rival)) {
      throw new DuplicateRivalNameError(
        `Rival: ${rival.getName()} already exists`,
      );
    }
    this._rivals.push(rival);
  }
  private _rivalNameAlreadyExists(rival: Rival): boolean {
    return this._rivals.reduce((previousValue, currentValue) => {
      return previousValue || currentValue.getName() === rival.getName();
    }, false);
  }

  public getResult(): TournamentResult {
    return this._rounds;
  }

  public printRounds(): void {
    const resultTable = this._rounds
      .flat(2)
      .reverse()
      .map((game) => ({
        match: game
          .getRivals()
          .map((rival) => rival.getName())
          .join(' - '),
        winner: game.getWinner()?.getName(),
        loser: game.getLoser()?.getName(),
      }));
    console.table(resultTable);
  }

  public async start(): Promise<void> {
    if (!this.canTournamentStart()) {
      throw new WrongInputSizeError();
    }
    await this._start();
  }
  public async _start(): Promise<void> {
    this._rounds = [];
    this._createMatchups();

    while (this._shouldKeepPlaying()) {
      await this._playRound();
    }
  }
  protected _createMatchups(): void {
    this._remainingRivals = shuffleArray(this._rivals);
  }
  protected _eliminateLoser(loser: Rival): void {
    this._remainingRivals = this._remainingRivals.filter(
      (rival) => rival !== loser,
    );
  }
  protected _shouldKeepPlaying(): boolean {
    return this._remainingRivals.length > 1;
  }

  public abstract getType(): GameType;
  public abstract canTournamentStart(): boolean;
  protected abstract _playRound(): Promise<void>;
}
