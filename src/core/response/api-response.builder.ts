import { ResponsePagination } from '../pagination.model';
import { FarmFlowEntity, Response } from '../response.model';

export class ApiResponseBuilder<T extends FarmFlowEntity> {
  private readonly response: Response<T> = {
    data: undefined,
    status: 200,
    message: '',
    success: true,
  };

  constructor() {
    this.response = {
      success: true,
      status: 200,
      message: 'La solicitud se proceso correctamente',
      data: undefined,
    };
  }

  withStatus(status: number): this {
    this.response.status = status;
    return this;
  }

  withMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  withData(data: T | undefined): this {
    this.response.data = {
      result: data,
    };
    return this;
  }

  withPagination(pagination: ResponsePagination | undefined): this {
    if (this.response.data) this.response.data.pagination = pagination;
    return this;
  }

  build(): Response<T> {
    return this.response;
  }

  notFound(): Response<T> {
    return {
      message: 'Datos no encontrados',
      data: undefined,
      status: 404,
      success: false,
    };
  }

  withError(code: number, message: string): Response<T> {
    return {
      message,
      data: undefined,
      success: false,
      status: code,
    };
  }
}
