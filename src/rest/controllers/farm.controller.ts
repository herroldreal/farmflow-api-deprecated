import { Roles } from '@base/roles';
import { Public, Role } from '@common/decorators';
import { RolesGuard } from '@common/guards';
import { Filtering, FilteringParams } from '@decorators/filtering.decorator';
import { Pagination, PaginationParams } from '@decorators/pagination.decorator';
import { Sorting, SortingParams } from '@decorators/sorting.decorator';
import { FarmDto } from '@dtos/farm.dto';
import { LinkFarmOwnerDto } from '@dtos/link-farm-owner.dto';
import { LinkFarmWorkerDto } from '@dtos/link-farm-worker.dto';
import { UnlinkFarmOwnerDto } from '@dtos/ublink-farm-owner.dto';
import { UnlinkFarmWorkerDto } from '@dtos/unlink-farm-worker.dto';
import { Farm } from '@models/index';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { FarmService } from '@services/farm.service';
import { FirebaseAuthGuard } from '@whitecloak/nestjs-passport-firebase';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Response } from '../../core/response.model';

@Controller('farm')
@UseGuards(FirebaseAuthGuard)
export class FarmController {
  constructor(
    @InjectPinoLogger(FarmController.name) private readonly logger: PinoLogger,
    private farmService: FarmService,
  ) {}

  @Get()
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  public async getAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name']) sort: Sorting,
    @FilteringParams(['name']) filter: Filtering,
  ): Promise<Response<Farm[]>> {
    return this.farmService.getAllFarms(paginationParams, sort, filter);
  }

  @Get('getById')
  async getFarmById(@FilteringParams(['id']) filter: Filtering): Promise<Response<Farm>> {
    return this.farmService.getFarmById(filter);
  }

  @Get('getByOwner')
  async getFarmByOwnerId(
    @SortingParams(['ownerId', 'purpose']) sort: Sorting,
    @FilteringParams(['ownerId']) filter: Filtering,
  ): Promise<Response<Farm[]>> {
    return this.farmService.getFarmByOwnerId(sort, filter);
  }

  @Post()
  @Public()
  async createFarm(@Body() data: FarmDto): Promise<Response<Farm>> {
    this.logger.info('Creating farm');
    return this.farmService.createFarm(data);
  }

  @Patch('linkOwner')
  @Role(Roles.OWNER, Roles.ADMIN)
  @UseGuards(RolesGuard)
  async linkOwner(@Body() data: LinkFarmOwnerDto): Promise<Response<boolean>> {
    this.logger.info(`Linking owner ${data.ownerId} with farm ${data.farmId}`);
    return this.farmService.linkOwner(data);
  }

  @Patch('unlinkOwner')
  @Role(Roles.OWNER, Roles.ADMIN)
  @UseGuards(RolesGuard)
  async unlinkOwner(@Body() data: UnlinkFarmOwnerDto): Promise<Response<boolean>> {
    return this.farmService.unlinkOwner(data);
  }

  @Patch('linkWorker')
  @Role(Roles.OWNER, Roles.ADMIN)
  @UseGuards(RolesGuard)
  async linkWorker(@Body() data: LinkFarmWorkerDto): Promise<Response<boolean>> {
    this.logger.info(`Linking owner ${data.workerId} with farm ${data.farmId}`);
    return this.farmService.linkWorker(data);
  }

  @Patch('unlinkWorker')
  @Role(Roles.OWNER, Roles.ADMIN)
  @UseGuards(RolesGuard)
  async unlinkWorker(@Body() data: UnlinkFarmWorkerDto): Promise<Response<boolean>> {
    this.logger.info(`Linking owner ${data.workerId} with farm ${data.farmId}`);
    return this.farmService.unlinkWorker(data);
  }
}
