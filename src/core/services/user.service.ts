import { CreateOwnerDto } from '@dtos/create-owner.dto';
import { User } from '@models/index';
import { Injectable } from '@nestjs/common';
import { OwnerRepository } from '@repositories/owner.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: OwnerRepository) {}

  public async create(data: CreateOwnerDto): Promise<User | undefined> {
    return this.repository.createOwner(data);
  }
}
