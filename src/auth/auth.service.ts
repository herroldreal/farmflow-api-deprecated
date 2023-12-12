import { Injectable } from '@nestjs/common';
import { UserService } from '@shared/user';
import { auth } from 'firebase-admin';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type { Account, Payload } from './auth.interface';
import { DebugLog } from '../debug';

@Injectable()
@DebugLog('AuthService')
export class AuthService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private user: UserService,
  ) {}

  @DebugLog('createAccount()')
  public async createAccount(account: Account): Promise<Payload | null> {
    return this.user.createAccount(account);
  }

  @DebugLog('getPayload()')
  public async getPayload(token: string): Promise<auth.DecodedIdToken & Payload> {
    this.logger.info(`Token => ${token}`);
    const decodedToken = await auth().verifyIdToken(token, true);
    return {
      ...decodedToken,
      roles: <string[]>decodedToken['roles'],
      name: <string>decodedToken['name'],
      email: decodedToken.email ?? '',
    };
  }
}
