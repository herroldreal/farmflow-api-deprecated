import { Filtering } from '@decorators/filtering.decorator';
import { Pagination } from '@decorators/pagination.decorator';
import { Sorting } from '@decorators/sorting.decorator';
import { CreateFarmInput } from '@dtos/create-farm.input';
import { LinkFarmOwnerInput } from '@dtos/link-farm-owner.input';
import { Collections } from '@enums/collections';
import { CollectionReference, QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
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
    @Inject(Collections.USERS) private userCollection: CollectionReference<User>,
    @Inject(Collections.FARMS) private farmCollection: CollectionReference<Farm>,
  ) {}

  @DebugLog('getAllFarms()')
  async getAllFarms(pagination: Pagination, sort?: Sorting, filter?: Filtering): Promise<Response<Farm[]>> {
    const { lastDoc, limit } = pagination;
    let query = this.farmCollection.limit(limit);

    if (sort) query.orderBy(sort.property, sort.direction);
    if (filter) query = query.where(filter.property, filter.rule, filter.value);
    if (lastDoc) {
      const startAfterDoc = await this.farmCollection.doc(lastDoc).get();
      query = query.startAfter(startAfterDoc);
    }

    const data: QuerySnapshot = await query.get();
    const snapshot: QuerySnapshot = await this.farmCollection.get();
    if (!data.empty) {
      const result = <Farm[]>data.docs.map((doc: QueryDocumentSnapshot) => doc.data());
      const lastId = data.docs.length === limit ? data.docs[limit - 1].id : undefined;
      const resultPagination = new PaginationBuilder().build(snapshot, limit, lastId);

      return ApiResponseBuilder.success(200, 'Informacion obtenida correctamente', result, resultPagination);
    }
    return ApiResponseBuilder.notFound();
  }

  @DebugLog('getFarm()')
  async getFarm(filter: Filtering): Promise<Response<Farm>> {
    this.logger.info(`Get  ${JSON.stringify(filter, null, 2)}`);
    const doc = await this.farmCollection.doc(filter.value).get();
    if (doc.exists) {
      const result = doc.data();
      this.logger.info(`Farm => ${JSON.stringify(result, null, 2)}`);

      return ApiResponseBuilder.success(200, 'Informacion obtenida correctamente', result);
    }
    return ApiResponseBuilder.notFound();
  }

  @DebugLog('getFarmsByOwner')
  async getFarmByOwner(sort: Sorting, filter: Filtering): Promise<Response<Farm[]>> {
    this.logger.info(`Get  ${JSON.stringify(filter, null, 2)}`);
    const snapshot = await this.farmCollection
      .limit(10)
      .orderBy(sort.property, sort.direction)
      .where(filter.property, filter.rule, filter.value)
      .get();
    if (!snapshot.empty) {
      const result = <Farm[]>snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
      this.logger.info(`[Farm] => ${JSON.stringify(result, null, 2)}`);

      return ApiResponseBuilder.success(200, 'Informacion obtenida correctamente', result);
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
