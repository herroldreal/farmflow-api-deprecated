import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { Farm } from '@models/farm.model';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FarmService } from '@services/farm.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Roles as Role, RolesGuard } from '../../common';
import { Response } from '../../core/response.model';
import { Roles } from '../../core/roles';
import { DebugLog } from '../../debug';

@Resolver(() => Farm)
@DebugLog('FarmResolver')
export class FarmResolver {
  constructor(
    @InjectPinoLogger(FarmResolver.name) private readonly logger: PinoLogger,
    private farmService: FarmService,
  ) {}

  @Query(() => Farm)
  @UseGuards(RolesGuard)
  @Role(Roles.ADMIN)
  @DebugLog('getAllFarms()')
  public getAllFarms(@Args('fetchFarmInput') fetchFarmInput: FetchFarmInput): Promise<Response<Farm[]>> {
    this.logger.info('Get All Farms');
    this.logger.info(`Farm Fetch Input ${JSON.stringify(fetchFarmInput, null, 2)}`);
    return this.farmService.getFarm(fetchFarmInput);
  }

  @Mutation(() => Farm)
  @DebugLog('createFarm()')
  public async createFarm(@Args('farmInfo') farmInfo: CreateFarmInput): Promise<Response<Farm>> {
    this.logger.info('Create Farm');
    return this.farmService.createFarm(farmInfo);
  }
}
