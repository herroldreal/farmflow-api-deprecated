import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';

export class BaseModel {
  @IsString()
  @AutoMap()
  public createdAt: string = new Date().toISOString();

  @AutoMap()
  @IsString()
  @IsOptional()
  public updatedAt?: string;
}
