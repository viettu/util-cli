#!/usr/bin/env node

import select, {Separator} from '@inquirer/select';
import execa from 'execa';

async function main(): Promise<void> {
  const command: string = await select({
    message: 'Hey Eric, what can I do to help you?',
    choices: [
      {
        name: 'Dummy',
        value: `dummy`,
        description: 'For testing purpose',
      },
      {
        name: 'Get token',
        value: `get-token`,
        description: 'Get access token for different environments',
      },
      {
        name: 'Reset password',
        value: 'reset-password',
        description: 'Reset password',
      },
      new Separator(),
      // {
      //   name: 'jspm',
      //   value: 'jspm',
      //   disabled: true,
      // },
      // {
      //   name: 'pnpm',
      //   value: 'pnpm',
      //   disabled: '(pnpm is not available)',
      // },
    ],
  });

  const {stdout} = execa.sync('node', ['./dist/main.js', ...command.split(' ')] as any);
  console.log(stdout);
}

main();
