import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { firestore } from 'firebase-admin';

import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import DocumentData = firestore.DocumentData;
import { User } from '../../gql/models';

@Injectable()
export class UserRepository {
  private collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject(REQUEST) private readonly request: { user: any }) {
    this.collection = firestore().collection('users');
  }

  async createOwner(owner: CreateOwnerDto): Promise<User> {
    const userId: string = this.request.user.uid as string;
    const user: Omit<User, 'id'> = {
      ...owner,
      createdAt: new Date().toISOString(),
      userId,
    };

    const result = await this.collection.add(user);
    return { id: result.id, ...user };
  }
}
