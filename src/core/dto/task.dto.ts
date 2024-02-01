import { AutoMap } from '@automapper/classes';
import { IsArray, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class TaskReport {
  @AutoMap()
  @IsOptional()
  @IsString()
  public explorationDate?: string;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public farmArea?: number;

  @AutoMap()
  @IsOptional()
  @IsString()
  public cropName?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public cropType?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public sowingDate?: string;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public plantDensity?: number;

  @AutoMap()
  @IsOptional()
  @IsArray()
  public threats?: Threat[];

  @AutoMap()
  @IsOptional()
  @IsString()
  public cropState?: string;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public performance?: number;

  @AutoMap()
  @IsOptional()
  @IsString()
  public floorHumidity?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public comments?: string;
}

export enum TaskStatus {
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  OVERDUE = 'Overdue',
  PENDING = 'Pending',
}

export class FarmLocation {
  @AutoMap()
  @IsOptional()
  @IsNumber()
  public latitude?: number;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public longitude?: number;
}

export class TaskWorker {
  @AutoMap()
  @IsOptional()
  @IsString()
  public id?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public name?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public picture?: string;
}

export class Threat {
  @AutoMap()
  @IsOptional()
  @IsString()
  public type?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public risk?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public description?: string;
}

export class TaskDetail {
  @AutoMap()
  @IsOptional()
  public farmLocation?: FarmLocation;

  @AutoMap()
  @IsOptional()
  @IsString()
  public farmName?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public taskName?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public actualStartDate?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public actualEndDate?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public expectedStartDate?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public expectedEndDate?: string;

  @AutoMap()
  @IsOptional()
  public status?: TaskStatus;

  @AutoMap()
  @IsOptional()
  public assignedTo?: TaskWorker;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public plannedCost?: number;

  @AutoMap()
  @IsOptional()
  @IsNumber()
  public currentCost?: number;

  @AutoMap()
  @IsOptional()
  @IsString()
  public taskDescription?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public commentOperation?: string;
}

export class TaskDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  public id?: string;

  @AutoMap()
  @IsOptional()
  @IsUrl()
  public icon?: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  public type?: string;

  @AutoMap()
  @IsOptional()
  public detail?: TaskDetail;

  @AutoMap()
  @IsOptional()
  public report?: TaskReport;
}
