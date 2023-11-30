import { UserBaseModel } from './user-base.model';

export class UserEntity extends UserBaseModel {
  name!: string;
  email!: string;
  picture?: string;
  phone!: string;
  country!: string;
}
