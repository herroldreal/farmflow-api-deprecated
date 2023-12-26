import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { FarmDto } from '@dtos/farm.dto';
import { LinkFarmOwnerDto } from '@dtos/link-farm-owner.dto';
import { LinkFarmWorkerDto } from '@dtos/link-farm-worker.dto';
import { UnlinkFarmOwnerDto } from '@dtos/ublink-farm-owner.dto';
import { UnlinkFarmWorkerDto } from '@dtos/unlink-farm-worker.dto';
import { Farm } from '@models/index';
import { Injectable } from '@nestjs/common';
import { FarmRepository } from '@repositories/farm.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { DebugLog } from '../../debug';
import { Response } from '../response.model';

@Injectable()
@DebugLog('FarmService')
export class FarmService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly repository: FarmRepository,
  ) {}

  @DebugLog('getAllFarms()')
  public async getAllFarms(pagination: Pagination, sort: Sorting, filter: Filtering): Promise<Response<Farm[]>> {
    const result = this.repository.getAllFarms(pagination, sort, filter);
    this.logger.info(`<=========================================================>`);
    this.logger.info(`Pagination => ${JSON.stringify(result, null, 2)}`);
    this.logger.info(`<=========================================================>`);
    return result;
  }

  public async getFarmById(filter: Filtering): Promise<Response<Farm>> {
    const result = this.repository.getFarm(filter);
    this.logger.info(`<=========================================================>`);
    this.logger.info(`Farm => ${JSON.stringify(result, null, 2)}`);
    this.logger.info(`<=========================================================>`);
    return result;
  }

  public async getFarmByOwnerId(sort: Sorting, filter: Filtering): Promise<Response<Farm[]>> {
    const result = this.repository.getFarmByOwner(sort, filter);
    this.logger.info(`<=========================================================>`);
    this.logger.info(`Farms by Owner ID (${filter.value})=> ${JSON.stringify(result, null, 2)}`);
    this.logger.info(`<=========================================================>`);
    return result;
  }

  @DebugLog('createFarm()')
  public async createFarm(data: FarmDto): Promise<Response<Farm>> {
    return this.repository.createFarm(data);
  }

  @DebugLog('linkOwnerWithFarm()')
  public async linkOwner(data: LinkFarmOwnerDto): Promise<Response<boolean>> {
    return this.repository.linkOwnerWithFarm(data);
  }

  @DebugLog('unlinkOwner')
  public async unlinkOwner(data: UnlinkFarmOwnerDto): Promise<Response<boolean>> {
    return this.repository.unlinkOwner(data);
  }

  @DebugLog('linkWorker')
  public async linkWorker(data: LinkFarmWorkerDto): Promise<Response<boolean>> {
    return this.repository.linkWorker(data);
  }

  @DebugLog('unlinkWorker')
  public async unlinkWorker(data: UnlinkFarmWorkerDto): Promise<Response<boolean>> {
    return this.repository.unlinkWorker(data);
  }
}
