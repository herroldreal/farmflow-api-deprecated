import { CreateOwnerInput } from '@dtos/create-owner.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DebugLog } from '../../debug';
import { User } from '../models';
import { UserService } from '../providers';

@Resolver(() => User)
@DebugLog('UserResolver')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  @DebugLog('create()')
  public async createOwner(@Args('ownerInput') ownerInput: CreateOwnerInput): Promise<User | undefined> {
    return this.userService.create(ownerInput);
  }
}
