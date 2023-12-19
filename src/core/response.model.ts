/* eslint-disable max-classes-per-file, @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */
import { Pagination } from './pagination.model';

class PaginatedResponseData<T> {
  pagination?: Pagination;
  result?: T;
}

export class Response<T> {
  public success!: boolean;
  public status!: number;
  public message!: string;
  public data?: PaginatedResponseData<T>;
}
