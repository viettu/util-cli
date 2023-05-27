import {injectable} from 'inversify';
import commander from 'commander';

@injectable()
export abstract class BaseCommand<T> {
  constructor(private commandName: string) {}

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
