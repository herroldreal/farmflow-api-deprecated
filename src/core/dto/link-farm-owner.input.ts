import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

import { BaseInput } from './base.input';

@InputType()
export class LinkFarmOwnerInput extends BaseInput {
  @Field({ name: 'ownerId', nullable: false })
  @IsAlphanumeric()
  @IsNotEmpty()
  public ownerId!: string;

  @Field({ name: 'farmId', nullable: false })
  @IsAlphanumeric()
  @IsNotEmpty()
  public farmId!: string;
}
