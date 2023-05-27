import {injectable} from 'inversify';
import {Command} from 'commander';
import {BaseCommand} from '../base';
import {Logger} from '../../shared/logger';
import {PasswordHelper} from './password-verify.helper';

export interface PasswordVerifyParams {
  saltHex?: string;
  saltFile?: string;
  pass: string;
  hashPass: string;
}

@injectable()
export class PasswordVerifyCommand extends BaseCommand<PasswordVerifyParams> {
  constructor(private logger: Logger, private readonly passwordHelper: PasswordHelper) {
    super('password-verify');
  }

  configureCommand(command: Command): Command {
    return command
      .description('Hash password')
      .option('--saltHex <text>', 'Salt in HEX characters')
      .option('--saltFile <text>', 'Salt file')
      .option('--pass <text>', 'Password to verify')
      .option('--hashPass <text>', 'Verify hashed password');
  }

  async execute(params: PasswordVerifyParams): Promise<boolean> {
    const {saltHex = '', saltFile = '', pass, hashPass} = params;

    if (!saltHex && !saltFile) {
      this.logger.error('Need provide salt');
      return false;
    }

    const saltBuffer = saltHex
      ? this.passwordHelper.convertHexToBuffer(saltHex)
      : this.passwordHelper.readSaltFile(saltFile);

    const hash = await this.passwordHelper.hashPassword(pass, saltBuffer, 27500, 64, 'sha256');
    if (hash === hashPass) {
      this.logger.success(`VALIDATE SUCCESS`);
    } else {
      this.logger.error(`VALIDATE FAILED`, hash);
    }

    return hash === hashPass;
  }
}
