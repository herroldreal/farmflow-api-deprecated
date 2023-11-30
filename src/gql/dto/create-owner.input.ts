import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, ArrayNotEmpty, IsOptional } from 'class-validator';

import { BaseInput } from './base.input';

@InputType()
export class CreateOwnerInput extends BaseInput {
  @Field({ name: 'Id', nullable: false })
  @IsString({ always: true })
  public id!: string;

  @IsString({ always: true })
  @Field({ name: 'Name', nullable: false })
  public name!: string;

  @IsString({ always: true })
  @Field({ name: 'Email', nullable: false })
  public email!: string;

  @IsString({ always: true })
  @Field({ name: 'Phone', nullable: false })
  public phone!: string;

  @IsString()
  @IsOptional()
  @Field({ name: 'Country', nullable: true })
  public country?: string;

  @Field({ name: 'CountryCode', nullable: true })
  @IsString()
  @IsOptional()
  public countryCode?: string;

  @IsString()
  @Field({ name: 'FarmID', description: 'Farm ID to which this user belongs (Owner or Worker)', nullable: true })
  @IsOptional()
  public farmId?: string;

  @IsBoolean()
  @Field({ name: 'BlackListed', description: '', nullable: false })
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @Field({
    name: 'Roles',
    description:
      'Role or roles assigned to the application user, for granting or denying access to certain areas of farm management.',
    nullable: false,
  })
  @IsString({ each: true })
  public roles!: string[];
}
