import Tournament from '../../interfaces/Tournament';
import FightingTournament from '../base/tournament/FightingTournament';
import { GameType } from '../../interfaces/GameType';

export class UFCTournament extends FightingTournament implements Tournament {
  getType(): GameType {
    return GameType.UFC;
  }
}
