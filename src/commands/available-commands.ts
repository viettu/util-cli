import {injectable} from 'inversify';
import {BaseCommand} from './base-command';
import {PasswordVerifyCommand} from './password-verify/password-verify';
import {GetTokenCommand} from './get-token';

@injectable()
export class AvailableCommands {
  readonly commands: Array<BaseCommand<unknown>>;
  constructor(passwordVerify: PasswordVerifyCommand, getToken: GetTokenCommand) {
    this.commands = [passwordVerify, getToken];
  }
}
