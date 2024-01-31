import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { EmailService } from '../../core/email.service';

@Module({
  providers: [AccountService, EmailService],
  exports: [AccountService, EmailService],
})
export class AccountModule {}
