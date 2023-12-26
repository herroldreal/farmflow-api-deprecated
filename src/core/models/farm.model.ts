import { AutoMap } from '@automapper/classes';

import { BaseModel } from './base.model';

export class Farm extends BaseModel {
  @AutoMap()
  public ownerId?: string;

  @AutoMap()
  public id?: string;

  @AutoMap()
  public name!: string;

  @AutoMap()
  public abbreviation?: string;

  @AutoMap()
  public totalPropertyArea!: number;

  @AutoMap()
  public cattleFarmingArea!: number;

  @AutoMap()
  public areaMeasurementUnit!: string;

  @AutoMap()
  public milkMeasurement!: string;

  @AutoMap()
  public weightMeasurement!: string;

  @AutoMap()
  public farmPurpose!: string;

  @AutoMap()
  public country?: string;

  @AutoMap()
  public city?: string;

  @AutoMap()
  public countryCode?: string;

  @AutoMap()
  public phoneNumber?: string;

  @AutoMap()
  public latitude?: number;

  @AutoMap()
  public longitude?: number;
}
