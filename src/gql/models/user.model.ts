import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  public id!: string;
  public name!: string;
  public email!: string;
  public picture?: string;
  public phone!: string;
  public country?: string;
  public blackListed?: boolean;
  public roles: string[] = [];
}
