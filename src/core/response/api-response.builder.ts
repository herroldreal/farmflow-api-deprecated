import { ResponsePagination } from '../pagination.model';
import { Response } from '../response.model';

export class ApiResponseBuilder {
  static notFound<T>(): Response<T> {
    return {
      message: 'Datos no encontrados',
      data: undefined,
      status: 404,
      success: false,
    };
  }

  static withError<T>(code: number, message: string): Response<T> {
    return {
      message,
      data: undefined,
      success: false,
      status: code,
    };
  }

  static success<T>(
    status: number,
    message: string,
    data: T | undefined,
    pagination: ResponsePagination | undefined = undefined,
  ): Response<T> {
    return {
      message,
      data: {
        result: data,
        pagination,
      },
      success: true,
      status,
    };
  }
}
