import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(),
      validate: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn(),
    };

    const mockUsersService = {
      create: jest.fn(),
      changePassword: jest.fn(),
      update: jest.fn(),
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
