import { injectable } from "inversify";
import yaml from 'js-yaml';
import {existsSync, readFileSync} from 'fs';
import execa from "execa";
import { get } from "lodash";

@injectable()
export class ConfigHelper {
  private readonly configCollection: {[index: string]: unknown} = {};

  private loadConfig(configFileName: string, isEncrypted: boolean) {
    const configPath = `${process.cwd()}/configs/${configFileName}`;

    if(!existsSync(configPath)) {
      throw new Error(`File ${configPath} is not found`);
    }

    let configData = this.configCollection[configFileName];
    if(configData) {
      return configData;
    }

    if (isEncrypted) {
      const {stdout} = execa.sync('sops', ['--decrypt', configPath])
      configData = yaml.load(stdout);
    } else {
      configData = yaml.load(readFileSync(configPath, {encoding: 'utf8'}));
    }

    this.configCollection[configFileName] = configData;
    return configData;
  }

  public getValue(configFileName: string, propertyPath: string){
    const configValues = this.loadConfig(configFileName, false);
    return get(configValues, propertyPath);
  }

  public getSecretValue(configFileName: string, propertyPath: string) {
    const configValues = this.loadConfig(configFileName, true);
    return get(configValues, propertyPath);
  }
}