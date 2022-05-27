import { BRMS1ResponseDto, BRMS2ResponseDto, BRMS3ResponseDto, BRMS4ResponseDto, BRMS5ResponseDto } from './brms';
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
  User
} from '@app/_models';

import { Applicant } from './applicant';
import { ProductGroup } from '@app/constants/product-group';
import { getId } from '@app/services/util/getId';

export class Application {
  applicant: Applicant;
  applicationId: string;
  brms12Decision: Dir;
  brms1Response: BRMS1ResponseDto;
  brms23Decision: Dir;
  brms2Response: BRMS2ResponseDto;
  brms3Response: BRMS3ResponseDto;
  brms4FFResponse: BRMS4ResponseDto;
  brms4DMResponse: BRMS4ResponseDto;
  brms5Response: BRMS5ResponseDto;
  callCenter: User;
  clientManager: User;
  videoBank: User;
  chosenCreditInfo: CreditInfo;
  countReturnFinalDecision: number;
  countReturnFullForm: number;
  countReturnVerification: number;
  created: string;
  createdBy: User;
  accepter: User;
  creditManager: User;
  accepterDecision: Decision;
  accepterDecisionDate: string;
  paperworkDecision: Decision;
  paperworkDecisionDate: string;
  creditManagerId: number;
  decision: Decision;
  dirBranch: Directory;
  dirCallCentreDeclineReason: Dir;
  dirDecisionMakerDecision: Decision;
  dirDecisionMakerDeclineReason: Dir;
  dirManagerDeclineReason: Dir;
  dirPartner: PartnerDto;
  dirSalesChannel: Directory;
  dirVerifierDecision: Decision;
  disapproveCode: string;
  dsa: User;
  dsaUtm: User;
  finalCreditInfo: CreditInfo;
  id: number;
  insuranceInfo: InsuranceInfo;
  isAddProduct: boolean;
  isChosenCreditConfirmed: boolean;
  isPreApproved: boolean;
  decisionMaker: User;
  decisionMakerDecisionDate: string;
  mainApplicationId: number;
  mainApplication: string;
  needVerificationCreditInfo: CreditInfo;
  newMessageULChat?: boolean;
  newMessageUMChat?: boolean;
  newMessageCradmMngrChat?: boolean;
  prevStage: DirStage;
  processId: number;
  productGroupId: ProductGroup;
  requestedCreditInfo: CreditInfo;
  scoringResponse: ScoringResponse;
  stage: DirStage;
  status: DirStage;
  taskStarted: boolean;
  verifier: User;
  verifierDecisionDate: string;
  updated: string;
  verifiedCreditInfo: CreditInfo;
  website: string;
}

export class ApplicationDto {
  applicantId: number;
  applicationId: string;
  brms12Decision: Dir;
  brms1Response: BRMS1ResponseDto;
  brms23Decision: Dir;
  brms2Response: BRMS2ResponseDto;
  brms3Response: BRMS3ResponseDto;
  brms4FFResponse: BRMS4ResponseDto;
  brms4DMResponse: BRMS4ResponseDto;
  brms5Response: BRMS5ResponseDto;
  callCenter: User;
  chosenCreditInfoId: number;
  countReturnFinalDecision: number;
  countReturnFullForm: number;
  countReturnVerification: number;
  accepter: User;
  videoBank: User;
  creditManagerId: number;
  dirBranchId: number;
  dirCallCentreDeclineReasonId: number;
  dirManagerDeclineReasonId: number;
  dirPartner: PartnerDto;
  dirSalesChannelId: number;
  disapproveCode: string;
  dsa: User;
  dsaUtm: User;
  finalCreditInfoId: number;
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
  accepterDecisionDate: string;
  paperworkDecisionId: string;
  paperworkDecisionDate: string;
  verifiedCreditInfoId: number;

  constructor(obj: Application) {
    this.applicantId = getId(obj.applicant);
    this.applicationId = obj.applicationId;
    this.brms12Decision = obj.brms12Decision;
    this.brms1Response = obj.brms1Response;
    this.brms23Decision = obj.brms23Decision;
    this.brms2Response = obj.brms2Response;
    this.brms3Response = obj.brms3Response;
    this.brms4FFResponse = obj.brms4FFResponse;
    this.brms4DMResponse = obj.brms4DMResponse;
    this.brms5Response = obj.brms5Response;
    this.callCenter = obj.callCenter;
    this.videoBank = obj.videoBank;
    this.chosenCreditInfoId = getId(obj.chosenCreditInfo);
    this.countReturnFinalDecision = obj.countReturnFinalDecision;
    this.countReturnFullForm = obj.countReturnFullForm;
    this.countReturnVerification = obj.countReturnVerification;
    this.accepter = obj.accepter;
    this.creditManagerId = obj.creditManagerId;
    this.dirBranchId = getId(obj.dirBranch);
    this.dirCallCentreDeclineReasonId = getId(obj.dirCallCentreDeclineReason);
    this.dirManagerDeclineReasonId = getId(obj.dirManagerDeclineReason);
    this.dirPartner = obj.dirPartner;
    this.dirSalesChannelId = getId(obj.dirSalesChannel);
    this.disapproveCode = obj.disapproveCode;
    this.dsa = obj.dsa;
    this.dsaUtm = obj.dsaUtm;
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
    this.accepter = obj.accepter;
    this.verifier = obj.verifier;
    this.accepterDecisionId = getId(obj.accepterDecision) !== null ? getId(obj.accepterDecision).toString() : null;
    this.accepterDecisionDate = obj.accepterDecisionDate;
    this.paperworkDecisionId = getId(obj.paperworkDecision) !== null ? getId(obj.paperworkDecision).toString() : null;
    this.paperworkDecisionDate = obj.paperworkDecisionDate;
    this.verifiedCreditInfoId = getId(obj.verifiedCreditInfo);
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
