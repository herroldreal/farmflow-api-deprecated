import { IsString, IsBoolean, ArrayNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateOwnerDto {
  @IsOptional()
  @IsString()
  public id!: string;

  @IsString()
  public name!: string;

  @IsString()
  public email!: string;

  @IsString()
  public phone!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  public picture?: string;

  @IsString()
  @IsOptional()
  public country?: string;

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
