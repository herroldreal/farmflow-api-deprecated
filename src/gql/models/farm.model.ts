import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Farm {
  public ownerId?: string;
  public id?: string;
  public name!: string;
  public abbreviation?: string;
  public purpose!: string;
  public totalPropertyArea!: number;
  public cattleFarmingArea!: number;
  public areaMeasurementUnit!: string;
  public milkMeasurement!: string;
  public weightMeasurement!: string;
  public country?: string;
  public city?: string;
  public countryCode?: string;
  public phoneNumber?: string;
  public latitude?: number;
  public longitude?: number;
}
