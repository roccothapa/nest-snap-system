import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@snapSystem/service/base.service';
import { UserRepository } from '@appModules/user/repositories/user.repository';
import {BaseDto} from '@snapSystem/base-entity/dto/base.dto';
import {BaseEntitySerializer} from '@snapSystem/base-entity/serializer/base-entity.serializer';
import {instanceToPlain} from 'class-transformer';

@Injectable()
export class UserService extends BaseService {
  public constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {
    super(usersRepository);
  }

  create(createDto: BaseDto): Promise<BaseEntitySerializer> {
    let attributes = instanceToPlain(createDto);
    attributes.isLocked = true;

    return this.repository.createEntity(attributes);
  }
}
