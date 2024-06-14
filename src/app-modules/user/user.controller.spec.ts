import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';

const userServiceMock = {
  create: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return the result', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        status: true,
      } as unknown as CreateUserDto;

      const createdUser: BaseEntitySerializer = {
        id: 1,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
        status: createUserDto.status,
      } as unknown as BaseEntitySerializer;

      userServiceMock.create.mockResolvedValue(createdUser);

      const result = await userController.create(createUserDto);

      expect(userServiceMock.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
