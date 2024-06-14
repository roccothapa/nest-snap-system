import { Injectable } from '@nestjs/common';
import { BaseService } from '@snapSystem/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@appModules/auth/repositories/user.repository';
import { verifyHash } from '@snapSystem/helpers/helpers';
import { JwtService } from '@nestjs/jwt';
import { UserSerializer } from '@models/user/user.serializer';
import { UserService } from '@appModules/auth/service/user.service';
import { InvalidCredentialsException } from '@appModules/auth/exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService extends BaseService {
  public constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super(usersRepository);
  }

  public async signIn(email: string, password: string) {
    return this.usersRepository
      .first({
        where: { email: email },
      })
      .then(async (user: UserSerializer) => {
        if (!user || !(await verifyHash(password, user?.password))) {
          return Promise.reject(new InvalidCredentialsException());
        } else {
          const payload = { sub: user.id, email: user.email };
          return {
            user: user,
            accessToken: await this.jwtService.signAsync(payload),
          };
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await verifyHash(password, user.password))) {
      return user;
    }

    return null;
  }
}
