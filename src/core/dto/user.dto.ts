import { ArrayNotEmpty, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsString()
  @IsUUID()
  public id!: string;

  @IsString({ always: true })
  public name!: string;

  @IsString({ always: true })
  public email!: string;

  @IsString({ always: true })
  public phone!: string;

  @IsString({ always: true })
  public country!: string;

  @IsString()
  @IsOptional()
  public countryCode?: string;

  @IsString()
  @IsOptional()
  public farmId?: string;

  @IsBoolean()
  @IsOptional()
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public roles!: string[];
}
