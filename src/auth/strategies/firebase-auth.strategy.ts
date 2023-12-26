import { DecodedIdToken, FirebaseStrategy } from '@whitecloak/nestjs-passport-firebase';
import * as process from 'process';

export class FirebaseAuthStrategy extends FirebaseStrategy {
  constructor() {
    super({
      audience: process.env.AUDIENCE,
      issuer: process.env.ISSUER,
    });
  }

  override async validate(payload: DecodedIdToken): Promise<DecodedIdToken> {
    return Promise.resolve(payload);
  }
}
