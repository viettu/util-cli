import {injectable} from 'inversify';
import {Command} from 'commander';
import Axios, {AxiosInstance} from 'axios';
import clipboard from 'clipboardy';

import {BaseCommand} from '../command';
import {Logger} from '../../shared/logger';
import {ConfigHelper} from '../../shared/config.helper';

type ENVs = 'dev' | 'staging' | 'sandbox' | 'pre-prod';

export interface GetTokenParams {
  env: ENVs;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

@injectable()
export class GetTokenCommand extends BaseCommand<GetTokenParams> {
  private readonly axiosInstance: AxiosInstance = Axios;
  constructor(private logger: Logger, private readonly config: ConfigHelper) {
    super('get-token');
  }

  configureCommand(command: Command): Command {
    return command
      .description('Get tokens')
      .option('--env <text>', 'Environment dev|pre-prod|staging|sandbox|prod');
  }

  private async getToken(env: ENVs): Promise<Tokens> {
    const {domain, user, password} = this.config.getSecretValue('tokens.enc.yaml', `${env}`);
    const url = `https://${domain}/api/iam/setel-external-services/auth/login`;
    const response = await this.axiosInstance.post(url, {identifier: user, password});
    return response.data;
  }

  async execute(params: GetTokenParams): Promise<any> {
    const {env = 'dev'} = params;
    const tokens = await this.getToken(env);
    clipboard.writeSync(tokens.accessToken);
    this.logger.success(`${clipboard.readSync()}`);
    return tokens;
  }
}
