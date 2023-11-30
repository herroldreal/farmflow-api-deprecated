import { InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UserInput {
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
  public countryCode!: string;

  @IsBoolean()
  @IsOptional()
  public blackListed!: boolean;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public roles!: string[];
}
