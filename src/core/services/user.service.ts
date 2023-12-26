import { CreateOwnerDto } from '@dtos/create-owner.dto';
import { User } from '@models/index';
import { Injectable } from '@nestjs/common';
import { OwnerRepository } from '@repositories/owner.repository';

import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('UserService')
export class UserService {
  constructor(private readonly repository: OwnerRepository) {}

  @DebugLog('create()')
  public async create(data: CreateOwnerDto): Promise<User | undefined> {
    return this.repository.createOwner(data);
  }
}
