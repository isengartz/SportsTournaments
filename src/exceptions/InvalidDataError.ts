export class InvalidDataError extends Error {
  constructor(public message = 'Something is wrong....') {
    super(message);
    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}
