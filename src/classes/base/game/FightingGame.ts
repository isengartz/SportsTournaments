import { Game } from '../../../interfaces/Game';
import { Score } from '../../../interfaces/Score';
import { WrongInputSizeError } from '../../../exceptions/WrongInputSizeError';
import Fighter from '../rival/Fighter';
import { Rival } from '../../../interfaces/Rival';
import { promisifyFunction } from '../../../utils';

const GAME_TYPE = 'FightingGame';
const CORRECT_NUMBER_OF_RIVALS_GAME_SIZE = 2;
const FIGHTER_STARTING_HP = 100;
type HealthPoints = [number, number];

export class FightingGame implements Game {
  _score: Score = [0, 0];
  _rivals: Fighter[] = [];
  _type: string = '';
  _rivalHealthPoints: HealthPoints = [FIGHTER_STARTING_HP, FIGHTER_STARTING_HP];

  _winner: Fighter | null = null;
  _loser: Fighter | null = null;

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

  async _start(): Promise<void> {
    return promisifyFunction(this._fight.bind(this));
  }

  /**
   * This is a recursive method!
   */
  _fight() {
    if (this._fightHasFinished()) {
      return this._finishFight();
    }
    const [rivalA, rivalB] = this._rivals;

    this._performAttack(rivalA, rivalB);
    if (this._fightHasFinished()) {
      return this._finishFight();
    }
    this._performAttack(rivalB, rivalA);
    this._fight();
  }

  _performAttack(actor: Fighter, receiver: Fighter): void {
    actor.attack(receiver);
    const damagePerformed = actor.getScore();
    const receiverIndex = this._rivals.findIndex(
      (fighter) => fighter === receiver,
    );
    this._rivalHealthPoints[receiverIndex] -= damagePerformed;
  }

  _finishFight(): void {
    const winnerIndex = this._rivalHealthPoints.findIndex(
      (healthPoint) => healthPoint > 0,
    );
    this._score[winnerIndex] += 1;
    this._winner = this._rivals[winnerIndex];
    this._loser = this._rivals[this._rivals.length - 1 - winnerIndex];
  }

  _fightHasFinished(): boolean {
    return this._rivalHealthPoints.some((healthPoint) => healthPoint <= 0);
  }
}
