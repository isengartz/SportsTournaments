import { TournamentRules } from './TournamentRules';

export interface TournamentRulesBuilder {
  build(): TournamentRules;
}
