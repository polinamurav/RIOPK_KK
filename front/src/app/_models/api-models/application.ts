import {
  BRMS1ResponseDto,
  BRMS2ResponseDto,
  BRMS3ResponseDto,
  BRMS4ResponseDto,
  BRMS5ResponseDto,
  BRMSResponse,
  BrmsResponse
} from './brms';
import {
  CreditInfo,
  CreditInfoByPinDto,
  Decision,
  Dir,
  DirStage,
  DirStatus,
  Directory,
  InsuranceInfo,
  PartnerDto,
  ScoringResponse,
  User,
  PreapprovedUpload,
  DirBranch
} from '@app/_models';

import { Applicant } from './applicant';
import { ProductGroup } from '@app/constants/product-group';
import { getId } from '@app/services/util/getId';
import { applicationTypesEnum } from '@app/pages/dashboard/dashboard-page/tabs/credit-app/constants/short-form-config';

export class Application {
  accepter: User;
  accepterDecision: Decision; // Решение на этапе акцепт
  accepterDecisionDate: string; // Дата решения на этапе акцепт
  applicant: Applicant; // Заявитель
  applicationId: string;
  archivePlace: string;
  archivistComment: string;
  brms12Decision: Dir;
  brms23Decision: Dir;
  brms4DMResponse: BrmsResponse;
  brms4FFResponse: BrmsResponse;
  brms1Response: BrmsResponse;
  brms2Response: BrmsResponse;
  brms3Response: BrmsResponse;
  brms4Response: BrmsResponse;
  brms5Response: BrmsResponse;

  callCenter: User; // Сотрдник колл-центра
  channel: string;
  codeAbs: string;
  branchNameRu: string;
  branchNameAm: string;
  firstPaymentDate: string;
  chosenCreditInfo: CreditInfo; // Выбранные условия кредитования
  clientManager: User;
  countReturnDecisionMaking: number; // Количество возвратов на этап принятия решения
  countReturnFinalDecision: number; // Количество возвратов на этап окончательного решения
  countReturnFullForm: number; // Количество возвратов на этап полной анкеты
  countReturnVerification: number; // Количество возвратов на этап Верификации
  created: string;
  createdBy: User; // Кем создана заявка
  creditManager: User; // Кредитный менеджер
  decision: Decision;
  decisionMaker: User; // Сотрудник, принимающий решение
  decisionMakerDecisionDate: string;
  dirBranch: DirBranch; // Отделение, в котором создана заявка
  dirCallCentreDeclineReason: Dir; // Причина отказа колл-центра
  dirDecisionMakerDecision: Decision; // Решение риск-менеджера
  dirDecisionMakerDeclineReason: Dir;
  dirManagerDeclineReason: number | string; // Причина отказа менеджера
  dirPartner: PartnerDto;
  dirSalesChannel: Directory; // Канал продаж
  dirVerifierDecision: Decision; // Решение верификатора
  dirVerifierDeclineReason: Decision; // Решение верификатора
  dirDecisionMakerTypeDecision: Decision;
  disapproveCode: string;
  dsa: User; // DSA
  dsaUtm: User;
  finalCreditInfo: CreditInfo; // Окончательные условия кредитования
  id: number;
  insuranceInfo: InsuranceInfo; // Данные о страховке
  isAddProduct: boolean;
  isArchiveComplete: boolean;
  isChosenCreditConfirmed: boolean;
  isPreApproved: boolean; // Является ли заявка предодобренной
  mainApplication: string;
  mainApplicationId: number; // ID основной заявки
  needVerificationCreditInfo: CreditInfo;
  newMessageCradmMngrChat?: boolean;
  newMessageULChat?: boolean;
  newMessageUMChat?: boolean;
  paperworkDecision: Decision; // Решение на этапе оформления документов
  paperworkDecisionDate: string;
  preapprovedUpload: PreapprovedUpload;
  prevStage: DirStage; // Предыдущий этап заявки
  processId: number;
  productGroupId: ProductGroup;
  requestedCreditInfoId: number;
  property: string;
  requestedCreditInfo: CreditInfo; // Запрошенные условия кредитовани
  scoringResponse: ScoringResponse;
  shortApplicationId: number;
  stage: DirStage; // Текущий этап заявки
  status: DirStage; // Статус заявки
  taskStarted: boolean; // Текущий USER_TASK запущен
  traceIdApplication: string;
  updated: string;
  userDsa: string;
  verifiedCreditInfo: CreditInfo; // Подтвержденные условия кредитования
  verifier: User; // Верификатор
  verifierDecisionDate: string;
  videoBank: User;
  website: string;
  isAgentInsuranceChosen: boolean;
  isBw: boolean;
  isDsa: boolean;
  isSmsSign: boolean;
  isInsuranceAccident: boolean;
  specialOfferDiscount: boolean;
  esignAgreement: boolean;

  isInsuranceAccidentValue?: any;
  isPos: boolean;
  isOnline: boolean;
  isOtp: boolean;
  applicationType: applicationTypesEnum;
}

export class ApplicationDto {
  accepter: User;
  accepterDecisionDate: string; // Дата решения на этапе акцепт
  applicationId: string;
  brms12Decision: Dir;
  brms23Decision: Dir;
  brms4DMResponse: BrmsResponse;
  brms4FFResponse: BrmsResponse;

  brms1Response: BrmsResponse;
  brms2Response: BrmsResponse;
  brms3Response: BrmsResponse;
  brms4Response: BrmsResponse;
  brms5Response: BrmsResponse;
  callCenter: User; // Сотрдник колл-центра
  applicantId: number;
  chosenCreditInfoId: number;
  countReturnFinalDecision: number;
  countReturnFullForm: number;
  countReturnVerification: number;
  videoBank: User;
  creditManagerId: number;
  dirBranchId: number;
  dirCallCentreDeclineReasonId: number;
  dirManagerDeclineReasonId: number | string;
  dirPartner: PartnerDto;
  dirSalesChannelId: number;
  disapproveCode: string;
  isAgentInsuranceChosen: boolean;
  isInsuranceAccident: boolean;
  specialOfferDiscount: boolean;
  isBw: boolean;
  isDsa: boolean;
  dsa: User;
  dsaUtm: User;
  finalCreditInfoId: number;
  dirVerifierDecision: Decision; // Решение верификатора
  dirVerifierDeclineReason: Decision; // Решение верификатора
  dirDecisionMakerTypeDecision: Decision;
  id: number;
  insuranceInfoId: number;
  isAddProduct: boolean;
  isChosenCreditConfirmed: boolean;
  isPreApproved: boolean;
  decisionMaker: User;
  mainApplicationId: number;
  mainApplication: string;
  needVerificationCreditInfoId: number;
  newMessageULChat: boolean;
  newMessageUMChat: boolean;
  prevStageId: string;
  processId: number;
  requestedCreditInfoId: number;
  scoringResponse: ScoringResponse;
  stageId: string;
  statusId: string;
  taskStarted: boolean;
  verifier: User;
  accepterDecisionId: string;
  paperworkDecisionId: string;
  paperworkDecisionDate: string;
  firstPaymentDate: string;
  verifiedCreditInfoId: number;
  esignAgreement: boolean;
  isPos: boolean;
  isOtp: boolean;

  constructor(obj: Application) {
    this.accepter = obj.accepter;
    this.accepterDecisionDate = obj.accepterDecisionDate;
    this.applicationId = obj.applicationId;
    this.brms12Decision = obj.brms12Decision;
    this.brms23Decision = obj.brms23Decision;
    this.brms4DMResponse = obj.brms4DMResponse;
    this.brms4FFResponse = obj.brms4FFResponse;

    this.brms1Response = obj.brms1Response;
    this.brms2Response = obj.brms2Response;
    this.brms3Response = obj.brms3Response;
    this.brms4Response = obj.brms4Response;
    this.brms5Response = obj.brms5Response;

    this.brms5Response = obj.brms5Response;
    this.callCenter = obj.callCenter;
    this.chosenCreditInfoId = getId(obj.chosenCreditInfo);
    this.applicantId = getId(obj.applicant);
    this.videoBank = obj.videoBank;
    this.countReturnFinalDecision = obj.countReturnFinalDecision;
    this.countReturnFullForm = obj.countReturnFullForm;
    this.countReturnVerification = obj.countReturnVerification;
    this.creditManagerId = getId(obj.creditManager);
    this.dirBranchId = getId(obj.dirBranch);
    this.dirCallCentreDeclineReasonId = getId(obj.dirCallCentreDeclineReason);
    this.dirManagerDeclineReasonId = obj.dirManagerDeclineReason;
    this.dirPartner = obj.dirPartner;
    this.dirSalesChannelId = getId(obj.dirSalesChannel);
    this.disapproveCode = obj.disapproveCode;
    this.dsa = obj.dsa;
    this.dsaUtm = obj.dsaUtm;
    this.isAgentInsuranceChosen = obj.isAgentInsuranceChosen;
    this.isBw = obj.isBw;
    this.isDsa = obj.isDsa;
    this.isDsa = obj.isDsa;
    this.firstPaymentDate = obj.firstPaymentDate;
    this.isInsuranceAccident = obj.isInsuranceAccident;
    this.specialOfferDiscount = obj.specialOfferDiscount;
    this.finalCreditInfoId = getId(obj.finalCreditInfo);
    this.id = obj.id;
    this.insuranceInfoId = getId(obj.insuranceInfo);
    this.isAddProduct = obj.isAddProduct;
    this.isChosenCreditConfirmed = obj.isChosenCreditConfirmed;
    this.isPreApproved = obj.isPreApproved;
    this.decisionMaker = obj.decisionMaker;
    this.mainApplicationId = obj.mainApplicationId;
    this.mainApplication = obj.mainApplication;
    this.needVerificationCreditInfoId = getId(obj.needVerificationCreditInfo);
    this.newMessageULChat = obj.newMessageULChat;
    this.newMessageUMChat = obj.newMessageUMChat;
    this.prevStageId = getId<string>(obj.prevStage) !== null ? getId<string>(obj.accepterDecision) : null;
    this.processId = obj.processId;
    this.requestedCreditInfoId = getId(obj.requestedCreditInfo);
    this.scoringResponse = obj.scoringResponse;
    this.stageId = getId(obj.stage).toString();
    this.statusId = getId(obj.status).toString();
    this.taskStarted = obj.taskStarted;
    this.verifier = obj.verifier;
    this.accepterDecisionId = getId(obj.accepterDecision) !== null ? getId(obj.accepterDecision).toString() : null;
    this.paperworkDecisionId = getId(obj.paperworkDecision) !== null ? getId(obj.paperworkDecision).toString() : null;
    this.paperworkDecisionDate = obj.paperworkDecisionDate;
    this.verifiedCreditInfoId = getId(obj.verifiedCreditInfo);
    this.dirVerifierDecision = obj.dirVerifierDecision;
    this.dirVerifierDeclineReason = obj.dirVerifierDeclineReason;
    this.dirDecisionMakerTypeDecision = obj.dirDecisionMakerTypeDecision;
    this.esignAgreement = obj.esignAgreement;
    this.isPos = obj.isPos;
    this.isOtp = obj.isOtp;
  }
}

export class ApplicationByPinDto {
  applicationId: number;
  created: string;
  creditInfo: CreditInfoByPinDto;
  id: number;
  stage: DirStage;
  status: DirStatus;
  newMessageULChat?: boolean;
  newMessageUMChat?: boolean;
}

export class RmLimitPosDto {
  applicationId: number;
  maxLimit: number;
}
