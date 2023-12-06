import { PaginationInput } from '@dtos/pagination.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class FetchFarmInput extends PaginationInput {
  public farmId?: string;
  public lastId?: string;
}
