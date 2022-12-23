import FootballPlayer, { FootballPlayerType } from '../FootballPlayer';
import { generateFootballTeam } from '../../../seeders/footballTeamSeeder';
import { InvalidDataError } from '../../../exceptions/InvalidDataError';

describe('Testing football team', () => {
  it('isValid should return false when a team has more than 1 goalkeeper', () => {
    const team = generateFootballTeam();
    // Change the player at position 1 to be a goalkeeper too
    team._team[1] = new FootballPlayer(
      'Takis Gkonias',
      9,
      FootballPlayerType.GOAL_KEEPER,
    );
    expect(() => team.isValidTeam()).toThrow();
  });

  it('isValid should throw an error when a team has no goalkeepers', () => {
    const team = generateFootballTeam();
    // Change the goalkeeper to be another type of player
    team._team[0] = new FootballPlayer(
      'Takis Gkonias',
      9,
      FootballPlayerType.OFFENSE,
    );
    expect(team.isValidTeam()).toEqual(false);
  });

  it('isValid should return false when a team has no eleven players', () => {
    const team = generateFootballTeam();
    team._team.push(
      new FootballPlayer('Takis Gkonias', 9, FootballPlayerType.OFFENSE),
    );

    expect(team.isValidTeam()).toEqual(false);
  });

  it('isValid should return true when a team has eleven players', () => {
    const team = generateFootballTeam();
    expect(team.isValidTeam()).toEqual(true);
  });
});
