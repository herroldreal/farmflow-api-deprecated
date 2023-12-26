import { AutoMap } from '@automapper/classes';

export class WorkerSalaryDeductionsDto {
  @AutoMap()
  public taxes?: number;

  @AutoMap()
  public insurance?: number;
}
