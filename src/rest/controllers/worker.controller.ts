import { Roles } from '@base/roles';
import { Role } from '@common/decorators';
import { RolesGuard } from '@common/guards';
import { Filtering, FilteringParams } from '@decorators/filtering.decorator';
import { Pagination, PaginationParams } from '@decorators/pagination.decorator';
import { Sorting, SortingParams } from '@decorators/sorting.decorator';
import { WorkerDto } from '@dtos/worker.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WorkerService } from '@services/worker.service';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Response } from '../../core/response.model';
import { DebugLog } from '../../debug';

@Controller('worker')
@DebugLog('WorkerController')
@UseGuards(FirebaseAuthGuard)
export class WorkerController {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly service: WorkerService,
  ) {}

  @Get()
  @DebugLog('getAllWorkers()')
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

  @Post()
  @DebugLog('createWorker()')
  @Role(Roles.ADMIN, Roles.OWNER)
  @UseGuards(RolesGuard)
  public async createWorker(@Body() data: WorkerDto): Promise<Response<WorkerDto>> {
    return this.service.createWorker(data);
  }
}
