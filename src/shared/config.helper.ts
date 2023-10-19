import {injectable} from 'inversify';
import yaml from 'js-yaml';
import {existsSync, readFileSync} from 'fs';
import execa from 'execa';
import {get} from 'lodash';
import appConfig from 'config';
import {SecretFiles} from './constants';

@injectable()
export class ConfigHelper {
  private readonly configCollection: {[index: string]: unknown} = {};

  get apiUrl(): string {
    return appConfig.get('apiUrl');
  }

  private loadConfig(file: SecretFiles, isEncrypted: boolean): any {
    const configPath = `${process.cwd()}/config/${file}`;

    if (!existsSync(configPath)) {
      throw new Error(`File ${configPath} is not found`);
    }

    let configData = this.configCollection[file];
    if (configData) {
      return configData;
    }

    if (isEncrypted) {
      const {stdout} = execa.sync('sops', ['--decrypt', configPath]);
      configData = yaml.load(stdout);
    } else {
      configData = yaml.load(readFileSync(configPath, {encoding: 'utf8'}));
    }

    this.configCollection[file] = configData;
    return configData;
  }

  public getSecretValue(file: SecretFiles, propertyPath: string): any {
    const configValues = this.loadConfig(file, true);
    return get(configValues, propertyPath);
  }
}
