import { BaseInput } from '@models/base.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Farm extends BaseInput {
  @Field(() => ID)
  public ownerId?: string;

  @Field(() => ID)
  public id?: string;

  @Field()
  public name!: string;

  @Field()
  public abbreviation?: string;

  @Field({ name: 'purpose' })
  public purpose!: string;

  @Field({ name: 'totalPropertyArea' })
  public totalPropertyArea!: number;

  @Field({ name: 'cattleFarmingArea' })
  public cattleFarmingArea!: number;

  @Field({ name: 'areaMeasurementUnit' })
  public areaMeasurementUnit!: string;

  @Field({ name: 'milkMeasurement' })
  public milkMeasurement!: string;

  @Field({ name: 'weightMeasurement' })
  public weightMeasurement!: string;

  @Field({ name: 'country' })
  public country?: string;

  @Field({ name: 'city' })
  public city?: string;

  @Field({ name: 'countryCode' })
  public countryCode?: string;

  @Field({ name: 'phoneNumber' })
  public phoneNumber?: string;

  @Field({ name: 'latitude' })
  public latitude?: number;

  @Field({ name: 'longitude' })
  public longitude?: number;
}
