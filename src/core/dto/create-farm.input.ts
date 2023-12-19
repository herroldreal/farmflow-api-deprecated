import { capitalize } from '@common/utils/string.utils';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { BaseInput } from './base.input';
import { AreaMeasurementUnit } from '../enums/area-measurement.unit';
import { FarmPurpose } from '../enums/farm-purpose.enum';
import { MilkMeasurementUnit } from '../enums/milk-measurement.unit';
import { WeightMeasurementUnit } from '../enums/weight-measurement.unit';

registerEnumType(FarmPurpose, {
  name: 'FarmPurpose',
});
registerEnumType(AreaMeasurementUnit, {
  name: 'AreaMeasurementUnit',
});
registerEnumType(MilkMeasurementUnit, {
  name: 'MilkMeasurementUnit',
});
registerEnumType(WeightMeasurementUnit, {
  name: 'WeightMeasurementUnit',
});

@InputType()
export class CreateFarmInput extends BaseInput {
  @Field({ name: 'ownerId', nullable: true })
  @IsOptional()
  public ownerId?: string;

  @Field({ name: 'id', nullable: true })
  @IsString()
  @IsOptional()
  public id?: string;

  @Field({ name: 'name', nullable: false })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @Field({ name: 'abbreviation', nullable: true })
  @IsString()
  public abbreviation?: string;

  @Field({ name: 'purpose', nullable: false })
  @IsString()
  @IsNotEmpty()
  public purpose!: string;

  @Field({ name: 'totalPropertyArea', nullable: false })
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  public totalPropertyArea!: number;

  @Field({ name: 'cattleFarmingArea', nullable: false })
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  public cattleFarmingArea!: number;

  @Field({ name: 'areaMeasurementUnit', nullable: false, defaultValue: AreaMeasurementUnit.HECTARE })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(AreaMeasurementUnit)
  public areaMeasurementUnit!: AreaMeasurementUnit;

  @Field({ name: 'milkMeasurement', nullable: false, defaultValue: MilkMeasurementUnit.GALLONS })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(MilkMeasurementUnit)
  public milkMeasurement!: MilkMeasurementUnit;

  @Field({ name: 'weightMeasurement', nullable: false, defaultValue: WeightMeasurementUnit.KILO })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(WeightMeasurementUnit)
  public weightMeasurement!: WeightMeasurementUnit;

  @Field({ name: 'farmPurpose', nullable: false, defaultValue: FarmPurpose.DOUBLEPURPOSE })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(FarmPurpose)
  public farmPurpose!: FarmPurpose;

  @Field({ name: 'country', nullable: true })
  @IsString()
  @IsOptional()
  public country?: string;

  @Field({ name: 'city', nullable: true })
  @IsString()
  @IsOptional()
  public city?: string;

  @Field({ name: 'countryCode', nullable: true })
  @IsString()
  @IsOptional()
  public countryCode?: string;

  @Field({ name: 'phoneNumber', nullable: true })
  @IsString()
  @IsOptional()
  public phoneNumber?: string;

  @Field({ name: 'latitude', nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  public latitude?: number;

  @Field({ name: 'longitude', nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  public longitude?: number;
}
