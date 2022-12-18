export class DuplicateRivalNameError extends Error {
  constructor(public message = 'Rival names should be unique') {
    super(message);
    Object.setPrototypeOf(this, DuplicateRivalNameError.prototype);
  }
}
