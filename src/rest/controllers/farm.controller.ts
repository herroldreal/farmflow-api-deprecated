import { Roles } from '@base/roles';
import { Public, Role } from '@common/decorators';
import { RolesGuard } from '@common/guards';
import { Filtering, FilteringParams } from '@decorators/filtering.decorator';
import { Pagination, PaginationParams } from '@decorators/pagination.decorator';
import { Sorting, SortingParams } from '@decorators/sorting.decorator';
import { FarmDto } from '@dtos/farm.dto';
import { LinkFarmOwnerDto } from '@dtos/link-farm-owner.dto';
import { Farm } from '@models/index';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @Post('link')
  @Role(Roles.OWNER, Roles.ADMIN)
  @UseGuards(RolesGuard)
  async linkOwner(@Body() data: LinkFarmOwnerDto): Promise<Response<boolean>> {
    this.logger.info(`Linking owner ${data.ownerId} with farm ${data.farmId}`);
    return this.farmService.linkOwnerWithFarm(data);
  }
}
