import {injectable} from 'inversify';
import {Command} from 'commander';
import clipboard from 'clipboardy';

import {BaseCommand} from '../base';
import {HttpService} from '../../shared/http.service';

export interface GetTokenParams {
  clipboard: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

@injectable()
export class GetTokenCommand extends BaseCommand<GetTokenParams> {
  constructor(private readonly httpService: HttpService) {
    super('get-token');
  }

  configureCommand(command: Command): Command {
    return command
      .description('Get tokens and copy access token to clipboard')
      .option('-c, --clipboard', 'Copy to clipboard');
  }

  async execute(params: GetTokenParams): Promise<any> {
    const tokens = await this.httpService.getEngineeringToken();
    if (params.clipboard) {
      clipboard.writeSync(tokens.accessToken);
      console.log(`${clipboard.readSync()}`);
    } else {
      console.log(`${tokens.accessToken}`);
    }
    return tokens;
  }
}
