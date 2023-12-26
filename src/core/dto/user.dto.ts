import { AutoMap } from '@automapper/classes';
import { ArrayNotEmpty, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsString()
  @IsUUID()
  @AutoMap()
  public id!: string;

  @IsString({ always: true })
  @AutoMap()
  public name!: string;

  @IsString({ always: true })
  @AutoMap()
  public email!: string;

  @IsString({ always: true })
  @AutoMap()
  public phone!: string;

  @IsString({ always: true })
  @AutoMap()
  public country!: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  public countryCode?: string;

  @IsString()
  @IsOptional()
  @AutoMap(() => Array<string>)
  public farms?: string[];

  @IsBoolean()
  @IsOptional()
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public roles!: string[];
}
