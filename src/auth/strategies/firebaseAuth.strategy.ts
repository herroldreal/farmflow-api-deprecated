import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-firebase-jwt';
import {auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public validate(token: string): Promise<DecodedIdToken> {
    return auth()
      .verifyIdToken(token, true)
      .catch((error) => {
        console.warn(error);
        throw new UnauthorizedException();
      });
  }
}
