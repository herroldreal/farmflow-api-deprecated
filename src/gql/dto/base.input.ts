import { IsString } from 'class-validator';

export class BaseInput {
  @IsString()
  public createdAt!: string;

  @IsString()
  public updatedAt!: string;
}
