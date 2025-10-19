import {
  Address,
  Dir,
  DirAttributeFatca,
  DirConsentToProvideInformation,
  DirFatca,
  DirFatcaStatus
} from '@app/_models';

export class ApplicantFatcaAdditionalDto {
  addressFactFatca: Address;
  addressTaxResFatca: Address;
  applicantFatcaList: ApplicantFatcaDto[] = [];
  applicantId: number; // ИД клиента

  applicationId: number; // ИД заявки

  attributeFatca: DirAttributeFatca; // FATCA признак
  certificateOfRenunciation: boolean = false; // Адрес фактический

  consentToProvideInformation: boolean = false; // согласие на предоставлении инфо
  fatcaStatus: DirFatcaStatus;

  id: number; // Идентификатор

  firstName: string; // Имя

  lastName: string; // Фамилия

  middleName: string; // Отчество

  phoneNumber: string; // Номер телефона

  selfcertificationDate: string; // Дата самосертификации

  selfcertificationDateTaxResId: string; // Дата самосертификации_налоговый резидент

  tin: number; // TIN
}

export class ApplicantFatcaDto {
  dirFatca: DirFatca;
  id: number;
  result: boolean = false; // Ответ да/нет

  constructor(dirFatca?: DirFatca) {
    this.dirFatca = dirFatca;
  }
}
