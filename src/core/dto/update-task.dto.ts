// eslint-disable-next-line max-classes-per-file
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskReport {
  @IsOptional()
  @IsString()
  public explorationDate?: string;

  @IsOptional()
  @IsNumber()
  public farmArea?: number;

  @IsOptional()
  @IsString()
  public cropName?: string;

  @IsOptional()
  @IsString()
  public cropType?: string;

  @IsOptional()
  @IsString()
  public sowingDate?: string;

  @IsOptional()
  @IsNumber()
  public plantDensity?: number;

  @IsOptional()
  @IsArray()
  public threats?: Partial<Threat[]>;

  @IsOptional()
  @IsString()
  public cropState?: string;

  @IsOptional()
  @IsNumber()
  public performance?: number;

  @IsOptional()
  @IsString()
  public floorHumidity?: string;

  @IsOptional()
  @IsString()
  public comments?: string;
}

export class UpdateTaskWorker {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public picture?: string;
}

export class Threat {
  @IsOptional()
  @IsString()
  public type?: string;

  @IsOptional()
  @IsString()
  public risk?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}

export class UpdateTaskDetail {
  @IsOptional()
  @IsString()
  public taskName?: string;

  @IsOptional()
  @IsString()
  public actualStartDate?: string;

  @IsOptional()
  @IsString()
  public actualEndDate?: string;

  @IsOptional()
  public assignedTo?: Partial<UpdateTaskWorker>;

  @IsOptional()
  @IsNumber()
  public currentCost?: number;

  @IsOptional()
  @IsString()
  public commentOperation?: string;
}

export class UpdateTaskDto {
  @IsString()
  public id?: string;

  @IsOptional()
  public detail?: Partial<UpdateTaskDetail>;

  @IsOptional()
  public report?: Partial<UpdateTaskReport>;
}
