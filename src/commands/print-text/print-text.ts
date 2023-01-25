import { injectable } from 'inversify';
import { Command } from 'commander';
import { BaseCommand } from '../command';
import { Logger } from '../../shared/logger';

@injectable()
export class PrintTextCommand extends BaseCommand<PrintTextParams> {
    constructor(private logger: Logger) {
        super('print-text');
    }

    configureCommand(command: Command): Command {
        return command
        .description('Print a text to console')
        .option('--text <text>', '', '');
    }

    async execute(params: PrintTextParams): Promise<void> {
        this.logger.debug(`${params.text}`);
    }
}

export interface PrintTextParams {
    text?: string;
}
