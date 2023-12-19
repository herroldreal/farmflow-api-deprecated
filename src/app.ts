// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, import/no-extraneous-dependencies */

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { LoggerErrorInterceptor } from 'nestjs-pino';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

const expressServer = express();

// @ts-expect-error
const serviceAccount = functions.config().farmflow_firebase_config;
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    privateKey: <string>serviceAccount.private_key.replace(/\\n/g, '\n'),
    clientEmail: serviceAccount.client_email,
  }),
  databaseURL: 'https://farmflow-d2ece-default-rtdb.firebaseio.com/',
});

const createFunctions = async (expressInstance): Promise<void> => {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressInstance));

  if (isProduction) {
    app.enable('trust proxy');
  }

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();

  // Express Middleware
  middleware(app);

  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunctions(expressServer);
  expressServer(request, response);
});
