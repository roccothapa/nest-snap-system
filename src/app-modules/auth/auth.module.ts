import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from '@appModules/auth/service/auth.service';
import { UserRepository } from '@appModules/auth/repositories/user.repository';
import { AuthGuard } from '@appModules/auth/guards/auth.guard';
import { User } from '@models/user/user.entity';
import { RolesGuard } from '@appModules/auth/guards/roles.guard';
import { Role } from '@models/role/role.entity';
import { UserService } from '@appModules/auth/service/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // secret: config.get('app.secret'),
        privateKey: config.get('auth.privateKey'),
        publicKey: config.get('auth.publicKey'),
        signOptions: {
          expiresIn: config.get('app.expireIn'),
          algorithm: 'RS384',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
