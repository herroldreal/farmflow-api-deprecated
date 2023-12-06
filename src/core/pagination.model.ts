// eslint-disable-next-line max-classes-per-file
import { QuerySnapshot } from '@google-cloud/firestore';

export class ResponsePagination {
  public totalItems!: number;
  public currentPage!: number;
  public pageSize!: number;
  public totalPages!: number;
  public hasNextPage!: boolean;
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
