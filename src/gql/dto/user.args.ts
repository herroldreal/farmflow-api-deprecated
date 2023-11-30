import { ArgsType } from '@nestjs/graphql';
import { IsString, ArrayNotEmpty, IsBoolean } from 'class-validator';

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
  public countryCode?: string;

  @IsBoolean()
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public roles!: string[];
}
