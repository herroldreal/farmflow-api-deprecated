import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { Farm } from '@models/farm.model';
import { Injectable } from '@nestjs/common';
import { FarmRepository } from '@repositories/farm.repository';

import { Response } from '../../core/response.model';
import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('FarmService')
export class FarmService {
  constructor(private readonly repository: FarmRepository) {}

  @DebugLog('getFarm()')
  public async getFarm(data: FetchFarmInput): Promise<Response<Farm[]>> {
    return this.repository.getFarm(data);
  }

  @DebugLog('createFarm()')
  public async createFarm(data: CreateFarmInput): Promise<Response<Farm>> {
    return this.repository.createFarm(data);
  }
}
