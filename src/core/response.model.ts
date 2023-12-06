// eslint-disable-next-line max-classes-per-file
import { Farm } from '@models/farm.model';
import { Payload } from '@models/payload.model';
import { User } from '@models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

import { ResponsePagination } from './pagination.model';

export type FarmFlowEntity = Farm | Farm[] | User | User[] | Payload;

@ObjectType()
export class PaginatedResponseData<T extends FarmFlowEntity> {
  @Field({ name: 'pagination' })
  public pagination?: ResponsePagination;

  @Field(() => Farm, { name: 'result' })
  result?: T;
}

@ObjectType()
export class Response<T extends FarmFlowEntity> {
  @Field({ name: 'status' })
  public status!: number;

  @Field({ name: 'message' })
  public message!: string;

  @Field({ name: 'success' })
  public success!: boolean;

  @Field(() => PaginatedResponseData, { name: 'data' })
  public data?: PaginatedResponseData<T>;
}
