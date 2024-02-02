// import { Mapper } from '@automapper/core';
import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
// import { TaskDto } from '@dtos/task.dto';
import { TaskDto } from '@dtos/task.dto';
import { UpdateTaskDto } from '@dtos/update-task.dto';
import { Collections } from '@enums/collections';
import { CollectionReference, QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { autoId } from '@google-cloud/firestore/build/src/util';
import { Task } from '@models/task.model';
import { Inject, Injectable } from '@nestjs/common';
// import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { ChangeList } from '@services/firestore-trigger.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { PaginationBuilder } from '../pagination.model';
import { ApiResponseBuilder } from '../response/api-response.builder';
import { Response } from '../response.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectPinoLogger(TaskRepository.name) private readonly logger: PinoLogger,
    // @InjectMapper() private readonly mapper: Mapper,
    @Inject(Collections.TASKS) private taskCollection: CollectionReference<TaskDto>,
    @Inject(Collections.TASK_VERSIONS) private taskVersionsCollection: CollectionReference<ChangeList>,
  ) {}

  async getAllTaskByFarm(pagination: Pagination, sort?: Sorting, filter?: Filtering): Promise<Response<Task[]>> {
    this.logger.info('Get All Task by Farm');
    const { lastDoc, limit } = pagination;
    let query = this.taskCollection.limit(limit);

    if (sort) query.orderBy(sort.property, sort.direction);
    if (filter) query = query.where(filter.property, filter.rule, filter.value);
    if (lastDoc) {
      const startAfterDoc = await this.taskCollection.doc(lastDoc).get();
      query = query.startAfter(startAfterDoc);
    }

    const data: QuerySnapshot = await query.get();
    const snapshot = await this.taskCollection.get();
    if (!data.empty) {
      const tasks = <Task[]>data.docs.map((doc: QueryDocumentSnapshot) => doc.data());
      const lastId = data.docs.length === limit ? data.docs[limit - 1].id : undefined;
      const paginationResult = new PaginationBuilder().build(snapshot, limit, lastId);

      return ApiResponseBuilder.success(200, 'Ok', tasks, paginationResult);
    }

    return ApiResponseBuilder.notFound();
  }

  async updateTask(task: Partial<UpdateTaskDto>): Promise<Response<boolean>> {
    return this.taskCollection
      .doc(task.id ?? '')
      .set(task, { merge: true })
      .then(() => {
        return ApiResponseBuilder.success(200, 'Ok', true);
      })
      .catch((e) => {
        return ApiResponseBuilder.withError(500, e.message);
      });
  }

  async createTask(task: TaskDto): Promise<Response<boolean>> {
    try {
      const taskId = autoId();
      this.logger.info(`Task ID => ${JSON.stringify(task, null, 2)}`);
      const taskInfo: TaskDto = {
        id: taskId,
        ...task,
      };
      this.logger.info(`Task ID => ${JSON.stringify(taskInfo, null, 2)}`);
      const taskRef = this.taskCollection.doc(taskId);
      await taskRef.set(taskInfo);

      return ApiResponseBuilder.success(200, 'Ok', true);
    } catch (e: any) {
      return ApiResponseBuilder.withError(500, e.message);
    }
  }

  async getTaskVersions(after: number): Promise<Response<ChangeList[]>> {
    this.logger.info(`After => ${after}`);
    const taskVersions = await this.taskVersionsCollection.where('changeListVersion', '>', after).get();

    if (!taskVersions.empty) {
      const data = taskVersions.docs.map((version) => version.data());
      return ApiResponseBuilder.success(200, 'Ok', data);
    }
    return ApiResponseBuilder.notFound();
  }
}
