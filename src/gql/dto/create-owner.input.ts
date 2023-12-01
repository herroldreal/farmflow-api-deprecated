import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, ArrayNotEmpty, IsOptional, IsUrl } from 'class-validator';

import { BaseInput } from './base.input';

@InputType()
export class CreateOwnerInput extends BaseInput {
  @Field({ name: 'id', nullable: true })
  @IsOptional()
  @IsString()
  public id!: string;

  @IsString()
  @Field({ name: 'name', nullable: false })
  public name!: string;

  @IsString()
  @Field({ name: 'email', nullable: false })
  public email!: string;

  @IsString()
  @Field({ name: 'phone', nullable: false })
  public phone!: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @Field({
    name: 'picture',
    nullable: true,
    description: 'Porfile Picture',
    defaultValue: 'https://thefarmflot/default/',
  })
  public picture?: string;

  @IsString()
  @IsOptional()
  @Field({ name: 'country', nullable: true, defaultValue: 'Nicaragua' })
  public country?: string;

  @Field({ name: 'countryCode', nullable: true, defaultValue: '505' })
  @IsString()
  @IsOptional()
  public countryCode?: string;

  @IsString()
  @Field({ name: 'farmId', description: 'Farm ID to which this user belongs (Owner or Worker)', nullable: true })
  @IsOptional()
  public farmId?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ name: 'blackListed', description: '', nullable: true, defaultValue: false })
  public blackListed?: boolean;

  @ArrayNotEmpty()
  @Field({
    name: 'roles',
    description:
      'Role or roles assigned to the application user, for granting or denying access to certain areas of farm management.',
    nullable: false,
    defaultValue: 'worker',
  })
  @IsString({ each: true })
  public roles!: string[];
}
