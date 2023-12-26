import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class UnlinkFarmWorkerDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  public workerId!: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  public farmId!: string;
}
