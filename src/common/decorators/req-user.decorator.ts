import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';

export const ReqUser = createParamDecorator((context: ExecutionContext) => {
  let request: Request;

  if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context).getContext<{ req: Request }>();
    request = ctx.req;
  } else {
    request = context.switchToHttp().getRequest<Request>();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.user;
});
