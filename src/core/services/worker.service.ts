import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { WorkerDto } from '@dtos/worker.dto';
import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@repositories/worker.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { DebugLog } from '../../debug';
import { Response } from '../response.model';

@Injectable()
@DebugLog('WorkerService')
export class WorkerService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly repository: WorkerRepository,
  ) {}

  @DebugLog('getAll()')
  public async getAll(pagination: Pagination, sort: Sorting, filter: Filtering): Promise<Response<WorkerDto[]>> {
    const response = await this.repository.getAllWorkers(pagination, sort, filter);
    this.logger.info(`<========================================================>`);
    this.logger.info(`[Workers] => ${JSON.stringify(response, null, 2)}`);
    this.logger.info(`<========================================================>`);

    return response;
  }

  @DebugLog('createWorker()')
  public async createWorker(data: WorkerDto): Promise<Response<WorkerDto>> {
    return this.repository.createWorker(data);
  }
}
