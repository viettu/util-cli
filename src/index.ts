#!/usr/bin/env node

import { Command } from 'commander';
import { IocContainer } from './ioc-container';

(()=> {
    const program = new Command('util-cli');
    program.version('0.0.1');

    const iocContainer = new IocContainer();
    iocContainer.availableCommands.forEach(cmd => cmd.registerCommand(program));
    
    program.action(() => {
        console.log('AAA');
    })

    program.parseAsync(process.argv);
})();