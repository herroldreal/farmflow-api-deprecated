import { AuthService } from '@auth/auth.service';
import { Roles } from '@base/roles';
import { ROLES_KEY } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;
    const { authorization } = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide a token');
    }
    const authToken = <string>authorization.replace(/bearer/gim, '').trim();
    const resp = await this.authService.getPayload(authToken);

    return requiredRoles.some((role) => resp.roles?.includes(role.toLowerCase()));
  }
}
