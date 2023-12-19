/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */
import { FieldPath, OrderByDirection } from '@firebase/firestore-types';
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string | FieldPath;
  direction: OrderByDirection | undefined;
}

export const SortingParams = createParamDecorator((validParams, ctx: ExecutionContext): Sorting | null => {
  const req: Request = ctx.switchToHttp().getRequest();
  const sort = <string>req.query['sort'];

  if (!sort) return null;
  if (!Array.isArray(validParams)) throw new BadRequestException('Invalid sort parameter');

  const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
  if (!sort.match(sortPattern)) throw new BadRequestException('Invalid sort parameter');

  const sortOptions = sort.split(':');
  const property = sortOptions[0];
  const direction: OrderByDirection = <OrderByDirection>sortOptions[1];

  if (!validParams.includes(property)) throw new BadRequestException(`Invalid sort property: ${property}`);

  return { property, direction };
});
