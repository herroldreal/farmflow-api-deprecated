import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class UnlinkFarmOwnerDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  public ownerId!: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  public farmId!: string;
}
