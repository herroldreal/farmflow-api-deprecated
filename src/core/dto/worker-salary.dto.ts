import { AutoMap } from '@automapper/classes';
import { SalaryHistoryDto } from '@dtos/salary-history.dto';
import { WorkerBenefitsDto } from '@dtos/worker-benefits.dto';
import { WorkerSalaryDeductionsDto } from '@dtos/worker-salary-deductions.dto';
import { EmployeeStatus } from '@models/worker.model';

export class WorkerSalaryDto {
  @AutoMap()
  public amount?: number;

  @AutoMap()
  public paid?: boolean;

  @AutoMap()
  public paymentDate?: string;

  @AutoMap()
  public currency?: string;

  @AutoMap()
  public bankInfo?: string;

  @AutoMap()
  public employeeStatus?: EmployeeStatus;

  @AutoMap(() => WorkerSalaryDeductionsDto)
  public deductions?: WorkerSalaryDeductionsDto;

  @AutoMap(() => WorkerBenefitsDto)
  public benefits?: WorkerBenefitsDto;

  @AutoMap(() => [SalaryHistoryDto])
  public history?: SalaryHistoryDto[];
}
