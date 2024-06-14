import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { UserSerializer } from '@models/user/user.serializer';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('create', () => {
    it('should sign in a user and return user data with an access token', async () => {
      const signInDto: SigninDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: UserSerializer = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: signInDto.email,
      } as unknown as UserSerializer;

      const mockResponse: Response = {
        header: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue({ user: user, accessToken: 'mockedAccessToken' });

      await authController.create(signInDto, mockResponse as Response);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );

      expect(mockResponse.header).toHaveBeenCalledWith(
        'Access-Token',
        'mockedAccessToken',
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
