import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '@appModules/user/repositories/user.repository';
import { CreateUserDto } from '@appModules/user/dto/create-user.dto';
import { UserSerializer } from '@models/user/user.serializer';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserService],
      providers: [
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        status: true,
        isLocked: true
      } as unknown as CreateUserDto;

      const createdUser: UserSerializer = {
        id: 1,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        status: createUserDto.status,
      } as unknown as UserSerializer;

      userRepository.createEntity = jest.fn().mockResolvedValue(createdUser);

      const result = await userService.create(createUserDto);

      expect(userRepository.createEntity).toHaveBeenCalledWith(createUserDto);

      expect(result).toEqual(createdUser);
    });
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });
});
