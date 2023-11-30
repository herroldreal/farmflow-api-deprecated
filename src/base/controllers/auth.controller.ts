import { Controller, Post, Body } from '@nestjs/common';

import { AuthService, Payload } from '../../auth';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('auth/user')
  public createUser(@Body('token') token: string): Payload | null {
    return this.auth.getPayload(token);
  }
}
