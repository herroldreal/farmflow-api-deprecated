import { AuthSerializer } from '@auth/auth.serializer';
import { AuthService } from '@auth/auth.service';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@shared/user';

import { FirebaseAuthStrategy } from './strategies';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  providers: [FirebaseAuthStrategy, AuthService, AuthSerializer],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
