import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { EmailService } from '../../core/email.service';

@Module({
  providers: [UserService, EmailService],
  exports: [UserService, EmailService],
})
export class UserModule {}
