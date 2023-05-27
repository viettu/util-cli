import {injectable} from 'inversify';
import {Command} from 'commander';
import * as jsonwebtoken from 'jsonwebtoken';

import {BaseCommand} from '../base';
import {Logger} from '../../shared/logger';
import {ConfigHelper} from '../../shared/config';

type ENVs = 'dev' | 'staging' | 'sandbox' | 'pre-prod' | 'prod';

export interface GetTokenParams {
  env: ENVs;
  token: string;
}

@injectable()
export class CheckAccessCommand extends BaseCommand<GetTokenParams> {
  constructor(private logger: Logger, private readonly config: ConfigHelper) {
    super('check-access');
  }

  configureCommand(command: Command): Command {
    return command
      .description('Check access of tokens')
      .option('e, --env <text>', 'environment must be one of dev|pre-prod|staging|sandbox|prod')
      .requiredOption('t, --token <text>', 'token to verify');
  }

  createPEM(privateKey: string, privateMode = true): string {
    const begin = privateMode ? '-----BEGIN RSA PRIVATE KEY-----' : '-----BEGIN PUBLIC KEY-----';
    const end = privateMode ? `-----END RSA PRIVATE KEY-----` : '-----END PUBLIC KEY-----';
    const delimiter = '\r\n';
    const finalArr = [begin];
    const numOfLines = privateKey.length / 64;
    const fixedNum = parseInt(`${numOfLines}`, 0);
    const iterations = numOfLines - fixedNum === 0 ? fixedNum : fixedNum + 1;
    if (iterations && iterations > 0) {
      for (let i = 0; i <= iterations; ++i) {
        finalArr.push(privateKey.substr(i * 64, 64));
      }
    }
    return finalArr.join(delimiter).concat(end).concat(delimiter);
  }

  private async verifyToken(env: ENVs, token: string): Promise<any> {
    const {publicKey} = this.config.getSecretValue('tokens.enc.yaml', `${env}`);
    const pem = this.createPEM(publicKey, false);
    
    return new Promise((resolve, rejects) => {
      jsonwebtoken.verify(token, pem, (err, decoded) => {
        if(err) {
          rejects(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  async execute(params: GetTokenParams): Promise<any> {
    const {env = 'dev', token} = params;
    console.log(params);
    try {
      const data = await this.verifyToken(env, token);
      this.logger.success("SUCCESS", data);
    } catch(err) {
      console.log(err);
    }
  }
}
