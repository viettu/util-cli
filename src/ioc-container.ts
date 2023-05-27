import 'reflect-metadata';
import {Container} from 'inversify';
import {AvailableCommands} from './commands/available-commands';
import {BaseCommand} from './commands/base';

export class IocContainer {
  private iocContainer: Container;

  constructor() {
    this.iocContainer = new Container({autoBindInjectable: true, defaultScope: 'Singleton'});
  }

  get container(): Container {
    return this.iocContainer;
  }

  get availableCommands(): BaseCommand<unknown>[] {
    return this.iocContainer.get(AvailableCommands).commands;
  }
}
