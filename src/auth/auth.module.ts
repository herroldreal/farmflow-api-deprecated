import { AuthSerializer } from '@auth/auth.serializer';
import { AuthService } from '@auth/auth.service';
import { FirebaseAuthStrategy } from '@auth/strategies/firebase-auth.strategy';
import { configuration } from '@config/configuration';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { AccountModule } from '@shared/user';
import { FirebaseAuthModule } from '@whitecloak/nestjs-passport-firebase';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    FirebaseAuthModule.register({
      audience: process.env.AUDIENCE,
      issuer: process.env.ISSUER,
    }),
    SendGridModule,
    AccountModule,
  ],
  providers: [AuthService, AuthSerializer, FirebaseAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
