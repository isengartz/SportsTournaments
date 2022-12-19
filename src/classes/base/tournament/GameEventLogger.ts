import { Logger } from '../../../interfaces/Logger';

export default class GameEventLogger implements Logger {
  _messages: String[] = [];
  log(message: String): void {
    this._messages.push(message);
  }
  getLogs(): String[] {
    return this._messages;
  }
}
