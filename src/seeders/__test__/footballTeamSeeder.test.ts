import { generateFootballTeam } from '../footballTeamSeeder';
import { FootballPlayerType } from '../../classes/FootballTournament/FootballPlayer';

describe('testing football team seeder', () => {
  it('should have 11 players', () => {
    const team = generateFootballTeam();
    expect(team.getTeamPlayers().length).toEqual(11);
  });

  it('should have 1 goalkeeper only', () => {
    const team = generateFootballTeam();
    const numberOfGoalKeepers = team
      .getTeamPlayers()
      .reduce((previousValue, currentValue) => {
        return currentValue.getPlayerPosition() ===
          FootballPlayerType.GOAL_KEEPER
          ? ++previousValue
          : previousValue;
      }, 0);
    expect(numberOfGoalKeepers).toEqual(1);
  });
});
