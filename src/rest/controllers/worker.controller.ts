import { Roles } from '@base/roles';
import { Role } from '@common/decorators';
import { RolesGuard } from '@common/guards';
import { Filtering, FilteringParams } from '@decorators/filtering.decorator';
import { Pagination, PaginationParams } from '@decorators/pagination.decorator';
import { Sorting, SortingParams } from '@decorators/sorting.decorator';
import { WorkerDto } from '@dtos/worker.dto';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { WorkerService } from '@services/worker.service';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ApiResponseBuilder } from '../../core/response/api-response.builder';
import { Response } from '../../core/response.model';

@Controller('worker')
@UseGuards(FirebaseAuthGuard)
export class WorkerController {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly service: WorkerService,
  ) {}

  @Get()
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async getAllWorkers(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['name']) filter: Filtering,
  ): Promise<Response<WorkerDto[]>> {
    this.logger.info('Get All Worker');
    return this.service.getAll(pagination, sort, filter);
  }

  @Get('farm')
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async getAllWorkersByFarmId(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['farms']) filter: Filtering,
  ): Promise<Response<WorkerDto[]>> {
    this.logger.info(`Get All Worker by Farm (${filter.value}`);
    return this.service.getAllWorkerByFarm(pagination, sort, filter);
  }

  @Get()
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async getWorker(@FilteringParams(['name']) filter: Filtering): Promise<Response<WorkerDto>> {
    this.logger.info(`Get Worker by ID => (${filter.value}`);
    return this.service.getWorker(filter);
  }

  @Post()
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async createWorker(@Body() data: WorkerDto): Promise<Response<WorkerDto>> {
    return this.service.createWorker(data);
  }

  @Put()
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async updateWorkerInfo(@Body() data: WorkerDto): Promise<Response<boolean>> {
    this.logger.info(`====> ${JSON.stringify(data, null, 2)}`);
    await this.service.updateWorkInfo(data);
    return ApiResponseBuilder.notFound();
  }
}
