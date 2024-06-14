import { Injectable } from '@nestjs/common';
import { BaseService } from '@snapSystem/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@appModules/auth/repositories/user.repository';

@Injectable()
export class UserService extends BaseService {
  public constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {
    super(usersRepository);
  }

  public findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['roles'],
    });
  }
}
