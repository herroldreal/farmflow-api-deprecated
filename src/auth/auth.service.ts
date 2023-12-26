import { Injectable } from '@nestjs/common';
import { AccountService } from '@shared/user';
import { auth } from 'firebase-admin';

import type { Account, Payload } from './auth.interface';
import { DebugLog } from '../debug';

@Injectable()
@DebugLog('AuthService')
export class AuthService {
  constructor(private user: AccountService) {}

  @DebugLog('createAccount()')
  public async createAccount(account: Account): Promise<Payload | null> {
    return this.user.createAccount(account);
  }

  @DebugLog('getPayload()')
  public async getPayload(token: string): Promise<auth.DecodedIdToken & Payload> {
    const decodedToken = await auth().verifyIdToken(token, true);
    return {
      ...decodedToken,
      roles: <string[]>decodedToken['roles'],
      name: <string>decodedToken['name'],
      email: decodedToken.email ?? '',
    };
  }
}
