import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import mailConfig from 'src/config/mail.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, authConfig,mailConfig],
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
      expandVariables: true,
    }),
  ],
})
export class ConfigAppModule {}
