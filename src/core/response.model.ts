/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any*/
// eslint-disable-next-line max-classes-per-file
import { Farm } from '@models/farm.model';
import { ObjectType, Field } from '@nestjs/graphql';

import { ResponsePagination } from './pagination.model';

@ObjectType('Pagination')
export class PaginatedResponseData<T> {
  @Field({ name: 'pagination' })
  public pagination?: ResponsePagination;

  @Field(() => [Farm], { name: 'result' })
  result?: T;
}

@ObjectType('Response')
export class Response<T> {
  @Field({ name: 'status' })
  public status!: number;

  @Field({ name: 'message' })
  public message!: string;

  @Field({ name: 'success' })
  public success!: boolean;

  @Field(() => PaginatedResponseData, { name: 'data' })
  public data?: PaginatedResponseData<T>;
}
