import { AutoMap } from '@automapper/classes';
import { BaseModel } from '@models/base.model';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends BaseModel {
  @AutoMap()
  public id!: string;

  @AutoMap()
  public name!: string;

  @AutoMap()
  public email!: string;

  @AutoMap(() => Array<string>)
  public farms?: string[];

  @AutoMap()
  public picture?: string;

  @AutoMap()
  public phone!: string;

  @AutoMap()
  public country?: string;

  @AutoMap()
  public blackListed?: boolean;

  @AutoMap()
  public roles: string[] = [];
}
