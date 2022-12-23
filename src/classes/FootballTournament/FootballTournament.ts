import AbstractTournament from '../base/tournament/AbstractTournament';
import Tournament from '../../interfaces/Tournament';
import { GameType } from '../../interfaces/GameType';
import FootballTeam from './FootballTeam';

export default class FootballTournament
  extends AbstractTournament
  implements Tournament
{
  _rivals: FootballTeam[] = [];
  protected _playRound(): Promise<void> {
    return Promise.resolve(undefined);
  }

  canTournamentStart(): boolean {
    return this._rivals.every((team) => team.isValidTeam());
  }

  getType(): GameType {
    return GameType.FOOTBALL;
  }
}
