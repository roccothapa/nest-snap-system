import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@appModules/auth/decorator/roles.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { UserService } from '@appModules/auth/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const userWithRoles = await this.userService.findOneByEmail(user.email);
    const userRoles = userWithRoles.roles;

    return userRoles.some((role) => requiredRoles.includes(role.name));
  }
}
