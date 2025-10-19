import { Address, BeneficiaryOwner, DirAttributeFatca, DirFatcaStatus, MaritalStatus } from '..';
import { Dir, DirAbsCode, DirCountry } from './directory';
import { SelfEmployment } from './self-employment';

import { Employment } from './employment';
import { IdentityCard } from '@app/_models';
import { BRMS1ResponseDto, BRMS2ResponseDto } from './brms';

export class ApplicantRoles {
  id: string;
  nameRu: string;
  codeAbs: number;
}

export class Applicant {
  absCustomerId: number;
  affiliated: boolean;
  age: number;
  applicantRoles: ApplicantRoles;
  applicationId: number;
  approvedIncome: number;
  beneficiaryOwner: BeneficiaryOwner;
  birthAddressObj: Address;
  birthDate: string;
  birthPlace: string;
  brms1Response: BRMS1ResponseDto;
  brms2Response: BRMS2ResponseDto;
  childrenUnder18: number;
  citizenship: DirCountry;
  comment: string;
  craMethod: number;
  created: string;
  dboAgreement: boolean;
  decisionMakingIncome: number;
  dirAccommodationType: Dir;
  dirEducation: Dir;
  documentIsValid: boolean;
  doubleCitizenship: DirCountry;
  email: string;
  employment: Employment;
  factAddress: string;
  factAddressObj: Address;
  firstName: string;
  fullFormIncome: number;
  gender: DirAbsCode;
  generatedCode: string;
  hasActiveAccounts: boolean;
  homePhone: string;
  id: number;
  identityCard: IdentityCard;
  infoCheckDate: string;
  infoIsValid: boolean;
  dirFatcaAttribute: DirAttributeFatca;
  dirFatcaStatus: DirFatcaStatus;
  integrationInterfaceId: number;
  isActiveInOdb: boolean;
  isAddIncome: boolean;
  isAmlNeeded: boolean;
  isApplicantStopList: boolean;
  isClientMilitary: boolean;
  isSoleTrader: boolean;
  isClientVip: boolean;
  isCreditHistory: boolean;
  isEmployee: boolean;
  isInsider: boolean;
  isIpdl: boolean;
  isIpdlRelative: boolean;
  isIpldOperation: boolean;
  isOverdue6: boolean;
  isRealEqFactAddress: boolean;
  isResident: boolean;
  isUsaResident: boolean;
  isMobilePhoneConfirmed: boolean;
  language: string;
  lastName: string;
  maritalStatus: MaritalStatus;
  middleName: string;
  militaryDuty: Dir;
  mobileContactCommunicationType: Dir;
  mobilePhone: string;
  mobilePhoneCommunicationType: Dir;
  numberOfEnrolment: number;
  onlineExtClientId: string;
  postAddress: string;
  postAddressObj: Address;
  preApprovedOfferId: number;
  preapprovedFactor: Dir;
  receivedCode: string;
  regAddress: string;
  regAddressObj: Address;
  selfEmployment: SelfEmployment;
  shortFormIncome: number;
  spouseFirstName: string;
  spouseLastName: string;
  spousePin: string;
  totalJobExp: number;
  updated: string;
  socCard: IdentityCard;
  esignAgreement: boolean;
  // TODO Romanovski: этих полей нет в Dto
  // attFailed: number;
  // facebookId: string;
  // facebookLanguage: string;
  // maxAttGenerate: number;
  // maxAttInput: number;
  // timeoutGenerate: number;
  // timeoutInput: number;
  // totalIncome: number;
  codeAbs: number;
  ignoreIncome: boolean;
  clientInBlackList: boolean;
  totalNetIncomeNorq: number;
  totalNetIncome6M: number;

  firstNameEn: string;
  lastNameEn: string;
  middleNameEn: string;
}

export class ApplicantDto {
  absCustomerId: number; // id клиента из Интеграции ABS создание карточки клиента
  affiliated: boolean; // Является ли клиент аффилированным лицом
  age: number; // Возраст клиента
  applicantRolesId: string; // Id роли клиента
  applicationId: number; // id заявки
  approvedIncome: number;
  beneficiaryOwnerDto: BeneficiaryOwner;
  birthAddressObj: Address; // Место рождения заявителя(Объект)
  birthDate: string;
  birthPlace: string;
  brms1Response: BRMS1ResponseDto; // Ответ БРМС1
  brms2Response: BRMS2ResponseDto; // Ответ БРМС2
  childrenUnder18: number; // Количество детей до 18-ти лет
  citizenshipId: number; // Id гражданства клиента
  comment: string;
  craMethod: number;
  dboAgreement: boolean;
  decisionMakingIncome: number;
  dirAccommodationTypeId: number;
  documentIsValid: boolean; // Документ является действительным
  doubleCitizenshipId: number;
  educationId: number; // Id образования клиента
  email: string; // Электронная почта клиента
  employmentId: number; // Id работодателя
  factAddress: string; // Фактический адрес клиента
  factAddressObj: Address; // Адрес проживания заявителя(Объект)
  firstName: string; // Фамилия заявителя
  fullFormIncome: number;
  genderId: number; // Id пола клиента
  generatedCode: string;
  dirFatcaAttribute: DirAttributeFatca;
  hasActiveAccounts: boolean; // Имеются активные счета
  homePhone: string; // Домашний телефон клиента
  id: number; // id заявителя
  identityCardId: number; // Id документа
  infoCheckDate: string; // Дата проверки информации
  infoIsValid: boolean; // Информация является действительной
  integrationInterfaceId: number;
  isActiveInOdb: boolean;
  isAddIncome: boolean; // Имеются доп. доходы
  isAmlNeeded: boolean;
  isApplicantStopList: boolean; // Находится в стоп-листах
  isClientMilitary: boolean; // Признак того, является ли клиент силовиком
  isClientVip: boolean; // Признак того, является ли клиент VIP клиентом
  isCreditHistory: boolean;
  isEmployee: boolean;
  isInsider: boolean;
  isIpdl: boolean; // Является ли клиент публичным должностным лицом
  isIpdlRelative: boolean; // Связан ли клиент с публичным должностным лицом
  isIpldOperation: boolean;
  isOverdue6: boolean;
  isRealEqFactAddress: boolean; // Совпадает ли адрес проживания с фактическим
  isResident: boolean; // Является ли клиент резидентом
  isUsaResident: boolean; // Является резидентом США
  isMobilePhoneConfirmed: boolean;
  language: string; // Язык клиента
  lastName: string; // Фамилия заявителя
  maritalStatusId: number; // Id семейного положения клиента
  middleName: string; // Фамилия заявителя
  militaryDutyId: number; // Id военного статуса клиента
  mobileContactCommunicationTypeId: number;
  mobilePhone: string; // Номер телефона клиента
  mobilePhoneCommunicationTypeId: number;
  numberOfEnrolment: number;
  onlineExtClientId: string;
  postAddress: string; // Почтовый адрес клиента
  postAddressObj: Address; // Почтовый адрес клиента(объект)
  preApprovedOfferId: number; // id предодобренного предложения из таблицы pre_approved_offer
  preapprovedFactorId: number;
  receivedCode: string;
  regAddress: string; // Адрес регистрации клиента
  regAddressObj: Address; // Адрес регистрации заявителя(Объект)
  selfEmploymentId: number;
  shortFormIncome: number; // Доход, указанный на краткой анкете
  spouseFirstName: string; // Имя супруга(и)
  spouseLastName: string; // Фамилия
  spousePin: string; // Номер документа супруга(и)
  totalJobExp: number; // Стаж работы
  socCardId: number;
  codeAbs: number;
  ignoreIncome: boolean;
  clientInBlackList: boolean;
  totalNetIncomeNorq: number;
  totalNetIncome6M: number;
  dirFatcaStatusId: number;
  esignAgreement: boolean;

  firstNameEn: string;
  lastNameEn: string;
  middleNameEn: string;

  // TODO Romanovski: этих полей нет в Dto
  // created: string;
  // facebookId: string;
  // facebookLanguage: string;
  // photo: string;
  // photoBranch: string;
  // selfEmployment: SelfEmploymentDto;
  // totalIncome: number;
  // updated: string;

  constructor(obj: Applicant) {
    this.absCustomerId = obj.absCustomerId;
    this.affiliated = obj.affiliated;
    this.age = obj.age;
    this.applicantRolesId = obj.applicantRoles ? obj.applicantRoles.id : null;
    this.applicationId = obj.applicationId;
    this.firstNameEn = obj.firstNameEn;
    this.lastNameEn = obj.lastNameEn;
    this.middleNameEn = obj.middleNameEn;
    this.approvedIncome = obj.approvedIncome;
    this.beneficiaryOwnerDto = obj.beneficiaryOwner;
    this.birthAddressObj = obj.birthAddressObj;
    this.birthDate = obj.birthDate;
    this.birthPlace = obj.birthPlace;
    this.brms1Response = obj.brms1Response;
    this.brms2Response = obj.brms2Response;
    this.childrenUnder18 = obj.childrenUnder18;
    this.citizenshipId = obj.citizenship ? obj.citizenship.id : null;
    this.comment = obj.comment;
    this.craMethod = obj.craMethod;
    this.dboAgreement = obj.dboAgreement;
    this.esignAgreement = obj.esignAgreement;
    this.decisionMakingIncome = obj.decisionMakingIncome;
    this.dirAccommodationTypeId = obj.dirAccommodationType ? obj.dirAccommodationType.id : null;
    this.documentIsValid = obj.documentIsValid;
    this.doubleCitizenshipId = obj.doubleCitizenship ? obj.doubleCitizenship.id : null;
    this.educationId = obj.dirEducation ? obj.dirEducation.id : null;
    this.email = obj.email;
    this.employmentId = obj.employment ? obj.employment.id : null;
    this.factAddress = obj.factAddress;
    this.factAddressObj = obj.factAddressObj;
    this.firstName = obj.firstName;
    this.fullFormIncome = obj.fullFormIncome;
    this.genderId = obj.gender ? +obj.gender.id : null;
    this.generatedCode = obj.generatedCode;
    this.hasActiveAccounts = obj.hasActiveAccounts;
    this.homePhone = obj.homePhone;
    this.id = obj.id;
    this.identityCardId = obj.identityCard ? obj.identityCard.id : null;
    this.infoCheckDate = obj.infoCheckDate;
    this.infoIsValid = obj.infoIsValid;
    this.integrationInterfaceId = obj.integrationInterfaceId;
    this.isActiveInOdb = obj.isActiveInOdb;
    this.isAddIncome = obj.isAddIncome;
    this.isAmlNeeded = obj.isAmlNeeded;
    this.isApplicantStopList = obj.isApplicantStopList;
    this.isClientMilitary = obj.isClientMilitary;
    this.isClientVip = obj.isClientVip;
    this.isCreditHistory = obj.isCreditHistory;
    this.isEmployee = obj.isEmployee;
    this.isInsider = obj.isInsider;
    this.isIpdl = obj.isIpdl;
    this.isIpdlRelative = obj.isIpdlRelative;
    this.isIpldOperation = obj.isIpldOperation;
    this.isOverdue6 = obj.isOverdue6;
    this.isRealEqFactAddress = obj.isRealEqFactAddress;
    this.isResident = obj.isResident;
    this.isUsaResident = obj.isUsaResident;
    this.isMobilePhoneConfirmed = obj.isMobilePhoneConfirmed;
    this.language = obj.language;
    this.lastName = obj.lastName;
    this.maritalStatusId = obj.maritalStatus ? +obj.maritalStatus.id : null;
    this.middleName = obj.middleName;
    this.militaryDutyId = obj.militaryDuty ? +obj.militaryDuty.id : null;
    this.mobileContactCommunicationTypeId = obj.mobileContactCommunicationType
      ? obj.mobileContactCommunicationType.id
      : null;
    this.mobilePhone = obj.mobilePhone;
    this.mobilePhoneCommunicationTypeId = obj.mobilePhoneCommunicationType ? obj.mobilePhoneCommunicationType.id : null;
    this.numberOfEnrolment = obj.numberOfEnrolment;
    this.onlineExtClientId = obj.onlineExtClientId;
    this.postAddress = obj.postAddress;
    this.postAddressObj = obj.postAddressObj;
    this.preApprovedOfferId = obj.preApprovedOfferId;
    this.preapprovedFactorId = obj.preapprovedFactor ? +obj.preapprovedFactor.id : null;
    this.receivedCode = obj.receivedCode;
    this.regAddress = obj.regAddress;
    this.regAddressObj = obj.regAddressObj;
    this.selfEmploymentId = obj.selfEmployment ? +obj.selfEmployment.id : null;
    this.shortFormIncome = obj.shortFormIncome;
    this.spouseFirstName = obj.spouseFirstName;
    this.spouseLastName = obj.spouseLastName;
    this.spousePin = obj.spousePin;
    this.totalJobExp = obj.totalJobExp;
    this.socCardId = obj.socCard ? obj.socCard.id : null;
    this.dirFatcaAttribute = obj.dirFatcaAttribute;
    this.codeAbs = obj.codeAbs;
    this.ignoreIncome = obj.ignoreIncome;
    this.clientInBlackList = obj.clientInBlackList;
    this.totalNetIncomeNorq = obj.totalNetIncomeNorq;
    this.totalNetIncome6M = obj.totalNetIncome6M;
    this.dirFatcaStatusId = obj.dirFatcaStatus ? obj.dirFatcaStatus.id : null;
    // this.created = obj.created;
    // this.updated = obj.updated;
    // this.facebookId = obj.facebookId;
    // this.facebookLanguage = obj.facebookLanguage;
    // this.totalIncome = obj.totalIncome;
  }
}

export class ApplicantLiteDto {
  absCustomerId: number;
  applicationId: number;
  approvedIncome: number;
  birthDate: string;
  brms2ResponseId: number;
  citizenshipId: number;
  clientInBlackList: boolean;
  comment: string;
  decisionMakingIncome: number;
  email: string;
  employmentId: number;
  factAddress: string;
  firstName: string;
  fullFormIncome: number;
  genderId: number;
  generatedCode: string;
  homePhone: string;
  id: number;
  identityCardId: number;
  integrationInterfaceId: number;
  isAddIncome: boolean;
  isClientMilitary: boolean;
  isClientVip: boolean;
  isIpdl: boolean;
  isOverdue6: boolean;
  isUsaResident: boolean;
  language: string;
  lastName: string;
  middleName: string;
  mobilePhone: string;
  socCardPin: string; // ?????
  numberOfEnrolment: number;
  onlineExtClientId: string;
  pin: string;
  receivedCode: string;
  regAddress: string;
  selfEmploymentInn: string;
  shortFormIncome: number;
  socCardId: number;
  totalNetIncome6M: number;
}

export interface ApplicantPersDataDto {
  birthDate: string; //   Дата рождения

  firstName: string; //  Имя

  id: number; //   applicantId заявителя

  identityCardPin: string; //  Номер документа, удостоверяющего личность

  identityCardTypeId: number; //   Тип документа, удостоверяющего личность

  lastName: string; //  Фамилия

  middleName: string; //  Отчество

  socCardPin: string; //  Номер социальной карты

  socCardTypeId: number; //   Тип соц. карты
}
