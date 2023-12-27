import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { WorkerDto } from '@dtos/worker.dto';
import { Injectable } from '@nestjs/common';
import { WorkerRepository } from '@repositories/worker.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Response } from '../response.model';

@Injectable()
export class WorkerService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly repository: WorkerRepository,
  ) {}

  public async getAll(pagination: Pagination, sort: Sorting, filter: Filtering): Promise<Response<WorkerDto[]>> {
    const response = await this.repository.getAllWorkers(pagination, sort, filter);
    this.logger.info(`<========================================================>`);
    this.logger.info(`[Workers] => ${JSON.stringify(response, null, 2)}`);
    this.logger.info(`<========================================================>`);

    return response;
  }

  public async getAllWorkerByFarm(
    pagination: Pagination,
    sort: Sorting,
    filter: Filtering,
  ): Promise<Response<WorkerDto[]>> {
    return this.repository.getAllWorkerByFarmId(pagination, sort, filter);
  }

  public async getWorker(filter: Filtering): Promise<Response<WorkerDto>> {
    return this.repository.getWorker(filter);
  }

  public async createWorker(data: WorkerDto): Promise<Response<WorkerDto>> {
    return this.repository.createWorker(data);
  }

  public async updateWorkInfo(data: WorkerDto): Promise<Response<WorkerDto>> {
    return this.repository.updateWorkInfo(data);
  }
}
