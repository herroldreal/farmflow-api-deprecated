import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CredentialesInput {
  @IsString({ always: true })
  public email!: string;

  @IsString({ always: true })
  public password!: string;
}
