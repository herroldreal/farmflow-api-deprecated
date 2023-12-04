import { Controller, Post, Body } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Account, AuthService, Payload } from '../../auth';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectPinoLogger('Auth') private readonly logger: PinoLogger,
    private auth: AuthService,
  ) {}

  @Post('register')
  public async registerUser(@Body() account: Account): Promise<Payload | null> {
    this.logger.info('Create account');
    const response = await this.auth.createAccount(account);
    this.logger.info(`User account created => ${JSON.stringify(response, null, 2)}`);
    return response;
  }
}
