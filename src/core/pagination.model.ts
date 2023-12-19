// eslint-disable-next-line max-classes-per-file
import { QuerySnapshot } from '@google-cloud/firestore';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field({ name: 'total' })
  public total!: number;

  @Field({ name: 'size' })
  public size!: number;

  @Field({ name: 'totalPages' })
  public totalPages!: number;

  @Field({ name: 'lastIdCursor' })
  public lastIdCursor?: string;

  @Field({ name: 'hasNextPage' })
  public hasNextPage!: boolean;
}

export class PaginationBuilder {
  public build(snapshot: QuerySnapshot, size: number, lastId: string | undefined = undefined): Pagination {
    return {
      total: snapshot.size,
      size,
      lastIdCursor: lastId,
      totalPages: Math.ceil(snapshot.size / size),
      hasNextPage: snapshot.size > size,
    };
  }
}
