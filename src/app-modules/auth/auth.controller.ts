import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '@appModules/auth/service/auth.service';
import { SigninDto } from '@appModules/auth/dto/signin.dto';
import { UserSerializer } from '@models/user/user.serializer';

@Controller('/api/auth')
@ApiTags('Authentication')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async create(@Body() signInDto: SigninDto, @Res() res: Response) {
    return this.authService
      .signIn(signInDto.email, signInDto.password)
      .then((response: { user: UserSerializer; accessToken: string }) => {
        res.header('Access-Token', response.accessToken);
        return res.json({
          id: response.user.id,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          middleName: response.user.middleName,
          fullName: response.user.fullName,
          avatar: response.user.avatar,
          email: response.user.email,
        });
      });
  }
}
