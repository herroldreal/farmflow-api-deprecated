import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { TaskDto } from '@dtos/task.dto';
import { Task } from '@models/task.model';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '@repositories/task.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Response } from '../response.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly repository: TaskRepository,
  ) {}

  public async getAllTaskByFarm(pagination: Pagination, sort: Sorting, filter: Filtering): Promise<Response<Task[]>> {
    const result = this.repository.getAllTaskByFarm(pagination, sort, filter);
    this.logger.info(`<=========================================================>`);
    this.logger.info(`Tasks => ${JSON.stringify(result, null, 2)}`);
    this.logger.info(`<=========================================================>`);
    return result;
  }

  public async createTask(model: TaskDto): Promise<Response<boolean>> {
    return this.repository.createTask(model);
  }
}
