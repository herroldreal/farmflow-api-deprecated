import { Account, Payload } from '@auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectPinoLogger('UserService') private readonly logger: PinoLogger) {}

  public async createAccount(account: Account): Promise<Payload | null> {
    this.logger.info('createAccount()');
    try {
      const userAccount = await auth().createUser({
        password: account.password,
        email: account.email,
        phoneNumber: account.phone,
        displayName: account.name,
      });

      const userId = userAccount.uid;
      await auth().setCustomUserClaims(userId, {
        blackListed: account.blackListed,
        roles: account.roles,
      });

      // TODO: Generate Email Verification link and send through MailChimp or other service
      const user: auth.UserRecord = await auth().getUser(userId);
      return {
        userId: user.uid,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        roles: user.customClaims?.['roles'] ?? ['owner'],
        username: user.email ?? user.displayName ?? '',
      };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  public async fetch(userId: string): Promise<User> {
    const user = await auth().getUser(userId);

    return {
      id: user.uid,
      name: user.displayName,
      picture: user.photoURL,
      phone: user.phoneNumber,
      email: user.email,
      roles: user.customClaims ? <string[]>user.customClaims['roles'] : <string[]>['owner'],
    };
  }
}
