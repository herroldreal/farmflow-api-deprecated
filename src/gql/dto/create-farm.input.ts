import { capitalize } from '@common/utils/string.utils';
import { BaseInput } from '@dtos/base.input';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { AreaMeasurementUnit } from 'core/enums/area-measurement-unit';
import { MilkMeasuramentUnit } from 'core/enums/milk-measurament-unit';
import { WeightMeasurementUnit } from 'core/enums/weight-measurement-unit';

registerEnumType(AreaMeasurementUnit, {
  name: 'AreaMeasurementUnit',
});
registerEnumType(MilkMeasuramentUnit, {
  name: 'MilkMeasuramentUnit',
});
registerEnumType(WeightMeasurementUnit, {
  name: 'WeightMeasurementUnit',
});

@InputType()
export class CreateFarmInput extends BaseInput {
  @Field({ name: 'ownerId', nullable: true })
  @IsOptional()
  @IsNotEmpty()
  public ownerId?: string;

  @Field({ name: 'id', nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
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

  @Field({ name: 'areaMeasurementUnit', nullable: false })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(AreaMeasurementUnit)
  public areaMeasurementUnit!: AreaMeasurementUnit;

  @Field({ name: 'milkMeasurement', nullable: false })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(MilkMeasuramentUnit)
  public milkMeasurement!: MilkMeasuramentUnit;

  @Field({ name: 'weightMeasurement', nullable: false })
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(WeightMeasurementUnit)
  public weightMeasurement!: WeightMeasurementUnit;

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
