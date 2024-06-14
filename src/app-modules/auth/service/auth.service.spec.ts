import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { generateHash } from '@snapSystem/helpers/helpers';
import { AuthService } from '@appModules/auth/service/auth.service';
import { UserSerializer } from '@models/user/user.serializer';
import { UserService } from '@appModules/auth/service/user.service';
import { InvalidCredentialsException } from '@appModules/auth/exceptions/invalid-credentials.exception';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            first: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in a user and return a user object with an access token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const token = 'mockedAccessToken';
      const user: UserSerializer = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email,
        password: await generateHash(password),
      } as unknown as UserSerializer;

      userRepository.first = jest.fn().mockResolvedValue(user);
      jwtService.signAsync = jest.fn().mockResolvedValue(token);

      const result = await authService.signIn(email, password);

      expect(result).toEqual({ user: user, accessToken: token });
    });
  });

  it('should throw SnapUnauthorizedException when given invalid credentials', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';
    const user: UserSerializer = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: await generateHash('correctPassword'),
    } as unknown as UserSerializer;

    userRepository.first = jest.fn().mockResolvedValue(user);

    try {
      await authService.signIn(email, password);
      fail('Expected SnapUnauthorizedException but did not throw.');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCredentialsException);
      expect(error.message).toEqual('Invalid username/password.');
    }
  });

  it('should throw SnapUnauthorizedException when user is not found', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password123';
    userRepository.first = jest.fn().mockResolvedValue(null);

    try {
      await authService.signIn(email, password);
      fail('Expected SnapUnauthorizedException but did not throw.');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCredentialsException);
      expect(error.message).toEqual('Invalid username/password.');
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
