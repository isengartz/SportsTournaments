import { Logger } from '../../../interfaces/Logger';

export default class BaseLogger implements Logger {
  log(message: any): void {
    console.log(message);
  }
}
