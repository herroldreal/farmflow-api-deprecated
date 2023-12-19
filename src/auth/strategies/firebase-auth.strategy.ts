import { DecodedIdToken, FirebaseStrategy } from '@whitecloak/nestjs-passport-firebase';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as process from 'process';

import { User } from '../../core/models/user.model';

export class FirebaseAuthStrategy extends FirebaseStrategy {
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {
    super({
      audience: process.env.AUDIENCE,
      issuer: process.env.ISSUER,
    });
  }

  override async validate(payload: DecodedIdToken): Promise<User> {
    this.logger.info(`User => ${JSON.stringify(payload, null, 2)}`);
    return Promise.resolve({
      blackListed: false,
      country: '',
      email: '',
      farmId: '',
      name: '',
      id: '',
      phone: '',
      picture: '',
      roles: [],
    });
  }
}
