import { AuthService } from '@auth/auth.service';
import { Roles } from '@base/roles';
import { ROLES_KEY } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('RolesGuard')
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  @DebugLog('RolesGuard - canActive()')
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!requiredRoles) return true;
    const ctx = GqlExecutionContext.create(context);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.getContext().req;
    const { authorization } = request.headers;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide a token');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const authToken = <string>authorization.replace(/bearer/gim, '').trim();
    const resp = await this.authService.getPayload(authToken);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return requiredRoles.some((role) => resp.roles?.includes(role.toLowerCase()));
  }
}
