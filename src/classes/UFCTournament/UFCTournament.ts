import Tournament from '../../interfaces/Tournament';
import { TournamentType } from '../../interfaces/TournamentType';
import FightingTournament from '../base/FightingTournament';
import { GameType } from '../../interfaces/GameType';

export class UFCTournament extends FightingTournament implements Tournament {
  getType(): GameType {
    return GameType.UFC;
  }
}
