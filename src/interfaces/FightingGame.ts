import { Game } from './Game';
import { Score } from './Score';
import { WrongInputSizeError } from '../exceptions/WrongInputSizeError';
import Fighter from '../classes/base/Fighter';
import { GameNotFinishedError } from '../exceptions/GameNotFinishedError';
import { Rival } from './Rival';

const GAME_TYPE = 'FightingGame';
const CORRECT_NUMBER_OF_RIVALS_GAME_SIZE = 2;
type PromiseResolverFn = () => void;
type HealthPoints = [number, number];
export class FightingGame implements Game {
  _score: Score = [0, 0];
  _rivals: Fighter[] = [];
  _type: string = '';
  _rivalHealthPoints: HealthPoints = [100, 100];
  _promiseResolver: PromiseResolverFn | null = null;

  _winner: Fighter | null = null;
  _loser: Fighter | null = null;
  _attackTimeOutId: NodeJS.Timeout | null = null;
  constructor(rivals: Fighter[], type: string = GAME_TYPE) {
    if (!this._isRivalsValid(rivals)) {
      throw new WrongInputSizeError('Not correct number of rivals');
    }
    this._rivals = rivals;
    this._type = type;
  }
  _isRivalsValid(rivals: Rival[]): boolean {
    const uniqueRivalNames = new Set(rivals.map((rival) => rival.getName()));
    return uniqueRivalNames.size > 0 && uniqueRivalNames.size % 2 === 0;
  }
  getRivals(): Fighter[] {
    return this._rivals;
  }

  getScore(): Score {
    return this._score;
  }

  getType(): string {
    return this._type;
  }

  getWinner(): Fighter | null {
    return this._winner;
  }

  getLoser(): Fighter | null {
    return this._loser;
  }

  async start(): Promise<void> {
    this._tryStartGame();
    return this._start();
  }

  _tryStartGame(): void {
    if (!this._rivalSizeIsCorrect()) {
      throw new WrongInputSizeError(
        `UFC Rivals should be ${CORRECT_NUMBER_OF_RIVALS_GAME_SIZE}}. Current Size: ${this._rivals.length}`,
      );
    }
  }
  _rivalSizeIsCorrect(): boolean {
    return this._rivals.length === CORRECT_NUMBER_OF_RIVALS_GAME_SIZE;
  }

  _start(): Promise<void> {
    // @ts-ignore
    const promise = new Promise((resolve) => (this._promiseResolver = resolve));
    this._fight();
    // @ts-ignore
    return promise;
  }

  async _fight() {
    if (this._fightHasFinished()) {
      return this._finishFight();
    }
    this._keepFighting();
  }

  _keepFighting(): void {
    const [rivalA, rivalB] = this._rivals;

    this._performAttack(rivalA, rivalB);
    if (this._fightHasFinished()) {
      return this._finishFight();
    }
    this._performAttack(rivalB, rivalA);
    this._attackTimeOutId = setTimeout(() => this._fight(), 5);
  }
  _performAttack(actor: Fighter, receiver: Fighter): void {
    actor.play();
    const damageToPerform = actor.getScore();
    const damageReceived = receiver.attacked(damageToPerform);
    const receiverIndex = this._rivals.findIndex(
      (fighter) => fighter === receiver,
    );
    this._rivalHealthPoints[receiverIndex] -= damageReceived;
  }

  _finishFight(): void {
    this._attackTimeOutId && clearTimeout(this._attackTimeOutId);
    const winnerIndex = this._rivalHealthPoints.findIndex(
      (healthPoint) => healthPoint > 0,
    );
    this._score[winnerIndex] += 1;
    this._winner = this._rivals[winnerIndex];
    this._loser = this._rivals[this._rivals.length - 1 - winnerIndex];
    this._resolvePlayingPromise();
  }
  _resolvePlayingPromise(): void {
    if (this._promiseResolver !== null) {
      this._promiseResolver();
      this._promiseResolver = null;
    }
  }

  _fightHasFinished(): boolean {
    return this._rivalHealthPoints.some((healthPoint) => healthPoint <= 0);
  }
}
