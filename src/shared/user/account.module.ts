import { HeaderService } from '@base/services/header.service';
import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { EmailService } from '../../core/email.service';

@Module({
  providers: [AccountService, EmailService, HeaderService],
  exports: [AccountService, EmailService, HeaderService],
})
export class AccountModule {}
