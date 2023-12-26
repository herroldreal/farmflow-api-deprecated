import { classes } from '@automapper/classes';
import { FirestoreModule } from '@common/db/firestore.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth';
import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter } from './common';
import { configuration, loggerOptions } from './config';
import { RestModule } from './rest';

@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) =>
        Promise.resolve({
          apiKey: cfg.get<string>('MAIL_API_KEY') ?? '',
        }),
      inject: [ConfigService],
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ignoreUndefinedProperties: true,
        projectId: configService.get<string>('PROJECT_ID'),
        credentials: {
          private_key: configService.get<string>('PRIVATE_KEY'),
          client_email: configService.get<string>('CLIENT_EMAIL'),
        },
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    CommonModule,
    BaseModule,
    RestModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
