export class UserBaseModel {
  id!: string;
  role!: string[];
  blackListed?: boolean;
  updated_at!: Date;
  created_at!: Date;
  type!: string;
}
