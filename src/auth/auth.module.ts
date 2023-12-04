import { AuthSerializer } from '@auth/auth.serializer';
import { AuthService } from '@auth/auth.service';
import { configuration } from '@config/configuration';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { UserModule } from '@shared/user';

import { FirebaseAuthStrategy } from './strategies';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    SendGridModule,
    UserModule,
  ],
  providers: [FirebaseAuthStrategy, AuthService, AuthSerializer],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
