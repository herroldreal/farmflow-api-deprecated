import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';

import DecodedIdToken = auth.DecodedIdToken;

import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { DebugLog } from '../../debug';

@Injectable()
@DebugLog('FirebaseAuthStrategy')
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  @DebugLog('validate()')
  public async validate(token: string): Promise<DecodedIdToken> {
    try {
      return await auth().verifyIdToken(token, true);
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }
}
