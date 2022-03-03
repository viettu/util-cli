import { injectable } from 'inversify';
import { BaseCommand } from './command';
import { PrintTextCommand } from './print-text/print-text';
import { HelloWorldCommand } from './hello-world/hello-world';

@injectable()
export class AvailableCommands {
    readonly commands: Array<BaseCommand<unknown>>;
    constructor(
        printText: PrintTextCommand,
        helloWorld: HelloWorldCommand
    ) {
        this.commands = [
            printText,
            helloWorld
        ];
    }
}