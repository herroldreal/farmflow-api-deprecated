import { Account, Payload } from '@auth/auth.interface';
import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EmailService } from '../../core/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectPinoLogger('UserService') private readonly logger: PinoLogger,
    private readonly emailService: EmailService,
  ) {}

  public async createAccount(account: Account): Promise<Payload | null> {
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
        userId: user.uid,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        roles: user.customClaims?.['roles'] ?? ['owner'],
        username: user.email ?? user.displayName ?? '',
      };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
