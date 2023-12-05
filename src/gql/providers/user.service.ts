import { CreateOwnerInput } from '@dtos/create-owner.input';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';

import { DebugLog } from '../../debug';
import { User } from '../models';

@Injectable()
@DebugLog('Providers.UserService')
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  @DebugLog('create()')
  public async create(data: CreateOwnerInput): Promise<User | undefined> {
    return this.repository.createOwner(data);
  }
}
