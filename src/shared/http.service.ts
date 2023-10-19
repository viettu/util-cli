import {injectable} from 'inversify';
import Axios, {AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';
import {ConfigHelper} from './config.helper';
import {IAMNamespaces, SecretFiles} from './constants';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

@injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance = Axios;
  private tokens: Tokens | undefined = undefined;

  constructor(private readonly configHelper: ConfigHelper) {
    this.axiosInstance.defaults.baseURL = `https://${this.configHelper.apiUrl}`;
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (!this.tokens && !config.url?.endsWith('/auth/login')) {
        this.tokens = await this.getEngineeringToken();
      }

      if (this.tokens) {
        config.headers['access-token'] = this.tokens.accessToken;
      }

      return config;
    });
  }

  public async getEngineeringToken(): Promise<Tokens> {
    const url = `/api/iam/${IAMNamespaces.SETEL_EXTERNAL_SERVICES}/auth/login`;
    const {identifier, password} = this.configHelper.getSecretValue(
      SecretFiles.Users,
      `${IAMNamespaces.SETEL_EXTERNAL_SERVICES}`,
    );
    const {data} = await this.axiosInstance.post(url, {identifier, password});
    return data;
  }

  private async callHttpMethod<T = any>(
    httpMethod: (...args: any[]) => AxiosPromise<T>,
    ...args: any[]
  ): Promise<any> {
    try {
      const response = await httpMethod(...args);
      return response.data;
    } catch (err) {
      // TODO: refresh token?
      // throw err;
      console.log((err as AxiosError).response?.data);
    }
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.get, url, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.delete, url, config);
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.head, url, config);
  }

  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.post, url, data, config);
  }

  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.put, url, data, config);
  }

  patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.callHttpMethod<T>(this.axiosInstance.patch, url, data, config);
  }
}
