import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  limit: number;
  lastDoc?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const PaginationParams = createParamDecorator((data: unknown, ctx: ExecutionContext): Pagination => {
  const req: Request = ctx.switchToHttp().getRequest();
  const limit = Number(req.query['limit']);
  const lastDoc: string = <string>req.query['lastDoc'];

  // check if page and size are valid
  if (Number.isNaN(limit) || limit < 0) {
    throw new BadRequestException('Invalid pagination params');
  }
  // do not allow to fetch large slices of the dataset
  if (limit > 100) {
    throw new BadRequestException('Invalid pagination params: Max size is 100');
  }

  return { limit, lastDoc };
});
