import { Strategy } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@appModules/auth/service/auth.service';

@Injectable()
export class OAuth2PasswordStrategy extends PassportStrategy(
  Strategy,
  'oauth2-password',
) {
  constructor(private authService: AuthService) {
    super({
      authorizationURL: process.env.APP_URL + '/oauth2/authorize', //check verified user and generate authorization code
      tokenURL: process.env.APP_URL + '/oauth2/token', // generate the access token with the help of authorization code
      clientID: process.env.OAUTH2_PASSWORD_CLIENT_ID,
      clientSecret: process.env.OAUTH2_PASSWORD_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + '/api/auth/login/oauth2/callback',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
