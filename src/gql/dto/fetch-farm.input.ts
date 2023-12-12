import { Field, InputType } from '@nestjs/graphql';
import { IsAlphanumeric, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FetchFarmInput {
  @Field({ name: 'pageSize', nullable: true, defaultValue: 10 })
  @IsNumber()
  @IsOptional()
  public pageSize?: number;

  @Field({ name: 'lastId', nullable: true })
  @IsString()
  @IsAlphanumeric()
  @IsOptional()
  public lastId?: string;
}
