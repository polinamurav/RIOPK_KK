import * as DirectoriesActions from '@app/store/actions/directories.actions';

import {
  AbsCommissionControllerService,
  DirAccommodationTypeControllerService,
  DirBranchControllerService,
  DirCallCentreDeclineReasonControllerService,
  DirCommunicationTypeControllerService,
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
  DirScheduleFrequencyControllerService,
  DirDecisionMakerDeclineReasonControllerService,
  SegmentControllerService
} from '@app/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DirBusinessInspectionResultControllerService,
  DirInnStatusControllerService,
  DirInnTypeControllerService
} from '@app/api/massegment-api';
import { map, switchMap } from 'rxjs/operators';

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
import { DirPaymentCardControllerService } from '@app/api/dir-payment-card-controller.service';
import { DirPreApprovedCreditControllerService } from '@app/api/dir-pre-approved-credit-controlle.service';
import { DirRegionControllerService } from '@app/api/dir-region-controller.service';
import { DirRiskBasedPriceControllerService } from '@app/api/dir-risk-based-price-controller.service';
import { DirSignerControllerService } from '@app/api/dir-signer-contoller.service';
import { Injectable } from '@angular/core';
import { PaginationAndSortingDto } from '@app/_models';
import { TariffControllerService } from '@app/api/tariff-controller.service';
import { of } from 'rxjs';

@Injectable()
export class DirectoriesEffects {
  getDeclines$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDeclinesAction),
      switchMap(({ data }) => {
        return this.declineService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDeclinesSuccessAction({ data }));
      })
    );
  });

  setDeclines$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDeclinesAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.declineService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDeclinesAction({ data }));
      })
    );
  });

  getBankBranch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetBankBranchAction),
      switchMap(({ data }) => {
        return this.branchService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetBankBranchSuccessAction({ data }));
      })
    );
  });

  setBankBranch$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadBankBranchAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.branchService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetBankBranchAction({ data }));
      })
    );
  });

  getCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCountriesAction),
      switchMap(({ data }) => {
        return this.countryService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCountriesSuccessAction({ data }));
      })
    );
  });

  setCountries$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCountriesAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.countryService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCountriesAction({ data }));
      })
    );
  });

  getCurrency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCurrencyAction),
      switchMap(({ data }) => {
        return this.currencyService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCurrencySuccessAction({ data }));
      })
    );
  });

  setCurrency$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCurrencyAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.currencyService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCurrencyAction({ data }));
      })
    );
  });

  // getSalesChanel$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(DirectoriesActions.DirSetSalesChanelAction),
  //     switchMap(({ data }) => {
  //       return this.salesChannelService.getByPage(data);
  //     }),
  //     switchMap(data => {
  //       return of(DirectoriesActions.DirSetSalesChanelSuccessAction({ data }));
  //     })
  //   );
  // });

  // setSalesChanel$ = createEffect(() => {
  //   let sortAndPage: PaginationAndSortingDto;
  //   return this.actions$.pipe(
  //     ofType(DirectoriesActions.DirUploadSalesChanelAction),
  //     switchMap(data => {
  //       sortAndPage = data.sortAndPage;
  //       return this.salesChannelService.upload(data.uploadFile).pipe(map(() => sortAndPage));
  //     }),
  //     switchMap(data => {
  //       return of(DirectoriesActions.DirSetSalesChanelAction({ data }));
  //     })
  //   );
  // });

  getOperatorCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetOperatorCodeAction),
      switchMap(({ data }) => {
        return this.mobileProviderService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperatorCodeSuccessAction({ data }));
      })
    );
  });

  setOperatorCode$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadOperatorCodeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.mobileProviderService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperatorCodeAction({ data }));
      })
    );
  });

  getPreApproved$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetPreApprovedAction),
      switchMap(({ data }) => {
        return this.preApprovedService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPreApprovedSuccessAction({ data }));
      })
    );
  });

  setPreApproved$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadPreApprovedAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.preApprovedService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPreApprovedAction({ data }));
      })
    );
  });

  getCreditPurpose$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCreditPurposeAction),
      switchMap(({ data }) => {
        return this.creditPurposeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCreditPurposeSuccessAction({ data }));
      })
    );
  });

  setCreditPurpose$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCreditPurposeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.creditPurposeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCreditPurposeAction({ data }));
      })
    );
  });

  getEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetEducationAction),
      switchMap(({ data }) => {
        return this.educationService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetEducationSuccessAction({ data }));
      })
    );
  });

  setEducation$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadEducationAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.educationService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetEducationAction({ data }));
      })
    );
  });

  getActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetActivitiesAction),
      switchMap(({ data }) => {
        return this.activitiesService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetActivitiesSuccessAction({ data }));
      })
    );
  });

  setActivities$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadActivitiesAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.activitiesService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetActivitiesAction({ data }));
      })
    );
  });

  getFamilyRelationship$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetFamilyRelationshipAction),
      switchMap(({ data }) => {
        return this.familyRelationshipService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetFamilyRelationshipSuccessAction({ data }));
      })
    );
  });

  setFamilyRelationship$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadFamilyRelationshipAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.familyRelationshipService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetFamilyRelationshipAction({ data }));
      })
    );
  });

  getNumberEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetNumberEmployeeAction),
      switchMap(({ data }) => {
        return this.numberEmployeeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetNumberEmployeeSuccessAction({ data }));
      })
    );
  });

  setNumberEmployee$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadNumberEmployeeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.numberEmployeeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetNumberEmployeeAction({ data }));
      })
    );
  });

  getAccommodationType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetAccommodationTypeAction),
      switchMap(({ data }) => {
        return this.accommodationTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetAccommodationTypeSuccessAction({ data }));
      })
    );
  });

  setAccommodationType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadAccommodationTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.accommodationTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetAccommodationTypeAction({ data }));
      })
    );
  });

  getCallCenterDecline$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCallCenterDeclineAction),
      switchMap(({ data }) => {
        return this.callCentreDeclineService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCallCenterDeclineSuccessAction({ data }));
      })
    );
  });

  setCallCenterDecline$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCallCenterDeclineAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.callCentreDeclineService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCallCenterDeclineAction({ data }));
      })
    );
  });

  getLegalStructureType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetEmploymentLegalTypeAction),
      switchMap(({ data }) => {
        return this.employmentLegalStructureService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetEmploymentLegalTypeSuccessAction({ data }));
      })
    );
  });

  setLegalStructureType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadEmploymentLegalTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.employmentLegalStructureService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetEmploymentLegalTypeAction({ data }));
      })
    );
  });

  getDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDepartmentAction),
      switchMap(({ data }) => {
        return this.departmentService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDepartmentSuccessAction({ data }));
      })
    );
  });

  setDepartment$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDepartmentAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.departmentService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDepartmentAction({ data }));
      })
    );
  });

  getIpdl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetIpdlAction),
      switchMap(({ data }) => {
        return this.ipdlService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetIpdlSuccessAction({ data }));
      })
    );
  });

  setIpdl$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadIpdlAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.ipdlService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetIpdlAction({ data }));
      })
    );
  });

  getInnAbsenceReason$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetInnAbsenceReasonAction),
      switchMap(({ data }) => {
        return this.innAbsenceReasonService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnAbsenceReasonSuccessAction({ data }));
      })
    );
  });

  setInnAbsenceReason$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadInnAbsenceReasonAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.innAbsenceReasonService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnAbsenceReasonAction({ data }));
      })
    );
  });

  getCommunicationType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCommunicationTypeAction),
      switchMap(({ data }) => {
        return this.communicationTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCommunicationTypeSuccessAction({ data }));
      })
    );
  });

  setCommunicationType$$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCommunicationTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.communicationTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCommunicationTypeAction({ data }));
      })
    );
  });

  getIncomeType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetIncomeTypeAction),
      switchMap(({ data }) => {
        return this.incomeTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetIncomeTypeSuccessAction({ data }));
      })
    );
  });

  setIncomeType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadIncomeTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.incomeTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetIncomeTypeAction({ data }));
      })
    );
  });

  getOperationType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetOperationTypeAction),
      switchMap(({ data }) => {
        return this.operationTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperationTypeSuccessAction({ data }));
      })
    );
  });

  setOperationType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadOperationTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.operationTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperationTypeAction({ data }));
      })
    );
  });

  getFatca$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetFatcaAction),
      switchMap(({ data }) => {
        return this.fatcaService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetFatcaSuccessAction({ data }));
      })
    );
  });

  setFatca$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadFatcaAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.fatcaService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetFatcaAction({ data }));
      })
    );
  });

  getOperationFreqType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetOperationFreqTypeAction),
      switchMap(({ data }) => {
        return this.operationFreqTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperationFreqTypeSuccessAction({ data }));
      })
    );
  });

  setOperationFreqType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadOperationFreqTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.operationFreqTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetOperationFreqTypeAction({ data }));
      })
    );
  });

  getSigner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetSignerAction),
      switchMap(({ data }) => {
        return this.signerControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetSignerSuccessAction({ data }));
      })
    );
  });

  setSigner$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadSignerAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.signerControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetSignerAction({ data }));
      })
    );
  });

  getCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCityAction),
      switchMap(({ data }) => {
        return this.cityControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCitySuccessAction({ data }));
      })
    );
  });

  setCity$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCityAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.cityControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCityAction({ data }));
      })
    );
  });

  getRegion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetRegionAction),
      switchMap(({ data }) => {
        return this.regionControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetRegionSuccessAction({ data }));
      })
    );
  });

  setRegion$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadRegionAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.regionControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetRegionAction({ data }));
      })
    );
  });

  getCallStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetCallStatusAction),
      switchMap(({ data }) => {
        return this.callStatusControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCallStatusSuccessAction({ data }));
      })
    );
  });

  setCallStatus$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadCallStatusAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.callStatusControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetCallStatusAction({ data }));
      })
    );
  });

  getPaymentCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetPaymentCardAction),
      switchMap(({ data }) => {
        return this.paymentCardControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPaymentCardSuccessAction({ data }));
      })
    );
  });

  setPaymentCard$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadPaymentCardAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.paymentCardControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPaymentCardAction({ data }));
      })
    );
  });

  getDecisionMakerDeclineReason$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDecisionMakerDeclineReasonAction),
      switchMap(({ data }) => {
        return this.decisionMakerDeclineReasonControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDecisionMakerDeclineReasonSuccessAction({ data }));
      })
    );
  });

  setDecisionMakerDeclineReason$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDecisionMakerDeclineReasonAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.decisionMakerDeclineReasonControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDecisionMakerDeclineReasonAction({ data }));
      })
    );
  });

  getInsuranceType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetInsuranceTypeAction),
      switchMap(({ data }) => {
        return this.insuranceTypeControllerService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInsuranceTypeSuccessAction({ data }));
      })
    );
  });

  setInsuranceType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadInsuranceTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.insuranceTypeControllerService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInsuranceTypeAction({ data }));
      })
    );
  });

  getSegments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetSegmentsAction),
      switchMap(({ data }) => {
        return this.segmentService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetSegmentsSuccessAction({ data }));
      })
    );
  });

  setSegments$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadSegmentsAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.segmentService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetSegmentsAction({ data }));
      })
    );
  });

  getTariff$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetTariffAction),
      switchMap(({ data }) => {
        return this.tariffService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetTariffSuccessAction({ data }));
      })
    );
  });

  setTariff$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadTariffAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.tariffService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetTariffAction({ data }));
      })
    );
  });

  getInspectionResult$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetInspectionResultAction),
      switchMap(({ data }) => {
        return this.dirBusinessInspectionResultService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInspectionResultSuccessAction({ data }));
      })
    );
  });

  setInspectionResult$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadInspectionResultAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirBusinessInspectionResultService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInspectionResultAction({ data }));
      })
    );
  });

  getPreApprovedFactor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetPreApprovedFactorAction),
      switchMap(({ data }) => {
        return this.dirPreApprovedFactorService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPreApprovedFactorSuccessAction({ data }));
      })
    );
  });

  setPreApprovedFactor$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadPreApprovedFactorAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirPreApprovedFactorService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetPreApprovedFactorAction({ data }));
      })
    );
  });

  getAbsCommission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetAbsCommissionAction),
      switchMap(({ data }) => {
        return this.absCommissionService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetAbsCommissionSuccessAction({ data }));
      })
    );
  });

  setAbsCommission$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadAbsCommissionAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.absCommissionService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetAbsCommissionAction({ data }));
      })
    );
  });

  getInnType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetInnTypeAction),
      switchMap(({ data }) => {
        return this.dirInnTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnTypeSuccessAction({ data }));
      })
    );
  });

  setInnType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadInnTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirInnTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnTypeAction({ data }));
      })
    );
  });

  getInnStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetInnStatusAction),
      switchMap(({ data }) => {
        return this.dirInnStatusService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnStatusSuccessAction({ data }));
      })
    );
  });

  setInnStatus$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadInnStatusAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirInnStatusService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetInnStatusAction({ data }));
      })
    );
  });

  getDirGoods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirGoodsAction),
      switchMap(({ data }) => {
        return this.dirGoodsService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirGoodsSuccessAction({ data }));
      })
    );
  });

  setDirGoods$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirGoodsAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirGoodsService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirGoodsAction({ data }));
      })
    );
  });

  getDirEnsureType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirEnsureTypeAction),
      switchMap(({ data }) => {
        return this.dirEnsureTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirEnsureTypeSuccessAction({ data }));
      })
    );
  });

  setDirEnsureType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirEnsureTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirEnsureTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirEnsureTypeAction({ data }));
      })
    );
  });

  getDirIssueType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirIssueTypeAction),
      switchMap(({ data }) => {
        return this.dirIssueTypeService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirIssueTypeSuccessAction({ data }));
      })
    );
  });

  setDirIssueType$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirIssueTypeAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirIssueTypeService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirIssueTypeAction({ data }));
      })
    );
  });

  getDirScheduleFrequency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirScheduleFrequencyAction),
      switchMap(({ data }) => {
        return this.dirScheduleFrequencyService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirScheduleFrequencySuccessAction({ data }));
      })
    );
  });

  setDirScheduleFrequency$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirScheduleFrequencyAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirScheduleFrequencyService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirScheduleFrequencyAction({ data }));
      })
    );
  });

  getDirIncomeFrequency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirIncomeFrequencyAction),
      switchMap(({ data }) => {
        return this.dirIncomeFrequencyService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirIncomeFrequencySuccessAction({ data }));
      })
    );
  });

  setDirIncomeFrequency$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirIncomeFrequencyAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirIncomeFrequencyService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirIncomeFrequencyAction({ data }));
      })
    );
  });

  getDirJobPosition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetDirJobPositionAction),
      switchMap(({ data }) => {
        return this.dirJobPositionService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirJobPositionSuccessAction({ data }));
      })
    );
  });

  setDirJobPosition$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadDirJobPositionAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.dirJobPositionService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetDirJobPositionAction({ data }));
      })
    );
  });

  getRbp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirSetRbpAction),
      switchMap(({ data }) => {
        return this.rbpService.getByPage(data);
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetRbpSuccessAction({ data }));
      })
    );
  });

  setRbp$ = createEffect(() => {
    let sortAndPage: PaginationAndSortingDto;
    return this.actions$.pipe(
      ofType(DirectoriesActions.DirUploadRbpAction),
      switchMap(data => {
        sortAndPage = data.sortAndPage;
        return this.rbpService.upload(data.uploadFile).pipe(map(() => sortAndPage));
      }),
      switchMap(data => {
        return of(DirectoriesActions.DirSetRbpAction({ data }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private currencyService: DirCurrencyControllerService,
    private branchService: DirBranchControllerService,
    private declineService: DirManagerDeclineReasonsControllerService,
    // private salesChannelService: DirSalesChannelControllerService,
    private mobileProviderService: DirMobileProviderControllerService,
    private countryService: DirCountryControllerService,
    private familyRelationshipService: DirFamilyRelationshipControllerService,
    private educationService: DirEducationControllerService,
    private creditPurposeService: DirCreditPurposeControllerService,
    private activitiesService: DirActivitiesControllerService,
    private preApprovedService: DirPreApprovedCreditControllerService,
    private numberEmployeeService: DirNumberEmployeeControllerService,
    private accommodationTypeService: DirAccommodationTypeControllerService,
    private callCentreDeclineService: DirCallCentreDeclineReasonControllerService,
    private employmentLegalStructureService: DirEmploymentLegalStructureControllerService,
    private departmentService: DirDepartmentControllerService,
    private ipdlService: DirIpdlControllerService,
    private innAbsenceReasonService: DirInnAbsenceReasonControllerService,
    private communicationTypeService: DirCommunicationTypeControllerService,
    private incomeTypeService: DirIncomeTypeControllerService,
    private operationTypeService: DirOperationTypeControllerService,
    private fatcaService: DirFatcaControllerService,
    private operationFreqTypeService: DirOperationFreqTypeControllerService,
    private signerControllerService: DirSignerControllerService,
    private cityControllerService: DirCityControllerService,
    private regionControllerService: DirRegionControllerService,
    private paymentCardControllerService: DirPaymentCardControllerService,
    private decisionMakerDeclineReasonControllerService: DirDecisionMakerDeclineReasonControllerService,
    private callStatusControllerService: DirCallStatusControllerService,
    private insuranceTypeControllerService: DirInsuranceTypeControllerService,
    private segmentService: SegmentControllerService,
    private dirBusinessInspectionResultService: DirBusinessInspectionResultControllerService,
    private dirPreApprovedFactorService: DirPreapprovedFactorControllerService,
    private absCommissionService: AbsCommissionControllerService,
    private dirInnTypeService: DirInnTypeControllerService,
    private dirInnStatusService: DirInnStatusControllerService,
    private dirGoodsService: DirGoodsService,
    private dirEnsureTypeService: DirEnsureTypeService,
    private dirIssueTypeService: DirIssueTypeControllerService,
    private dirScheduleFrequencyService: DirScheduleFrequencyControllerService,
    private dirIncomeFrequencyService: DirIncomeFrequencyControllerService,
    private dirJobPositionService: DirJobPositionControllerService,
    private tariffService: TariffControllerService,
    private rbpService: DirRiskBasedPriceControllerService
  ) {}
}
