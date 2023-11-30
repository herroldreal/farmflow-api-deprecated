import { CreateOwnerInput } from '@dtos/create-owner.input';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ReqUser, Roles, RolesGuard } from '../../common';
import { User, Payload } from '../models';
import { UserService } from '../providers';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
    private userService: UserService,
  ) {}

  @Query(() => Payload)
  @UseGuards(RolesGuard)
  @Roles('test')
  public user(@ReqUser() user: Payload): Payload {
    this.logger.info('user');
    return user;
  }

  @Mutation(() => User)
  public async create(@Args('ownerInput') ownerInput: CreateOwnerInput): Promise<User | undefined> {
    this.logger.info('create');
    return this.userService.create(ownerInput);
  }
}
