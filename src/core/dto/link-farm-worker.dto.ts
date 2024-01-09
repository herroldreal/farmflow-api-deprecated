import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class LinkFarmWorkerDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  public workerId!: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  public farmId!: string;
}
