import { AuthService } from '@auth/auth.service';
import { Roles } from '@base/roles';
import { ROLES_KEY } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('RolesGuard')
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectPinoLogger() private readonly logger: PinoLogger,
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
    this.logger.info(`Required Role => ${JSON.stringify(requiredRoles, null, 2)}`);
    const ctx = GqlExecutionContext.create(context);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.getContext().req;
    this.logger.info(`Request Headers => ${request.headers}`);
    const { authorization } = request.headers;
    this.logger.info(`Required Role => ${JSON.stringify(authorization, null, 2)}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide a token');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const authToken = <string>authorization.replace(/bearer/gim, '').trim();
    this.logger.info(`Token => ${JSON.stringify(requiredRoles, null, 2)}`);
    const resp = await this.authService.getPayload(authToken);
    this.logger.info(`User => ${JSON.stringify(resp, null, 2)}`);

    this.logger.info(`Roles => ${resp.roles}`);
    const hasRole = requiredRoles.some((role) => resp.roles?.includes(role.toLowerCase()));
    this.logger.info(`Has Role ${hasRole}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return hasRole;
  }
}
