// eslint-disable-next-line max-classes-per-file
import { Collections } from '@enums/collections';
import { CollectionReference, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { Inject } from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';
import { Change, EventContext } from 'firebase-functions';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export class ChangeList {
  public id?: string;
  public changeListVersion?: number;
  public isDelete?: boolean;
  public timestamp?: string;
}

export class FirestoreTriggerService {
  constructor(
    @InjectPinoLogger() private readonly logger: PinoLogger,
    @Inject(Collections.TASK_VERSIONS) private readonly taskVersionsCollection: CollectionReference<ChangeList>,
  ) {}

  async taskOnCreateTrigger(_: QueryDocumentSnapshot, context: EventContext) {
    this.logger.info('OnCreate trigger');
    await this.taskVersionsCollection.doc(context.params['taskId']).set(
      {
        id: context.params['taskId'],
        changeListVersion: FieldValue.increment(1),
        isDelete: false,
        timestamp: context.timestamp,
      },
      { merge: true },
    );
  }

  async taskOnUpdateTrigger(_: Change<QueryDocumentSnapshot>, context: EventContext) {
    this.logger.info(`Trigger at => ${context.timestamp}`);
    this.logger.info(`Trigger by => ${context.params['taskId']}`);
    await this.taskVersionsCollection.doc(context.params['taskId']).set(
      {
        id: context.params['taskId'],
        changeListVersion: FieldValue.increment(1),
        isDelete: false,
        timestamp: context.timestamp,
      },
      { merge: true },
    );
  }

  async taskOnDeleteTrigger(_: QueryDocumentSnapshot, context: EventContext) {
    this.logger.info('OnDelete trigger');
    await this.taskVersionsCollection.doc(context.params['taskId']).set(
      {
        id: context.params['taskId'],
        changeListVersion: FieldValue.increment(1),
        isDelete: true,
        timestamp: context.timestamp,
      },
      { merge: true },
    );
  }
}
