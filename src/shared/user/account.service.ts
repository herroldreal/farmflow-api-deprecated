import { Account, Payload } from '@auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EmailService } from '../../core/email.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectPinoLogger('AccountService') private readonly logger: PinoLogger,
    private readonly emailService: EmailService,
  ) {}

  public async createAccount(account: Account): Promise<Payload> {
    this.logger.info('createAccount()');
    try {
      const userAccount = await auth().createUser({
        password: account.password,
        email: account.email,
        phoneNumber: account.phone,
        displayName: account.name,
      });
      this.logger.info('User created');

      const userId = userAccount.uid;
      await auth().setCustomUserClaims(userId, {
        blackListed: account.blackListed,
        roles: account.roles,
      });
      this.logger.info(`Set custom claims to user ${userId}`);

      const emailLink = await auth().generateEmailVerificationLink(userAccount.email ?? '');
      this.logger.info(`Verification Link => ${emailLink}`);
      await this.emailService.sendVerificationEmail(account.email, {
        user_name: userAccount.displayName,
        verification_link: emailLink,
      });

      const user: auth.UserRecord = await auth().getUser(userId);
      return {
        uid: user.uid,
        roles: <string[]>user.customClaims?.['roles'],
        name: user.email ?? user.displayName ?? '',
        email: user.email ?? '',
      };
    } catch (e: any) {
      return Promise.reject(new Error(e.message));
    }
  }
}
