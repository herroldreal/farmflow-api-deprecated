import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { TaskDto } from '@dtos/task.dto';
import { UpdateTaskDto } from '@dtos/update-task.dto';
import { Task } from '@models/task.model';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '@repositories/task.repository';
import { ChangeList } from '@services/firestore-trigger.service';

import { Response } from '../response.model';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  public async getAllTaskByFarm(pagination: Pagination, sort: Sorting, filter: Filtering): Promise<Response<Task[]>> {
    return this.repository.getAllTaskByFarm(pagination, sort, filter);
  }

  public async updateTask(task: Partial<UpdateTaskDto>): Promise<Response<boolean>> {
    return this.repository.updateTask(task);
  }

  public async createTask(model: TaskDto): Promise<Response<boolean>> {
    return this.repository.createTask(model);
  }

  public async changeVersions(after: number): Promise<Response<ChangeList[]>> {
    return this.repository.getTaskVersions(after);
  }
}
