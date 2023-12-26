import { AutoMap } from '@automapper/classes';

export class SalaryHistoryDto {
  @AutoMap()
  public amount?: number;

  @AutoMap()
  public date?: string;
}
