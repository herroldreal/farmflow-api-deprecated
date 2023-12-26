import { AutoMap } from '@automapper/classes';
import { capitalize } from '@common/utils/string.utils';
import { AreaMeasurementUnit } from '@enums/area-measurement.unit';
import { FarmPurpose } from '@enums/farm-purpose.enum';
import { MilkMeasurementUnit } from '@enums/milk-measurement.unit';
import { WeightMeasurementUnit } from '@enums/weight-measurement.unit';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class FarmDto {
  @AutoMap()
  @IsOptional()
  public ownerId?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  public id?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @AutoMap()
  @IsString()
  public abbreviation?: string;

  @AutoMap()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  public totalPropertyArea!: number;

  @AutoMap()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  public cattleFarmingArea!: number;

  @AutoMap()
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(AreaMeasurementUnit)
  public areaMeasurementUnit!: AreaMeasurementUnit;

  @AutoMap()
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(MilkMeasurementUnit)
  public milkMeasurement!: MilkMeasurementUnit;

  @AutoMap()
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(WeightMeasurementUnit)
  public weightMeasurement!: WeightMeasurementUnit;

  @AutoMap()
  @Transform(({ value }) => capitalize(`${value}`))
  @IsEnum(FarmPurpose)
  public farmPurpose!: FarmPurpose;

  @AutoMap()
  @IsString()
  @IsOptional()
  public country?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  public city?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  public countryCode?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  public phoneNumber?: string;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  public latitude?: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  public longitude?: number;
}
