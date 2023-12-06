import { CreateOwnerInput } from '@dtos/create-owner.input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ReqUser, Roles, RolesGuard } from '../../common';
import { DebugLog } from '../../debug';
import { User, Payload } from '../models';
import { UserService } from '../providers';

@Resolver(() => User)
@DebugLog('UserResolver')
export class UserResolver {
  constructor(
    @InjectPinoLogger(UserResolver.name) private readonly logger: PinoLogger,
    private userService: UserService,
  ) {}

  @Query(() => Payload)
  @UseGuards(RolesGuard)
  @Roles('test')
  @DebugLog('user()')
  public user(@ReqUser() user: Payload): Payload {
    this.logger.info('user');
    return user;
  }

  @Mutation(() => User)
  @DebugLog('create()')
  public async createOwner(@Args('ownerInput') ownerInput: CreateOwnerInput): Promise<User | undefined> {
    return this.userService.create(ownerInput);
  }
}
