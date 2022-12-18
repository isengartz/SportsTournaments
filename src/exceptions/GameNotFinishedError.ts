export class GameNotFinishedError extends Error {
  constructor(public message = 'Game not finished yet') {
    super(message);
    Object.setPrototypeOf(this, GameNotFinishedError.prototype);
  }
}
