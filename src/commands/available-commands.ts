import {injectable} from 'inversify';
import {BaseCommand} from './command';
import {PrintTextCommand} from './print-text/print-text';
import {HelloWorldCommand} from './hello-world/hello-world';
import {PasswordVerifyCommand} from './password-verify';
import {GetTokenCommand} from './get-token';

@injectable()
export class AvailableCommands {
  readonly commands: Array<BaseCommand<unknown>>;
  constructor(
    printText: PrintTextCommand,
    helloWorld: HelloWorldCommand,
    passwordVerify: PasswordVerifyCommand,
    getToken: GetTokenCommand,
  ) {
    this.commands = [printText, helloWorld, passwordVerify, getToken];
  }
}
