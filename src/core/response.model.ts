import { ResponsePagination } from './pagination.model';

export class Response<T> {
  public status!: number;
  public message!: string;
  public success!: boolean;
  public data?: {
    pagination?: ResponsePagination;
    result?: T;
  };
}
