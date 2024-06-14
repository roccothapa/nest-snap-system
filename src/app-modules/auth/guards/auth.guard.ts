import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SnapUnauthorizedException } from '@snapSystem/exceptions/snap-unauthorized.exception';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdminAuthApi = this.reflector.getAllAndOverride<boolean>(
      'isAdminAuth',
      [context.getHandler(), context.getClass()],
    );
    if (!isAdminAuthApi) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authToken: string | undefined = this.getTokenFromHeader(request);
    if (!authToken) {
      throw new SnapUnauthorizedException('Session expired');
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(authToken);
    } catch {
      throw new SnapUnauthorizedException('Invalid token');
    }
    return true;
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
