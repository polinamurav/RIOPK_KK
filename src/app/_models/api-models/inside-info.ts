import { AbsClientCardDto, AccountDto, InternalCreditHistoryDto } from '..';

export class InsideInfoDto {
  accountDto: AccountDto[];
  absClientCardDto?: AbsClientCardDto[];
  internalCreditHistoryDto?: InternalCreditHistoryDto;
}
