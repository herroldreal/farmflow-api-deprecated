import { Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

export class BaseInput {
  @IsString()
  @Field({ name: 'createdAt', nullable: false })
  public createdAt: string = new Date().toISOString();

  @IsString()
  @IsOptional()
  @Field({ name: 'updatedAt', nullable: true })
  public updatedAt?: string;
}
