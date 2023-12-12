/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { LinkFarmOwnerInput } from '@dtos/link-farm-owner.input';
import { CollectionReference, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { autoId } from '@google-cloud/firestore/build/src/util';
import { Farm } from '@models/farm.model';
import { User } from '@models/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { DebugLog } from '../../debug';
import { PaginationBuilder } from '../pagination.model';
import { ApiResponseBuilder } from '../response/api-response.builder';
import { Response } from '../response.model';

@Injectable()
@DebugLog('FarmRepository')
export class FarmRepository {
  constructor(
    @InjectPinoLogger(FarmRepository.name) private readonly logger: PinoLogger,
    @Inject('users') private userCollection: CollectionReference<User>,
    @Inject('farms') private farmCollection: CollectionReference<Farm>,
  ) {}

  async getAllFarms(): Promise<Response<Farm[]>> {
    this.logger.info(`Get all farm in DB - Admin purpose`);
    const query = this.farmCollection.orderBy('name');

    await query.get();

    return ApiResponseBuilder.success(200, 'Ok', new Array<Farm>());
  }

  @DebugLog('getFarm()')
  async getFarm(input: FetchFarmInput): Promise<Response<Farm[]>> {
    this.logger.info(`Get  ${JSON.stringify(input, null, 2)}`);
    let query = this.farmCollection.orderBy('name');

    if (input.lastId) {
      const startAfterDoc = await this.farmCollection.doc(input.lastId).get();
      query = query.startAfter(startAfterDoc);
    }
    this.logger.error(`Input ${JSON.stringify(input, null, 2)}`);

    const snapshot = await query.limit(input.pageSize ?? 10).get();
    const result = <Farm[]>snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
    this.logger.info(`[Farms] => ${JSON.stringify(result, null, 2)}`);
    const nextPageToken = snapshot.docs.length === input.pageSize ? snapshot.docs[input.pageSize - 1].id : null;

    if (!snapshot.empty) {
      this.logger.info(`Is Empty => ${snapshot.empty}`);
      const pagination = new PaginationBuilder().build(snapshot, input.pageSize ?? 10, nextPageToken);
      this.logger.info(`Pagination => ${JSON.stringify(pagination, null, 2)}`);
      return ApiResponseBuilder.success(200, 'Informacion obtenida correctamente', result, pagination);
    }
    return ApiResponseBuilder.notFound();
  }

  @DebugLog('createFarm()')
  async createFarm(data: CreateFarmInput): Promise<Response<Farm>> {
    this.logger.info(`Create farm with data ${JSON.stringify(data, null, 2)}`);

    const farmId = autoId();
    const farmInfo: CreateFarmInput = {
      ...data,
      id: farmId,
      createdAt: new Date().toISOString(),
    };
    const farmRef = this.farmCollection.doc(farmId);
    await farmRef.set(farmInfo);

    const farmData = await this.farmCollection.doc(farmId).get();
    return ApiResponseBuilder.success(200, 'Informacion obtenida correctamente', farmData.data());
  }

  @DebugLog('linkOwnerWithFarm()')
  async linkOwnerWithFarm(data: LinkFarmOwnerInput): Promise<Response<boolean>> {
    this.logger.info(`Link owner ${data.ownerId} with farm ${data.farmId}`);

    const farmRef = this.farmCollection.doc(data.farmId);
    const userRef = this.userCollection.doc(data.ownerId);

    const farm = await farmRef.get();
    if (farm.exists) {
      const user = await userRef.get();
      if (user.exists) {
        try {
          await farmRef.update({ ownerId: data.ownerId });
          await userRef.update({ farmId: data.farmId });
          return ApiResponseBuilder.success(200, `El usuario ${data.ownerId} ha sido vinculado exitosamente`, true);
        } catch (e: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          return ApiResponseBuilder.withError(404, e.message);
        }
      }
      return ApiResponseBuilder.notFound();
    }
    return ApiResponseBuilder.notFound();
  }
}
