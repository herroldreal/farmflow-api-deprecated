import { Filtering, FilteringParams } from '@decorators/filtering.decorator';
import { Pagination, PaginationParams } from '@decorators/pagination.decorator';
import { Sorting, SortingParams } from '@decorators/sorting.decorator';
import { TaskDto } from '@dtos/task.dto';
import { Task } from '@models/task.model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from '@services/task.service';

import { Response } from '../../core/response.model';

@Controller('tasks')
// @UseGuards(FirebaseAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  // @Role(Roles.OWNER)
  // @UseGuards(RolesGuard)
  public async getAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['name']) filter: Filtering,
  ): Promise<Response<Task[]>> {
    return this.taskService.getAllTaskByFarm(pagination, sort, filter);
  }

  @Post('/')
  public async create(@Body() model: TaskDto): Promise<Response<boolean>> {
    return this.taskService.createTask(model);
  }
}
