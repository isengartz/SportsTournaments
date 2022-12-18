export class WrongInputSizeError extends Error {
  constructor(public message = 'Tournament size is not valid') {
    super(message);
    Object.setPrototypeOf(this, WrongInputSizeError.prototype);
  }
}
