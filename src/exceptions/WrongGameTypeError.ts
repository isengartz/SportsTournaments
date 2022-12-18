export class WrongGameTypeError extends Error {
  constructor(public message = 'Unsupported game type') {
    super(message);
    Object.setPrototypeOf(this, WrongGameTypeError.prototype);
  }
}
