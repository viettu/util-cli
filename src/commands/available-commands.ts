import {injectable} from 'inversify';
import {BaseCommand} from './base';
import {PasswordVerifyCommand} from './password-verify/password-verify';
import {GetTokenCommand} from './get-token/get-token';
import {CheckAccessCommand} from './check-access/check-access';
import {ResetPasswordCommand} from './reset-passwords/reset-password';
import {DummyCommand} from './dummy/dummy';

@injectable()
export class AvailableCommands {
  readonly commands: Array<BaseCommand<unknown>>;
  constructor(
    passwordVerify: PasswordVerifyCommand,
    getToken: GetTokenCommand,
    checkAccess: CheckAccessCommand,
    resetPassword: ResetPasswordCommand,
    dummy: DummyCommand,
  ) {
    this.commands = [passwordVerify, getToken, checkAccess, resetPassword, dummy];
  }
}
