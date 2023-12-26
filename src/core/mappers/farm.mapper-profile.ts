import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { FarmDto } from '@dtos/farm.dto';
import { Farm } from '@models/farm.model';
import { AutomapperProfile, InjectMapper } from '@timonmasberg/automapper-nestjs';

export class FarmMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        FarmDto,
        Farm,
        forMember((dest: Farm) => dest.id, ignore()),
      );
      createMap(mapper, Farm, FarmDto);
    };
  }
}
