import { Mapper } from '@automapper/core';
import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { WorkerDto } from '@dtos/worker.dto';
import { Collections } from '@enums/collections';
import { CollectionReference, QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { autoId } from '@google-cloud/firestore/build/src/util';
import { Worker } from '@models/worker.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { PaginationBuilder } from '../pagination.model';
import { ApiResponseBuilder } from '../response/api-response.builder';
import { Response } from '../response.model';

@Injectable()
export class WorkerRepository {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    @Inject(Collections.WORKERS) private workerCollection: CollectionReference<Worker>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  public async getAllWorkers(
    pagination: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<Response<WorkerDto[]>> {
    this.logger.info('<====================================>');
    this.logger.info(
      `Parameters : (Pagination ${JSON.stringify(pagination)}) - (Sort ${JSON.stringify(
        sort,
      )}) - (Filter ${JSON.stringify(filter)})`,
    );
    this.logger.info('<====================================>');

    const { lastDoc, limit } = pagination;
    let query = this.workerCollection.limit(limit);
    if (sort) query = query.orderBy(sort.property, sort.direction);
    if (filter) query = query.where(filter.property, filter.rule, filter.value);

    if (lastDoc) {
      const lastSnapshot = await this.workerCollection.doc(lastDoc).get();
      query = query.startAfter(lastSnapshot);
    }

    const response = await query.get();
    const snapshot: QuerySnapshot = await this.workerCollection.get();
    if (!response.empty) {
      const workers = <Worker[]>response.docs.map((doc: QueryDocumentSnapshot) => doc.data());
      const workersDto = this.mapper.mapArray(workers, Worker, WorkerDto);
      const lastId = response.docs.length === limit ? response.docs[limit - 1].id : undefined;
      const resultPagination = new PaginationBuilder().build(snapshot, limit, lastId);

      return ApiResponseBuilder.success(200, 'All done!', workersDto, resultPagination);
    }
    return ApiResponseBuilder.notFound();
  }

  public async createWorker(data: WorkerDto): Promise<Response<Worker>> {
    try {
      this.logger.info('<============================================================>');
      this.logger.info(`Worker => ${JSON.stringify(data, null, 2)}`);
      this.logger.info('<============================================================>');
      const workerData = this.mapper.map(data, WorkerDto, Worker);
      this.logger.info(`Worker Data => ${JSON.stringify(workerData, null, 2)}`);
      this.logger.info('<============================================================>');

      const workerId = autoId();
      const workerInfo: Worker = {
        ...workerData,
        id: workerId,
        createdAt: new Date().toISOString(),
      };
      await this.workerCollection.doc(workerId).set(workerInfo);

      const info = await this.workerCollection.doc(workerId).get();
      if (info.exists) return ApiResponseBuilder.success(201, 'Created', info.data());
      return ApiResponseBuilder.notFound();
    } catch (e: any) {
      return ApiResponseBuilder.withError(500, e.message);
    }
  }
}
