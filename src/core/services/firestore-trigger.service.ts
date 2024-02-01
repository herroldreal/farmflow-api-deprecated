// eslint-disable-next-line max-classes-per-file
import { Collections } from '@enums/collections';
import { CollectionReference, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { Inject } from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';
import { EventContext } from 'firebase-functions';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

class ChangeList {
  public id?: string;
  public changeListVersion?: number;
  public isDelete?: boolean;
  public timestamp?: string;
}

export class FirestoreTriggerService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    @Inject(Collections.TASKS) private readonly taskVersionsCollection: CollectionReference<ChangeList>,
  ) {}

  async taskOnCreateTrigger(change: QueryDocumentSnapshot, context: EventContext) {
    this.logger.info('OnCreate Trigger Fire');
    await this.taskVersionsCollection.doc(change.id).set({
      id: change.id,
      changeListVersion: FieldValue.increment(1),
      isDelete: false,
      timestamp: context.timestamp,
    });
  }

  taskOnUpdateTrigger(snapshot: QueryDocumentSnapshot, context: EventContext) {
    this.logger.info(`Trigger at => ${context.timestamp}`);
    this.logger.info(`Trigger by => ${snapshot.id}`);
  }
}
