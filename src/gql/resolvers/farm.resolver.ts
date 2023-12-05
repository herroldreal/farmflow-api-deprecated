import { CreateOwnerInput } from '@dtos/create-owner.input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ReqUser, Roles, RolesGuard } from '../../common';
import { DebugLog } from '../../debug';
import { User, Payload } from '../models';
import { UserService } from '../providers';

@Resolver(() => Farm)
@DebugLog('FarmResolver')
export class FarmResolver {
  constructor(
    @InjectPinoLogger(FarmResolver.name) private readonly logger: PinoLogger,
    private farmService: FarmService,
  ) {}

  @Query(() => Farm)
  @UseGuards(RolesGuard)
  @Roles('admin')
  @DebugLog('getAllFarms()')
  public getAllFarms() {}
}
