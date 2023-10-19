import {injectable} from 'inversify';
import {Command} from 'commander';
import {BaseCommand} from '../base';
import {ConfigHelper} from '../../shared/config.helper';
import {IAMNamespaces, SecretFiles} from '../../shared/constants';
import {IamService} from '../../shared/iam.service';

@injectable()
export class ResetPasswordCommand extends BaseCommand<any> {
  constructor(
    private readonly iamService: IamService,
    private readonly configHelper: ConfigHelper,
  ) {
    super('reset-password');
  }

  configureCommand(command: Command): Command {
    return command.description('Reset password');
  }

  async execute(): Promise<void> {
    const {identifiers, password} = this.configHelper.getSecretValue(
      SecretFiles.Users,
      'portals.id-portal',
    );
    if (identifiers) {
      `${identifiers}`.split(',').forEach(async (id) => {
        await this.iamService.resetUserPassword(IAMNamespaces.MASTER, id, password);
      });
    } else {
      // TODO: log for information
    }
  }
}
