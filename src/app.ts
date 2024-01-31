import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FirestoreTriggerService } from '@services/firestore-trigger.service';
import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
<<<<<<< Updated upstream
import { getFirestore } from 'firebase-admin/firestore';
=======
>>>>>>> Stashed changes
import * as functions from 'firebase-functions';
import { LoggerErrorInterceptor } from 'nestjs-pino';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

<<<<<<< Updated upstream
const IS_EMULATOR =
  (typeof process.env.FUNCTIONS_EMULATOR === 'boolean' && process.env.FUNCTIONS_EMULATOR) ||
  process.env.FUNCTIONS_EMULATOR === Boolean('true');

=======
>>>>>>> Stashed changes
const expressServer = express();

const serviceAccount = functions.config()['farmflow_firebase_config'];
initializeApp({
  credential: cert({
    projectId: serviceAccount.project_id,
    privateKey: <string>serviceAccount.private_key.replace(/\\n/g, '\n'),
    clientEmail: serviceAccount.client_email,
  }),
  databaseURL: 'https://farmflow-d2ece-default-rtdb.firebaseio.com/',
});
<<<<<<< Updated upstream
const firestore = getFirestore();
if (IS_EMULATOR) {
  firestore.settings({
    host: 'localhost',
    port: 8081,
    ssl: false,
  });
}
=======
>>>>>>> Stashed changes

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

export const taskOnCreateTriggers = functions.firestore.document('tasks').onCreate(async (change, context) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.get(FirestoreTriggerService).taskOnCreateTrigger(change, context);
});
export const taskOnDeleteTrigger = functions.firestore.document('tasks').onDelete(async (snapshot, context) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.get(FirestoreTriggerService).taskOnUpdateTrigger(snapshot, context);
});
// export const taskOnUpdateTrigger = functions.firestore.document('tasks').onUpdate((change, context) => {});
