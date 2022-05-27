import {
  AbsClientInfoResponseDto,
  AsanInnIntegrationDto,
  AbsProvenIncomeResponseDto,
  CountCreditHistoryDto,
  CreditInfoResponseDto,
  InternalLoanListResponseDto,
  RevenueServiceEmploymentResponseDto
} from "@app/_models";

export class IntegrationInterfaceDto {
  absClientInfoResponseDto: AbsClientInfoResponseDto;
  absProvenIncomeResponseDto: AbsProvenIncomeResponseDto;
  asanInnResponse: AsanInnIntegrationDto;
  created: string | Date;
  id: number;
  innCountCreditHistoryDto: CountCreditHistoryDto;
  innCreditInfoResponse: CreditInfoResponseDto;
  internalLoanListResponseDto: InternalLoanListResponseDto;
  pinCountCreditHistoryDto: CountCreditHistoryDto;
  pinCreditInfoResponse: CreditInfoResponseDto;
  revenueServiceEmploymentResponseDto: RevenueServiceEmploymentResponseDto;
  updated: string | Date;
}

export class IntegrationSetting {
  created: string;
  isServiceOn: boolean;
  serviceCode: string;
  serviceName: string;
  updated: string;
}
