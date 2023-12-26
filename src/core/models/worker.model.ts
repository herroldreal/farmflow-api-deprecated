// eslint-disable-next-line max-classes-per-file
import { AutoMap } from '@automapper/classes';
import { BaseModel } from '@models/base.model';

export enum EmployeeStatus {
  PART = 'Tiempo parcial',
  FULL = 'Tiempo completo',
  CONTRACTOR = 'Contratista',
  TEMPORARY = 'Temporal',
  INTERN = 'Practicas',
  ASSOCIATE = 'Asociado',
}

export class WorkerBenefits {
  @AutoMap()
  public bonus?: number;
}

export class SalaryHistory {
  @AutoMap()
  public amount?: number;

  @AutoMap()
  public date?: string;
}

export class WorkerSalaryDeduction {
  @AutoMap()
  public taxes?: number;

  @AutoMap()
  public insurance?: number;
}

export class WorkerSalary {
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

  @AutoMap(() => WorkerSalaryDeduction)
  public deductions?: WorkerSalaryDeduction;

  @AutoMap(() => WorkerBenefits)
  public benefits?: WorkerBenefits;

  @AutoMap(() => [SalaryHistory])
  public history?: SalaryHistory[];
}

export class BankInfo {
  @AutoMap()
  public bankName?: string;

  @AutoMap()
  public isPrincipal?: boolean = false;

  @AutoMap()
  public isActive?: boolean;

  @AutoMap()
  public hasDebitCardAvailable?: boolean;

  @AutoMap()
  public accountNumber?: string;
}

export class Worker extends BaseModel {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public name?: string;

  @AutoMap()
  public phone?: string;

  @AutoMap()
  public email?: string;

  @AutoMap()
  public manager?: string;

  @AutoMap()
  public farmId?: string;

  @AutoMap()
  public roles!: string[];

  @AutoMap()
  public blackListed?: boolean = false;

  @AutoMap()
  public isActive?: boolean;

  @AutoMap()
  public isRegistered?: boolean = false;

  @AutoMap()
  public lastLoggedIn?: string;

  @AutoMap(() => WorkerSalary)
  public salary?: WorkerSalary;

  @AutoMap(() => [BankInfo])
  public bankInfo?: BankInfo[];
}
