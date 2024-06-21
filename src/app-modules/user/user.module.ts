import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from '@models/user/user.entity';
import { MailService } from '@snapSystem/mails/services/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository,MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
