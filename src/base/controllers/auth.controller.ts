import { Body, Controller, Post } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Account, AuthService, Payload } from '../../auth';

interface Invitation {
  email: string;
  farmId: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    @InjectPinoLogger('Auth') private readonly logger: PinoLogger,
    private auth: AuthService,
  ) {}

  @Post('invite')
  public async inviteWorker(@Body() invitation: Invitation): Promise<void> {
    this.logger.info(`Inviting worker ${invitation.email}`);
    const { email, farmId } = invitation;
    return this.auth.inviteWorker(email, farmId);
  }

  @Post('register')
  public async registerUser(@Body() account: Account): Promise<Payload | null> {
    return this.auth.createAccount(account);
  }
}
