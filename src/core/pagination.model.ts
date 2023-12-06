// eslint-disable-next-line max-classes-per-file
import { QuerySnapshot } from '@google-cloud/firestore';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponsePagination {
  @Field({ name: 'totalItems' })
  public totalItems!: number;

  @Field({ name: 'currentPage' })
  public currentPage!: number;

  @Field({ name: 'pageSize' })
  public pageSize!: number;

  @Field({ name: 'totalPages' })
  public totalPages!: number;

  @Field({ name: 'hasNextPage' })
  public hasNextPage!: boolean;

  @Field({ name: 'hasPreviousPage' })
  public hasPreviousPage!: boolean;
}

export class PaginationBuilder {
  public build(snapshot: QuerySnapshot, size: number, startAfterDocId: string | null = null): ResponsePagination {
    const actualPage = startAfterDocId
      ? Math.ceil(snapshot.docs.findIndex((doc) => doc.id === startAfterDocId) / size) + 1
      : 1;

    return {
      totalItems: snapshot.size,
      currentPage: actualPage,
      pageSize: size,
      totalPages: Math.ceil(snapshot.size / size),
      hasNextPage: snapshot.size > size,
      hasPreviousPage: !!startAfterDocId,
    };
  }
}
