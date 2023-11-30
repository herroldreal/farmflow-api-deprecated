import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {GqlContextType, GqlExecutionContext} from '@nestjs/graphql';
import type {Request} from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const request: Request = this.getRequest(context);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return request.isAuthenticated();
  }

  public getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _context = GqlExecutionContext.create(context).getContext<{ req: Request }>();
      return _context.req;
    }

    return context.switchToHttp().getRequest<Request>();
  }
}
