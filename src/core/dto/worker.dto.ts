import { AutoMap } from '@automapper/classes';
import { BankInfoDto } from '@dtos/bank-info.dto';
import { WorkerSalaryDto } from '@dtos/worker-salary.dto';
import { IsAlphanumeric, IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class WorkerDto {
  @AutoMap()
  @IsOptional()
  public id?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public name?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public phone?: string;

  @AutoMap()
  @IsOptional()
  @IsEmail()
  public email?: string;

  @AutoMap()
  @IsOptional()
  @IsAlphanumeric()
  public manager?: string;

  @AutoMap()
  @IsOptional()
  @IsAlphanumeric()
  public farmId?: string;

  @AutoMap()
  @IsString({ each: true })
  public roles!: string[];

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  public blackListed?: boolean = false;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;

  @AutoMap()
  @IsOptional()
  @IsBoolean()
  public isRegistered?: boolean = false;

  @AutoMap()
  @IsOptional()
  @IsDateString()
  public lastLoggedIn?: string;

  @AutoMap(() => WorkerSalaryDto)
  public salary?: WorkerSalaryDto;

  @AutoMap(() => [BankInfoDto])
  public bankInfo?: BankInfoDto[];
}
