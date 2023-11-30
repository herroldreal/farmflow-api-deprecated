import { Controller, Get, Post, UseGuards, Req, Res, UnauthorizedException, Body } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthService, Payload, AuthenticatedGuard, JwtSign } from '../../auth';
import { ReqUser } from '../../common';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('user/create')
  public createUser(@Body() user: Payload): void {
    auth.createUser(user);
  }
}
