import { ArgsType } from '@nestjs/graphql';
import { IsString, ArrayNotEmpty, IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class UserArgs {
  @IsString({ always: true })
  public id!: string;

  @IsString({ always: true })
  public name!: string;

  @IsString({ always: true })
  public email!: string;

  @IsString({ always: true })
  public phone!: string;

  @IsString({ always: true })
  public country?: string;

  @IsString({ always: true })
  @IsOptional()
  public countryCode?: string;

  @IsString()
  @IsOptional()
  public farmId?: string;

  @IsBoolean()
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public roles!: string[];
}
