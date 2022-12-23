import { Game } from '../../interfaces/Game';
import { promisifyFunction } from '../../utils';
import { Score } from '../../interfaces/Score';
import { Rival } from '../../interfaces/Rival';
import FootballTeam from './FootballTeam';
import { GameType } from '../../interfaces/GameType';

const NUMBER_OF_GOALS_TO_DETERMINE_WINNER = 3;
export default class FootballGame implements Game {
  _rivals: Rival[] = [];
  _score: Score = [0, 0];
  _loser: Rival | null = null;
  _winner: Rival | null = null;

  getLoser(): Rival | null {
    return this._loser;
  }

  getRivals(): Rival[] {
    return this._rivals;
  }

  getScore(): Score {
    return this._score;
  }

  getType(): string {
    return 'Football';
  }

  getWinner(): Rival | null {
    return this._winner;
  }

  start(): Promise<void> {
    return promisifyFunction(this._start.bind(this));
  }

  _start(): void {
    while (!this._gameShouldFinish()) {
      const [teamA, teamB] = this.getRivals();
      this._teamAttack(teamA);
      if (this._gameShouldFinish()) {
        break;
      }
      this._teamAttack(teamB);
    }
    this._finishGame();
  }

  _teamAttack(team: Rival) {
    team.play();
    const attackerIndex = this._rivals.findIndex(
      (attackingTeam) => attackingTeam === team,
    );
    this._score[attackerIndex] = team.getScore();
  }

  _finishGame(): void {
    const winnerIndex = this._rivals.findIndex(
      (rival) => rival.getScore() === NUMBER_OF_GOALS_TO_DETERMINE_WINNER,
    );
    this._score[winnerIndex] += 1;
    this._winner = this._rivals[winnerIndex];
    this._loser = this._rivals[this._rivals.length - 1 - winnerIndex];
  }

  _gameShouldFinish(): boolean {
    return this.getScore().every(
      (teamScore) => teamScore >= NUMBER_OF_GOALS_TO_DETERMINE_WINNER,
    );
  }
}
