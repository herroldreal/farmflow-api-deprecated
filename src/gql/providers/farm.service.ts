import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { LinkFarmOwnerInput } from '@dtos/link-farm-owner.input';
import { Farm } from '@models/farm.model';
import { Injectable } from '@nestjs/common';
import { FarmRepository } from '@repositories/farm.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Response } from '../../core/response.model';
import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('FarmService')
export class FarmService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly repository: FarmRepository,
  ) {}

  @DebugLog('getFarm()')
  public async getFarm(data: FetchFarmInput): Promise<Response<Farm[]>> {
    const response = this.repository.getFarm(data);
    this.logger.info(`[Farms] => ${JSON.stringify(data, null, 2)}`);
    return response;
  }

  @DebugLog('createFarm()')
  public async createFarm(data: CreateFarmInput): Promise<Response<Farm>> {
    return this.repository.createFarm(data);
  }

  @DebugLog('linkOwnerWithFarm()')
  public async linkOwnerWithFarm(data: LinkFarmOwnerInput): Promise<Response<boolean>> {
    return this.repository.linkOwnerWithFarm(data);
  }
}
