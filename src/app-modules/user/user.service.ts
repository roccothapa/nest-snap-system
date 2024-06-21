import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@snapSystem/service/base.service';
import { UserRepository } from '@appModules/user/repositories/user.repository';
import { BaseDto } from '@snapSystem/base-entity/dto/base.dto';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { instanceToPlain } from 'class-transformer';
import { UserSerializer } from '@models/user/user.serializer';
import { MailService } from '@snapSystem/mails/services/mail.service';
import { CreateUserDto } from '@appModules/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService extends BaseService {
  public constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private mailService: MailService,
    private configService: ConfigService,
  ) {
    super(usersRepository);
  }

  create(createDto: CreateUserDto): Promise<UserSerializer> {
    let attributes = instanceToPlain(createDto);
    attributes.isLocked = true;
    console.log(this.configService.get('mail.host'))
    return this.usersRepository.createEntity(attributes).then((user: UserSerializer) => {
      this.mailService.now({
        to: user.email,
        subject: 'User Registration',
        template: 'user-registration',
        context: {
          name: user.firstName,
          confirmationLink: 'http://localhost:3000/a',
        },
      });
      return Promise.resolve<UserSerializer>(user);
    });

  }
}
