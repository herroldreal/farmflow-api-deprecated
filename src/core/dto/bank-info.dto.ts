import { AutoMap } from '@automapper/classes';

export class BankInfoDto {
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
