import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class LinkFarmOwnerDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  public ownerId!: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  public farmId!: string;
}
