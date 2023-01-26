import 'reflect-metadata';
import {Container} from 'inversify';
import {AvailableCommands} from './commands/available-commands';
import {BaseCommand} from './commands/base-command';

export class IocContainer {
  private container: Container;

  constructor() {
    this.container = new Container({autoBindInjectable: true, defaultScope: 'Singleton'});
  }

  get availableCommands(): BaseCommand<unknown>[] {
    return this.container.get(AvailableCommands).commands;
  }
}
