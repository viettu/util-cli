import {injectable} from 'inversify';
import commander from 'commander';
import {LogService} from '../shared/logger';

@injectable()
export abstract class BaseCommand<T> {
  protected readonly logger: LogService;
  protected commandName = '';
  constructor() {
    this.logger = new LogService();
  }

  registerCommand(rootCommand: commander.Command): void {
    const command = this.configureCommand(rootCommand.command(this.commandName));
    command.action(async (cmdObj: T) => {
      try {
        await this.execute(cmdObj);
      } catch (err) {
        console.log(`${err}`);
        process.exit(1);
      }
    });
  }

  get name(): string {
    return this.commandName;
  }

  /**
   * Configure command options and description
   * @param command
   */
  abstract configureCommand(command: commander.Command): commander.Command;

  /**
   * Execute command
   * @param cmdObj
   */
  abstract execute(cmdObj: T): Promise<unknown>;
}
