import {
  AbsCommissionControllerService,
  DirAccommodationTypeControllerService,
  DirBranchControllerService,
  DirCallCentreDeclineReasonControllerService,
  DirCommunicationTypeControllerService,
  DirCompanyListControllerService,
  DirCountryControllerService,
  DirCurrencyControllerService,
  DirDepartmentControllerService,
  DirEmploymentLegalStructureControllerService,
  DirEnsureTypeService,
  DirIncomeFrequencyControllerService,
  DirIncomeTypeControllerService,
  DirInnAbsenceReasonControllerService,
  DirIpdlControllerService,
  DirIssueTypeControllerService,
  DirJobPositionControllerService,
  DirManagerDeclineReasonsControllerService,
  DirMobileProviderControllerService,
  DirNumberEmployeeControllerService,
  DirOperationTypeControllerService,
  DirPreapprovedFactorControllerService,
  DirSalesChannelControllerService,
  DirScheduleFrequencyControllerService,
  DirDecisionMakerDeclineReasonControllerService,
  SegmentControllerService
} from '@app/api';
import { Dir, DirCompanyList, DirCountry, DirPreApproved, Directory } from '..';
import { DirAbsCode, DirBranch, DirCityDto, DirSigner, DirectoryVal } from '../api-models/directory';
import {
  DirBusinessInspectionResultControllerService,
  DirInnStatusControllerService,
  DirInnTypeControllerService
} from '@app/api/massegment-api';

import { DirActivitiesControllerService } from '@app/api/dir-activities-controller.service';
import { DirCallStatusControllerService } from '@app/api/dir-call-status-controller.service';
import { DirCityControllerService } from '@app/api/dir-city-controller.service';
import { DirCreditPurposeControllerService } from '@app/api/dir-credit-purpose-controller.service';
import { DirEducationControllerService } from '@app/api/dir-education-controller.service';
import { DirFamilyRelationshipControllerService } from '@app/api/dir-family-relationship-controller.service';
import { DirFatcaControllerService } from '@app/api/dir-fatca-controller.service';
import { DirGoodsService } from '@app/api/massegment-api/dir-goods.service';
import { DirInsuranceTypeControllerService } from '@app/api/dir-insurance-type-controller.service';
import { DirOperationFreqTypeControllerService } from '@app/api/dir-operation-freq-type-controller.service';
import { DirPartnerService } from '@app/api/massegment-api/dir-partner.service';
import { DirPaymentCardControllerService } from '@app/api/dir-payment-card-controller.service';
import { DirPreApprovedCreditControllerService } from '@app/api/dir-pre-approved-credit-controlle.service';
import { DirRegionControllerService } from '@app/api/dir-region-controller.service';
import { DirRiskBasedPriceControllerService } from '@app/api/dir-risk-based-price-controller.service';
import { DirSignerControllerService } from '@app/api/dir-signer-contoller.service';
import { Segment } from '@app/_models';
import { TariffControllerService } from '@app/api/tariff-controller.service';

export type TypeDto =
  | Directory
  | DirCountry
  | DirPreApproved
  | Dir
  | DirCompanyList
  | DirSigner
  | DirCityDto
  | DirAbsCode
  | DirBranch
  | DirectoryVal
  | Segment;

export type TypeServices =
  | DirManagerDeclineReasonsControllerService
  | DirBranchControllerService
  | DirCountryControllerService
  | DirCurrencyControllerService
  | DirSalesChannelControllerService
  | DirMobileProviderControllerService
  | DirCompanyListControllerService
  | DirPreApprovedCreditControllerService
  | DirCreditPurposeControllerService
  | DirEducationControllerService
  | DirActivitiesControllerService
  | DirFamilyRelationshipControllerService
  | DirNumberEmployeeControllerService
  | DirAccommodationTypeControllerService
  | DirCallCentreDeclineReasonControllerService
  | DirEmploymentLegalStructureControllerService
  | DirDepartmentControllerService
  | DirIpdlControllerService
  | DirInnAbsenceReasonControllerService
  | DirCommunicationTypeControllerService
  | DirIncomeTypeControllerService
  | DirOperationTypeControllerService
  | DirFatcaControllerService
  | DirOperationFreqTypeControllerService
  | DirSignerControllerService
  | DirCityControllerService
  | DirRegionControllerService
  | DirPaymentCardControllerService
  | DirDecisionMakerDeclineReasonControllerService
  | DirCallStatusControllerService
  | DirInsuranceTypeControllerService
  | SegmentControllerService
  | DirBusinessInspectionResultControllerService
  | DirPreapprovedFactorControllerService
  | AbsCommissionControllerService
  | DirInnStatusControllerService
  | DirGoodsService
  | DirPartnerService
  | DirInnTypeControllerService
  | DirEnsureTypeService
  | DirIssueTypeControllerService
  | DirIncomeFrequencyControllerService
  | DirScheduleFrequencyControllerService
  | DirJobPositionControllerService
  | TariffControllerService
  | DirRiskBasedPriceControllerService;
