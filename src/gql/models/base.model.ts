import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType()
export class BaseInput {
  @IsString()
  @Field(() => GraphQLISODateTime, { name: 'createdAt', nullable: false })
  public createdAt: string = new Date().toISOString();

  @IsString()
  @IsOptional()
  @Field(() => GraphQLISODateTime, { name: 'updatedAt', nullable: true })
  public updatedAt?: string;
}
