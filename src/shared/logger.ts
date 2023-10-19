import {injectable} from 'inversify';
import log from 'loglevel';
@injectable()
export class Logger {
  constructor() {}

  debug(...args: any[]): void {
    log.debug(args);
  }

  error(...args: any[]): void {
    log.error(args);
  }

  info(...args: any[]): void {
    log.info(args);
  }

  warn(...args: any[]): void {
    log.warn(args);
  }

  trace(...args: any[]): void {
    log.trace(args);
  }
}
