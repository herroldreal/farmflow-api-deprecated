import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { WorkerDto } from '@dtos/worker.dto';
import { Worker } from '@models/worker.model';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

export class WorkerMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, WorkerDto, Worker);
      createMap(
        mapper,
        WorkerDto,
        Worker,
        forMember((dest: Worker) => dest.id, ignore()),
      );
      createMap(mapper, Worker, WorkerDto);
    };
  }
}
