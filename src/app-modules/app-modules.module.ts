import { Module } from '@nestjs/common';
import { AuthModule } from '@appModules/auth/auth.module';
import { UserModule } from '@appModules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule, UploaderModule],
})
export class AppModulesModule {}
