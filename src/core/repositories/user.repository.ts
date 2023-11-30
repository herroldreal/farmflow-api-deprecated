import { CreateOwnerInput } from '@dtos/create-owner.input';
import { CollectionReference } from '@google-cloud/firestore';
import { Payload, User } from '@models/index';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserRepository {
  constructor(
    @InjectPinoLogger(UserRepository.name) private readonly logger: PinoLogger,
    @Inject('users') private userCollection: CollectionReference<User>,
    @Inject(REQUEST) private readonly request: { user: Payload },
  ) {}

  async createOwner(owner: CreateOwnerInput): Promise<User | undefined> {
    this.logger.info('create');
    const docRef = this.userCollection.doc(owner.id);
    this.logger.info('User Id', owner.id);
    const ownerInfo: CreateOwnerInput = {
      ...owner,
      createdAt: new Date().toISOString(),
    };
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
