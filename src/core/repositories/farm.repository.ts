import { CreateFarmInput } from '@dtos/create-farm.input';
import { FetchFarmInput } from '@dtos/fetch-farm.input';
import { CollectionReference, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { Farm } from '@models/farm.model';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { uuid } from 'uuidv4';

import { DebugLog } from '../../debug';
import { ApiResponseBuilder } from '../api-response.builder';
import { PaginationBuilder } from '../pagination.model';
import { Response } from '../response.model';

@Injectable()
@DebugLog('FarmRepository')
@UseGuards(AuthGuard('firebase-jwt'))
export class FarmRepository {
  constructor(
    @InjectPinoLogger(FarmRepository.name) private readonly logger: PinoLogger,
    @Inject('farms') private farmCollection: CollectionReference<Farm>,
  ) {}

  @DebugLog('getFarm()')
  async getFarm(input: FetchFarmInput): Promise<Response<Farm[]>> {
    this.logger.info(`get farm with id ${input.farmId}`);
    let query = this.farmCollection.orderBy('name');

    if (input.lastId) {
      const startAfterDoc = await this.farmCollection.doc(input.lastId).get();
      query = query.startAfter(startAfterDoc);
    }

    const snapshot = await query.limit(input.pageSize).get();
    const result = <Farm[]>snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data());
    const nextPageToken = snapshot.docs.length === input.pageSize ? snapshot.docs[input.pageSize - 1].id : null;

    if (!snapshot.empty) {
      const pagination = new PaginationBuilder().build(snapshot, input.pageSize, nextPageToken);
      return new ApiResponseBuilder<Farm[]>()
        .withStatus(200)
        .withMessage('')
        .withData(result)
        .withPagination(pagination)
        .build();
    }
    return new ApiResponseBuilder<Farm[]>().notFound();
  }

  // TODO: Verify weight enum and error returned with name non-null field
  @DebugLog('createFarm()')
  async createFarm(data: CreateFarmInput): Promise<Response<Farm>> {
    this.logger.info(`Create farm with data ${JSON.stringify(data, null, 2)}`);

    const farmId = uuid();
    const farmInfo: CreateFarmInput = {
      ...data,
      id: farmId,
      createdAt: new Date().toISOString(),
    };
    const farmRef = this.farmCollection.doc(farmId);
    await farmRef.set(farmInfo);

    const farmData = await this.farmCollection.doc(farmId).get();
    return new ApiResponseBuilder<Farm>()
      .withMessage('Informacion obtenida correctamente')
      .withStatus(200)
      .withData(farmData.data())
      .build();
  }
}
