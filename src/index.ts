import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const expressServer = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const serviceAccount = functions.config().farmflow_firebase_config;
admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://farmflow-d2ece-default-rtdb.firebaseio.com/',
});

const createFunctions = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunctions(expressServer);
  expressServer(request, response);
});
