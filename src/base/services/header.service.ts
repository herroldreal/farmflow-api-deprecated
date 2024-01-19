import { Headers } from '@base/headers.enums';
import { TypedHeaders } from '@base/typed-headers';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class HeaderService {
  constructor(@Inject(REQUEST) private request: Request) {}

  public getFarmHeaders(): TypedHeaders {
    const farmId: string = <string>this.request.headers[Headers.X_FARM_ID];
    const workerId: string = <string>this.request.headers[Headers.X_WORKER_ID];

    return {
      farmId,
      workerId,
    };
  }
}
