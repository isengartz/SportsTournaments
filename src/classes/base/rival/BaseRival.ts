import { Rival } from '../../../interfaces/Rival';

export default class BaseRival implements Rival {
  _name: string;
  _score: number = 0;
  _rating: number;

  constructor(name: string, rating: number) {
    this._name = name;
    this._rating = rating;
  }
  public getName(): string {
    return this._name;
  }

  public getScore(): number {
    return this._score;
  }

  public getRating(): number {
    return this._rating;
  }

  play(): void {
    return;
  }
}
