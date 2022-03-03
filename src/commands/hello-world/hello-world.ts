import { injectable } from 'inversify';
import { Command } from 'commander';
import { BaseCommand } from '../command';
import { PrintTextCommand, PrintTextParams } from '../print-text/print-text';

@injectable()
export class HelloWorldCommand extends BaseCommand<void> {
    constructor(private printTextCommand: PrintTextCommand) {
        super('hello-world');
    }

    configureCommand(command: Command): Command {
        return command.description('Print a text to console');
    }

    async execute(params: void): Promise<void> {
        return await this.printTextCommand.execute(<PrintTextParams>{ text: `Hello world ${params}` });
    }
}
