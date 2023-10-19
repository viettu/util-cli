import {injectable} from 'inversify';
import {IAMNamespaces} from './constants';
import {HttpService} from './http.service';
import {IUser} from './dto';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

@injectable()
export class IamService {
  constructor(private readonly httpService: HttpService) {}

  async findUserByIndentifier(
    namespace: IAMNamespaces,
    identifier: string,
  ): Promise<IUser | undefined> {
    const params = new URLSearchParams({identifier});
    const users = await this.httpService.get(`/api/iam/${namespace}/admin/users`, {params});
    return users?.[0];
  }

  async resetUserPassword(
    namespace: IAMNamespaces,
    identifier: string,
    password: string,
  ): Promise<void> {
    const user = await this.findUserByIndentifier(namespace, identifier);
    if (!user) {
      throw new Error(`User ${identifier} is not found`);
    }
    const data = {
      newPassword: password,
      requireNewPassword: false,
    };

    await this.httpService.post(`/api/iam/${namespace}/users/${user.id}/reset-password`, data);
  }
}
