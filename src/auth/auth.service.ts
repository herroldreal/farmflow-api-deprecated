import { Injectable } from '@nestjs/common';
import { UserService } from '@shared/user';

import type { Account, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private user: UserService) {}

  public async createAccount(account: Account): Promise<Payload | null> {
    return this.user.createAccount(account);
  }
}
