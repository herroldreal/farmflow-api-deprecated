import { Injectable } from '@nestjs/common';
import { UserService } from '@shared/user';
import { auth } from 'firebase-admin';

import type { Account, Payload } from './auth.interface';
import { DebugLog } from '../debug';

@Injectable()
@DebugLog('AuthService')
export class AuthService {
  constructor(private user: UserService) {}

  @DebugLog('createAccount()')
  public async createAccount(account: Account): Promise<Payload | null> {
    return this.user.createAccount(account);
  }

  @DebugLog('getPayload()')
  public async getPayload(token: string): Promise<auth.DecodedIdToken> {
    return auth().verifyIdToken(token, true);
  }
}
