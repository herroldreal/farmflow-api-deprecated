import { Roles } from '@base/roles';
import { GqlAuthGuard } from '@common/decorators/gql-auth.guard';
import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { LinkFarmOwnerInput } from '@dtos/link-farm-owner.input';
import { Farm } from '@models/farm.model';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FarmService } from '@services/farm.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Role, RolesGuard } from '../../common';
import { Response } from '../../core/response.model';
import { DebugLog } from '../../debug';

@Resolver()
@DebugLog('FarmResolver')
export class FarmResolver {
  @Query(() => Response<Farm[]>)
  @Role(Roles.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @DebugLog('getAllFarms()')
  public getAllFarms(@Args('fetchFarmInput') fetchFarmInput: FetchFarmInput): Promise<Response<Farm[]>> {
    this.logger.info('Get All Farms');
    this.logger.info(`Farm Fetch Input ${JSON.stringify(fetchFarmInput, null, 2)}`);
    return this.farmService.getFarm(fetchFarmInput);
  }

  constructor(
    @InjectPinoLogger(FarmResolver.name) private readonly logger: PinoLogger,
    private farmService: FarmService,
  ) {}

  @Mutation(() => Response<Farm>)
  @DebugLog('createFarm()')
  public async createFarm(@Args('farmInfo') farmInfo: CreateFarmInput): Promise<Response<Farm>> {
    this.logger.info('Create Farm');
    return this.farmService.createFarm(farmInfo);
  }

  @Mutation(() => Response<boolean>)
  @DebugLog('linkOwnerWithFarm()')
  public async linkOwnerWithFarm(@Args('data') data: LinkFarmOwnerInput): Promise<Response<boolean>> {
    this.logger.info('Link owner with Farm');
    return this.farmService.linkOwnerWithFarm(data);
  }
}
