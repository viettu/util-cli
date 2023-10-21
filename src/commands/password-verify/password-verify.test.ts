// import { Container } from "inversify";
// import { Logger } from "../../shared/logger";
import {IocContainer} from '../../ioc-container';
import {PasswordVerifyCommand} from './password-verify';
import {PasswordHelper} from './password-verify.helper';

jest.mock('../../shared/logger');
jest.mock('./password-verify.helper');

describe('password-verify', () => {
  // const mockLogger = () => ({
  //   error: jest.fn(),
  //   success: jest.fn()
  // });

  // const mockPasswordHelper = ({
  //   convertHexToBuffer: jest.fn(),
  //   readSaltFile: jest.fn(),
  //   hashPassword: jest.fn()
  // })

  let mockContainer: IocContainer;
  beforeAll(() => {
    mockContainer = new IocContainer();
    // mockContainer.container.unbind(Logger);
    mockContainer.container.unbind(PasswordHelper);

    // mockContainer.container.bind<any>(Logger).toConstantValue({
    //   error: jest.fn(),
    //   success: jest.fn()
    // });

    mockContainer.container.bind<any>(PasswordHelper).toConstantValue({
      convertHexToBuffer: jest.fn(),
      readSaltFile: jest.fn(),
      hashPassword: jest.fn(),
    });
  });

  // it('should verify password with salt hex', () => {
  //   let passwordVerify = mockContainer.container.get<PasswordVerifyCommand>(PasswordVerifyCommand);
  //   expect(1).toBeTruthy();
  // });
});
