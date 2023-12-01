import { CreateOwnerInput } from '@dtos/create-owner.input';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { User } from '../models';

@Injectable()
export class UserService {
  constructor(
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
    private readonly repository: UserRepository,
  ) {}

  public async create(data: CreateOwnerInput): Promise<User | undefined> {
    this.logger.info('create');
    return this.repository.createOwner(data);
  }
}
