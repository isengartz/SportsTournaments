import Tournament from '../../../interfaces/Tournament';
import GameFactory from '../game/GameFactory';

export default interface TournamentFactory {
  createTournament(gameFactory: GameFactory): Tournament;
}
