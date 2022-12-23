import { faker } from '@faker-js/faker';
import FootballTeam from '../classes/FootballTournament/FootballTeam';
import FootballPlayer, {
  FootballPlayerType,
} from '../classes/FootballTournament/FootballPlayer';

const players: Set<string> = new Set();

const _generatePlayers = () => {
  while (players.size < 11) {
    players.add(faker.name.fullName());
  }
};

export const generateFootballTeam = () => {
  _generatePlayers();

  const footballPlayers = Array.from(players).map((player, index) => {
    const playerType =
      index === 0 ? FootballPlayerType.GOAL_KEEPER : FootballPlayerType.OFFENSE;
    return new FootballPlayer(
      player,
      parseInt(faker.random.numeric()),
      playerType,
    );
  });
  return new FootballTeam(footballPlayers, faker.company.name());
};
