import Tournament from './Tournament';
import GameFactory from './GameFactory';

export default interface TournamentFactory {
  createTournament(gameFactory: GameFactory): Tournament;
}
