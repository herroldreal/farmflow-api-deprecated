import { Mapper } from '@automapper/core';
import { CreateOwnerDto } from '@dtos/create-owner.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { Owner } from '@models/owner.model';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { auth } from 'firebase-admin';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { Payload, User } from '../models/index';

@Injectable()
export class OwnerRepository {
  // eslint-disable-next-line max-params
  constructor(
    @InjectPinoLogger(OwnerRepository.name) private readonly logger: PinoLogger,
    @InjectMapper() private readonly mapper: Mapper,
    @Inject('users') private userCollection: CollectionReference<User>,
    @Inject(REQUEST) private readonly request: { user: Payload },
  ) {}

  async createOwner(data: CreateOwnerDto): Promise<Owner | undefined> {
    this.logger.info('create owner');
    const userAccount = await auth().getUserByEmail(data.email);
    data.id = userAccount.uid;
    const owner = this.mapper.map(data, CreateOwnerDto, Owner);
    const ownerInfo: Owner = {
      ...owner,
      createdAt: new Date().toISOString(),
    };
    const docRef = this.userCollection.doc(userAccount.uid);
    this.logger.info(`User Id => ${userAccount.uid}`);
    await docRef.set(ownerInfo);

    const info = await docRef.get();
    if (info.exists) {
      this.logger.info('Owner data => ', JSON.stringify(info.data(), null, 2));
      return info.data();
    }
    throw new NotFoundException('No owner found with given id');
  }

  async findAllWorker(): Promise<User[]> {
    const snapshot = await this.userCollection.where('farmId', '==', this.request.user.farmId).get();

    if (snapshot.empty) return [];
    const workers: User[] = [];
    snapshot.docs.forEach((worker) => {
      workers.push(worker.data());
    });

    return workers;
  }

  async findOne(id: string): Promise<User | undefined> {
    const queryResult = await this.userCollection.doc(id).get();
    return queryResult.data();
  }

  update() {
    return null;
  }

  remove() {
    return null;
  }
}
