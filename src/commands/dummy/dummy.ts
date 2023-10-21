import {injectable} from 'inversify';
import {Command} from 'commander';

import {BaseCommand} from '../base';

@injectable()
export class DummyCommand extends BaseCommand<any> {
  constructor() {
    super();
    this.commandName = 'dummy';
  }

  configureCommand(command: Command): Command {
    return command.description('Dummy command for testing anything');
  }

  async execute(): Promise<void> {
    this.logger.info('This is dummy info');
    this.logger.error('This is dummy error');
  }
}
