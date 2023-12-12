import { BaseInput } from '@dtos/base.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class LinkFarmOwnerInput extends BaseInput {
  @Field({ name: 'ownerId', nullable: false })
  @IsAlphanumeric()
  @IsNotEmpty()
  public ownerId!: string;

  @Field({ name: 'farmId', nullable: false })
  @IsUUID()
  @IsNotEmpty()
  public farmId!: string;
}
