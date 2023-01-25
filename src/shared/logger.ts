import {injectable} from 'inversify';
import chalk from 'chalk';
import {ConfigHelper} from './config.helper';

type Level = 'error' | 'warn' | 'info' | 'debug' | 'trace';
@injectable()
export class Logger {
  private levelsConfig: string[] | undefined;
  constructor(private readonly config: ConfigHelper) {}

  private isAcceptLevel(level: Level): boolean {
    if (!this.levelsConfig) {
      this.levelsConfig = this.config.getValue('config.yaml', 'logging.levels') || [];
    }
    return !!this.levelsConfig?.includes(level);
  }

  private log(level: Level, message: string, ...args: any[]): void {
    if (this.isAcceptLevel(level)) {
      switch (level) {
        case 'debug':
          console.debug(message, ...args);
          break;
        case 'info':
          console.info(message, ...args);
          break;
        case 'error':
          console.error(message, ...args);
          break;
        case 'warn':
          console.warn(message, ...args);
          break;
        case 'trace':
          console.trace(message, ...args);
          break;
        default:
          console.debug(message, ...args);
          break;
      }
    }
  }

  debug(text: string, ...args: any[]): void {
    this.log('debug', chalk.greenBright(text), ...args);
  }

  error(text: string, ...args: any[]): void {
    this.log('error', chalk.red(text), ...args);
  }

  info(text: string, ...args: any[]): void {
    this.log('info', chalk.blue(text), ...args);
  }

  warn(text: string, ...args: any[]): void {
    this.log('warn', chalk.blue(text), ...args);
  }

  success(text: string, ...args: any[]): void {
    this.log('info', chalk.green(text), ...args);
  }
}
