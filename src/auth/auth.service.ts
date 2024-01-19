import { Injectable } from '@nestjs/common';
import { AccountService } from '@shared/user';
import { auth } from 'firebase-admin';

import type { Account, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private user: AccountService) {}

  public async createAccount(account: Account): Promise<Payload | null> {
    return this.user.createAccount(account);
  }

  public async inviteWorker(email: string, farmId: string): Promise<void> {
    return this.user.generateDeepLinkToCreateWorkerAccount(email, farmId);
  }

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
