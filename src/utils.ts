import BaseTournamentRules from './classes/base/tournament/BaseTournamentRules';
import BaseTournamentRulesBuilder from './classes/base/tournament/BaseTournamentRulesBuilder';
import { TournamentRules } from './interfaces/TournamentRules';

export const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map<{ value: T; sort: number }>((value: T) => ({
      value,
      sort: Math.random(),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const promisifyFunction = <T>(
  callbackFn: (...args: Array<any>) => T,
): Promise<T | void> => {
  return new Promise<T | void>((resolve, reject) => {
    process.nextTick(() => {
      try {
        const callBackResult = callbackFn();
        callBackResult ? resolve(callBackResult) : resolve();
      } catch (e) {
        reject(e);
      }
    }, 0);
  });
};
const ONE_HUNDRED_PERCENTAGE = 100;
export const randomNumberFromOneToHundred = () => {
  return (
    ((Math.random() * ONE_HUNDRED_PERCENTAGE) % ONE_HUNDRED_PERCENTAGE) + 1
  );
};

export const buildBaseTournamentRules = (): TournamentRules => {
  return new BaseTournamentRulesBuilder().build();
};
