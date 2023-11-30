/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

import { AuthService, Payload } from '../../auth';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL logging uses the apollo plugins.
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware

  constructor(
    private readonly logger: PinoLogger,
    private auth: AuthService,
  ) {}

  public use(req: Request, _res: Response, next: () => void): void {
    const authorization: string | undefined = req.header('authorization');

    const user: Payload | null = authorization?.startsWith('Bearer')
      ? this.auth.getPayload(authorization.split(' ')[1])
      : // @ts-expect-error
        <Payload>req.user;

    const userId = user?.userId;
    // for https://github.com/iamolegga/nestjs-pino/issues/608
    req.customProps = { userId };
    // Add extra fields to share in logger context
    this.logger.assign(req.customProps);

    next();
  }
}
