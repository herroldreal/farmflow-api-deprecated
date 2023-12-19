/* eslint-disable @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-explicit-any, max-classes-per-file */
import { Pagination } from '../pagination.model';
import { Response } from '../response.model';

export class ApiResponseBuilder {
  static notFound() {
    return {
      message: 'Datos no encontrados',
      data: undefined,
      status: 404,
      success: false,
    };
  }

  static withError(code: number, message: string) {
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
    pagination: Pagination | undefined = undefined,
  ): Response<T> {
    return {
      success: true,
      status,
      message,
      data: {
        pagination,
        result: data,
      },
    };
  }
}
