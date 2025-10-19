import * as DirectoriesActions from '@app/store/actions/directories.actions';
import * as DirectoriesSelectors from '@app/store/selectors/directories.selector';
import * as HEADERS from './constants/table-headers';
// @ts-ignore
import moment from 'moment';
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
import {
  AttachmentSaveData,
  Dir,
  DirAbsCode,
  DirBusinessInspectionResult,
  DirCityDto,
  DirCountry,
  DirPreApproved,
  DirRiskBasedPrice,
  DirSigner,
  Directory,
  DirectoryVal,
  ModalData,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader,
  TypeDto,
  TypeServices,
  DirIncomeType
} from '@app/_models';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { DirActivitiesControllerService } from '@app/api/dir-activities-controller.service';
import { DirCallStatusControllerService } from '@app/api/dir-call-status-controller.service';
import { DirCityControllerService } from '@app/api/dir-city-controller.service';
import { DirCreditPurposeControllerService } from '@app/api/dir-credit-purpose-controller.service';
import { DirEducationControllerService } from '@app/api/dir-education-controller.service';
import { DirFamilyRelationshipControllerService } from '@app/api/dir-family-relationship-controller.service';
import { DirFatcaControllerService } from '@app/api/dir-fatca-controller.service';
import { DirInsuranceTypeControllerService } from '@app/api/dir-insurance-type-controller.service';
import { DirOperationFreqTypeControllerService } from '@app/api/dir-operation-freq-type-controller.service';
import { DirPaymentCardControllerService } from '@app/api/dir-payment-card-controller.service';
import { DirPreApprovedCreditControllerService } from '@app/api/dir-pre-approved-credit-controlle.service';
import { DirRegionControllerService } from '@app/api/dir-region-controller.service';
import { DirRiskBasedPriceControllerService } from '@app/api/dir-risk-based-price-controller.service';
import { DirSignerControllerService } from '@app/api/dir-signer-contoller.service';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { Injectable } from '@angular/core';
import { MimeTypes } from '@app/components/constants/mime-types';
import { Router } from '@angular/router';
import { Segment } from '@app/_models';
import { Sort } from '@angular/material/sort';
import { TariffControllerService } from '@app/api/tariff-controller.service';
import { TranslateService } from '@ngx-translate/core';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { takeUntil } from 'rxjs/operators';
import { CommonDialogService } from '@app/services/common-dialog.service';
import { LEVELS_PM_FORM } from '@app/pages/administration/administration-page/levels-pm/levels-pm-page/levelxPM-constant';
import { DirCompetenceLevel } from '@app/_models/api-models/dir-competence-level';
import { IMPORT_CURRENCIES_FORM } from '@app/pages/directories/directories-page/filter-table/constants/modals-constants';
import { AbsSearchClientControllerService } from '@app/api/abs-search-client-controller.service';
import { DirFatcaRegionHttpService } from '@app/api/dir-fatca-region-http.service';

const INITIAL_BUTTONS_CONFIG = {
  downloadExel: { show: true, name: 'Buttons.ExportExcel' },
  uploadExel: { show: true, name: 'Buttons.ImportExcel' },
  otherButton: { show: false, name: '' }
};

@Injectable()
export class FilterTableService {
  private objColNameProps: TableDataHeader[];
  private setAction: any;
  private uploadAction: any;
  private service: TypeServices;
  private fileName: string;

  private selectUserData$ = this._store.pipe(select(selectUserData));

  private selectDeclines$ = this._store.pipe(select(DirectoriesSelectors.selectDeclines));
  private selectBankBranch$ = this._store.pipe(select(DirectoriesSelectors.selectBankBranch));
  private selectCountries$ = this._store.pipe(select(DirectoriesSelectors.selectCountries));
  private selectCurrency$ = this._store.pipe(select(DirectoriesSelectors.selectCurrency));
  // private selectSalesChanel$ = this._store.pipe(select(selectSalesChanel));
  private selectOperatorCode$ = this._store.pipe(select(DirectoriesSelectors.selectOperatorCode));
  private selectPreApproved$ = this._store.pipe(select(DirectoriesSelectors.selectPreApproved));
  private selectCreditPurpose$ = this._store.pipe(select(DirectoriesSelectors.selectCreditPurpose));
  private selectEducation$ = this._store.pipe(select(DirectoriesSelectors.selectEducation));
  private selectActivities$ = this._store.pipe(select(DirectoriesSelectors.selectActivities));
  private selectFamilyRelationship$ = this._store.pipe(select(DirectoriesSelectors.selectFamilyRelationship));
  private selectNumberEmployee$ = this._store.pipe(select(DirectoriesSelectors.selectNumberEmployee));
  private selectAccommodationType$ = this._store.pipe(select(DirectoriesSelectors.selectAccommodationType));
  private selectCallCenterDecline$ = this._store.pipe(select(DirectoriesSelectors.selectCallCenterDecline));
  private selectLegalStructureType$ = this._store.pipe(select(DirectoriesSelectors.selectLegalStructureType));
  private selectDepartment$ = this._store.pipe(select(DirectoriesSelectors.selectDepartment));
  private selectIpdl$ = this._store.pipe(select(DirectoriesSelectors.selectIpdl));
  private selectInnAbsenceReason$ = this._store.pipe(select(DirectoriesSelectors.selectInnAbsenceReason));
  private selectCommunicationType$ = this._store.pipe(select(DirectoriesSelectors.selectCommunicationType));
  private selectIncomeType$ = this._store.pipe(select(DirectoriesSelectors.selectIncomeType));
  private selectOperationType$ = this._store.pipe(select(DirectoriesSelectors.selectOperationType));
  private selectFatca$ = this._store.pipe(select(DirectoriesSelectors.selectFatca));
  private selectOperationFreqType$ = this._store.pipe(select(DirectoriesSelectors.selectOperationFreqType));
  private selectSigner$ = this._store.pipe(select(DirectoriesSelectors.selectSigner));
  private selectCity$ = this._store.pipe(select(DirectoriesSelectors.selectCity));
  private selectRegion$ = this._store.pipe(select(DirectoriesSelectors.selectRegion));
  private selectCallStatus$ = this._store.pipe(select(DirectoriesSelectors.selectCallStatus));
  private selectPaymentCard$ = this._store.pipe(select(DirectoriesSelectors.selectPaymentCard));
  private selectDecisionMakerDeclineReason$ = this._store.pipe(
    select(DirectoriesSelectors.selectDecisionMakerDeclineReason)
  );
  private selectInsuranceType$ = this._store.pipe(select(DirectoriesSelectors.selectInsuranceType));
  private selectSegments$ = this._store.pipe(select(DirectoriesSelectors.selectSegments));
  private selectInspectionResult$ = this._store.pipe(select(DirectoriesSelectors.selectInspectionResult));
  private selectPreApprovedFactor$ = this._store.pipe(select(DirectoriesSelectors.selectPreApprovedFactor));
  private selectAbsCommission$ = this._store.pipe(select(DirectoriesSelectors.selectAbsCommission));
  private selectInnType$ = this._store.pipe(select(DirectoriesSelectors.selectInnType));
  private selectInnStatus$ = this._store.pipe(select(DirectoriesSelectors.selectInnStatus));
  private selectDirGoods$ = this._store.pipe(select(DirectoriesSelectors.selectDirGoods));
  private selectDirPartner$ = this._store.pipe(select(DirectoriesSelectors.selectDirPartner));
  private selectDirFatcaRegions$ = this._store.pipe(select(DirectoriesSelectors.selectDirFatcaRegions));
  private selectDirEnsureType$ = this._store.pipe(select(DirectoriesSelectors.selectDirEnsureType));
  private selectDirIssueType$ = this._store.pipe(select(DirectoriesSelectors.selectDirIssueType));
  private selectDirIncomeFrequency$ = this._store.pipe(select(DirectoriesSelectors.selectDirIncomeFrequency));
  private selectDirScheduleFrequency$ = this._store.pipe(select(DirectoriesSelectors.selectDirScheduleFrequency));
  private selectDirJobPosition$ = this._store.pipe(select(DirectoriesSelectors.selectDirJobPosition));
  private selectTariff$ = this._store.pipe(select(DirectoriesSelectors.selectTariff));
  private selectRbp$ = this._store.pipe(select(DirectoriesSelectors.selectRbp));

  private userId: number;
  private tableBlockWidth: string | null = null;
  private _showPagination: boolean = true;

  private params: PaginationAndSortingDto = {
    page: 0,
    size: 20
  };

  private _buttonsParams = INITIAL_BUTTONS_CONFIG;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private _store: Store<IAppState>,
    private translateService: TranslateService,
    private fileService: DownloadUploadFileService,
    private currencyService: DirCurrencyControllerService,
    private countryService: DirCountryControllerService,
    private mobileProviderService: DirMobileProviderControllerService,
    private branchService: DirBranchControllerService,
    private dirFatcaRegionHttpService: DirFatcaRegionHttpService,
    private declineService: DirManagerDeclineReasonsControllerService,
    private familyRelationshipService: DirFamilyRelationshipControllerService,
    private educationService: DirEducationControllerService,
    private creditPurposeService: DirCreditPurposeControllerService,
    private activitiesService: DirActivitiesControllerService,
    private preApprovedService: DirPreApprovedCreditControllerService,
    private numberEmployeeService: DirNumberEmployeeControllerService,
    private accommodationTypeService: DirAccommodationTypeControllerService,
    private callCenterDeclineService: DirCallCentreDeclineReasonControllerService,
    private employmentLegalStuctureService: DirEmploymentLegalStructureControllerService,
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
    private decisionMakerDeclineControllerService: DirDecisionMakerDeclineReasonControllerService,
    private callStatusControllerService: DirCallStatusControllerService,
    private insuranceTypeControllerService: DirInsuranceTypeControllerService,
    private segmentService: SegmentControllerService,
    private dirPreApprovedFactorService: DirPreapprovedFactorControllerService,
    private absCommissionService: AbsCommissionControllerService,
    private dirEnsureTypeService: DirEnsureTypeService,
    private dirIssueTypeService: DirIssueTypeControllerService,
    private dirIncomeFrequencyService: DirIncomeFrequencyControllerService,
    private dirScheduleFrequencyService: DirScheduleFrequencyControllerService,
    private dirJobPositionService: DirJobPositionControllerService,
    private tariffService: TariffControllerService,
    private rbpService: DirRiskBasedPriceControllerService,
    private readonly commonDialogService: CommonDialogService,
    private readonly absSearchClientControllerService: AbsSearchClientControllerService
  ) {}

  get buttonsParams(): any {
    return this._buttonsParams;
  }

  get showPagination(): boolean {
    return this._showPagination;
  }

  otherButtonEvent = (): void => {};

  selectItemLimit(itemLimit: number) {
    this.params.size = itemLimit;
  }

  subscribeToUserData() {
    this.selectUserData$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.userId = res.id;
    });
  }

  getSelect(params: string): Observable<PageDTO<TypeDto>> {
    this.skipConfig();
    const selectOptions = {
      declines: () => {
        return this.setDeclinesData();
      },
      bankBranch: () => {
        return this.setBankBranchData();
      },
      department: () => {
        return this.setDepartmentData();
      },
      countries: () => {
        return this.setCountriesData();
      },
      currency: () => {
        return this.setCurrencyData();
      },
      operatorCode: () => {
        return this.setOperatorCodeData();
      },
      preApprovedCredit: () => {
        return this.setPreApprovedCreditData();
      },
      creditPurpose: () => {
        return this.setCreditPurposeData();
      },
      education: () => {
        return this.setEducationData();
      },
      activities: () => {
        return this.setActivitiesData();
      },
      familyRelationship: () => {
        return this.setFamilyRelationshipData();
      },
      numberEmployee: () => {
        return this.setNumberEmployeeData();
      },
      accommodationType: () => {
        return this.setAccommodationTypeData();
      },
      callCenterDecline: () => {
        return this.setCallCenterDeclineData();
      },
      employmentLegalType: () => {
        return this.setEmploymentLegalTypeData();
      },
      ipdl: () => {
        return this.setIpdlData();
      },
      innAbsenceReason: () => {
        return this.setInnAbsenceReasonData();
      },
      communicationType: () => {
        return this.setCommunicationTypeData();
      },
      incomeType: () => {
        return this.setIncomeTypeData();
      },
      operationType: () => {
        return this.setOperationTypeData();
      },
      fatca: () => {
        return this.setFatca();
      },
      'operation-freq-type': () => {
        return this.setOperationFreqType();
      },
      'fatca-regions': () => {
        return this.setFatcaRegions();
      },
      signer: () => {
        return this.setSignerData();
      },
      city: () => {
        return this.setCityData();
      },
      region: () => {
        return this.setRegionData();
      },
      'call-status': () => {
        return this.setCallStatusData();
      },
      'payment-card': () => {
        return this.setPaymentCardData();
      },
      'decision-maker-decline-reason': () => {
        return this.setDecisionMakerDeclineReasonData();
      },
      'insurance-types': () => {
        return this.setInsuranceTypeData();
      },
      segments: () => {
        return this.setSegmentsData();
      },
      'preapproved-factor': () => {
        return this.setPreApprovedFactorData();
      },
      'abs-commission': () => {
        return this.setAbsCommissionData();
      },
      'ensure-type': () => {
        return this.setDirEnsureType();
      },
      'issue-type': () => {
        return this.setDirIssueType();
      },
      'income-frequency': () => {
        return this.setDirIncomeFrequency();
      },
      'schedule-frequency': () => {
        return this.setDirScheduleFrequency();
      },
      'job-position': () => {
        return this.setDirJobPosition();
      },
      tariff: () => {
        return this.setTariffData();
      },
      rbp: () => {
        return this.setRbp();
      }
    };

    if (selectOptions.hasOwnProperty(params)) {
      return selectOptions[params]();
    } else {
      this.router.navigate(['/pages/directories/declines']);
    }
  }

  dispatchData() {
    this._store.dispatch(this.setAction({ data: { ...this.params } }));
  }

  getTableBlockWidth() {
    return this.tableBlockWidth;
  }

  getTableData(dirData: TypeDto[]) {
    return new TableData(this.objColNameProps, dirData);
  }

  selectedPage(pageNumber: number): void {
    this.params.page = pageNumber - 1;

    this.dispatchData();
  }

  sortingData(sortData: Sort): void {
    this.params.sort = sortData.active + ',' + sortData.direction;

    this.dispatchData();
  }

  downloadExel() {
    this.service
      .download()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fileService.downloadFile(res, this.translateTitle(this.fileName));
      });
  }

  uploadExel() {
    const params: ModalData = {
      accept: [MimeTypes.XLS, MimeTypes.XLSX],
      pathTitle: 'Modals.Buttons.ChooseFile',
      returnString: false
    };

    this.fileService
      .openDialog(params)
      .afterClosed()
      .subscribe((result: AttachmentSaveData | 'close') => {
        const options = {
          file: (result as AttachmentSaveData).file,
          userId: this.userId
        };
        if (result && result !== 'close') {
          this._store.dispatch(this.uploadAction({ sortAndPage: { ...this.params }, uploadFile: options }));
        }
      });
  }

  destroy() {
    this.destroy$.next(false);
  }

  private skipConfig = (): void => {
    this._buttonsParams = { ...INITIAL_BUTTONS_CONFIG, otherButton: { show: false, name: '' } };
    this._showPagination = true;
    this.otherButtonEvent = (): void => {};
  };

  private translateTitle(key: string): string {
    let title: string;

    this.translateService.get(key).subscribe((data: string) => (title = data));

    return `${title}.xlsx` || 'emptyName.xlsx';
  }

  private setDeclinesData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.CreditManagerRefusalReasons';
    this.service = this.declineService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetDeclinesAction;
    this.uploadAction = DirectoriesActions.DirUploadDeclinesAction;
    return this.selectDeclines$;
  }

  private setBankBranchData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.BankBranches';
    this.service = this.branchService;
    this.objColNameProps = HEADERS.BANK_BRANCH;
    this.setAction = DirectoriesActions.DirSetBankBranchAction;
    this.uploadAction = DirectoriesActions.DirUploadBankBranchAction;

    // this._showPagination = false;
    this.buttonsParams.otherButton.show = true;
    this.buttonsParams.otherButton.name = 'Buttons.Refresh';
    this.otherButtonEvent = () => {
      this.absSearchClientControllerService.getAbsBrunches(1).then(() => {
        this.dispatchData();
      });
    };

    return this.selectBankBranch$;
  }

  private setDepartmentData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'Отделы банка.xlsx';
    this.service = this.departmentService;
    this.objColNameProps = HEADERS.CODE_NAME_VALUE_LANG;
    this.setAction = DirectoriesActions.DirSetDepartmentAction;
    this.uploadAction = DirectoriesActions.DirUploadDepartmentAction;
    return this.selectDepartment$;
  }

  private setCountriesData(): Observable<PageDTO<DirCountry>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.Countries';
    this.service = this.countryService;
    this.objColNameProps = HEADERS.COUNTRIES;
    this.setAction = DirectoriesActions.DirSetCountriesAction;
    this.uploadAction = DirectoriesActions.DirUploadCountriesAction;
    return this.selectCountries$;
  }

  private setCurrencyData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.CurrencyCodes';
    this.service = this.currencyService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetCurrencyAction;
    this.uploadAction = DirectoriesActions.DirUploadCurrencyAction;

    this.buttonsParams.otherButton.show = true;
    this.buttonsParams.otherButton.name = 'Buttons.ImportCurrencies';
    this.otherButtonEvent = () => {
      this.commonDialogService.showDialog(
        {
          title: 'Buttons.ImportCurrencies',
          dataInfo: { date: new Date() },
          formConfig: IMPORT_CURRENCIES_FORM,
          showSaveButton: false,
          showCreateButton: true,
          createButtonName: 'Buttons.Download',
          disabledFields: false
        },
        ({ date }) => {
          const sendDate = moment(date).format('YYYY-MM-DD');
          this.absSearchClientControllerService.getCurrencyRates(sendDate).then(() => {
            this.dispatchData();
          });
        },
        { width: '50%', height: '40%' }
      );
    };

    return this.selectCurrency$;
  }

  // private setSalesChanelData(): Observable<PageDTO<Directory>> {
  //   this.tableBlockWidth = null;
  //   this.fileName = 'Каналы продаж.xlsx';
  //   this.service = this.salesChannelService;
  //   this.objColNameProps = HEADERS.CODE_NAME_VALUE;
  //   this.setAction = DirSetSalesChanelAction;
  //   this.uploadAction = DirUploadSalesChanelAction;
  //   return this.selectSalesChanel$;
  // }

  private setOperatorCodeData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'Коды операторов мобильной связи.xlsx';
    this.service = this.mobileProviderService;
    this.objColNameProps = HEADERS.CODE_NAME_VALUE;
    this.setAction = DirectoriesActions.DirSetOperatorCodeAction;
    this.uploadAction = DirectoriesActions.DirUploadOperatorCodeAction;
    return this.selectOperatorCode$;
  }

  private setPreApprovedCreditData(): Observable<PageDTO<DirPreApproved>> {
    this.tableBlockWidth = '3000px';
    this.fileName = 'Предодобренные заявки.xls';
    this.service = this.preApprovedService;
    this.objColNameProps = HEADERS.PRE_APPROVED_CREDIT;
    this.setAction = DirectoriesActions.DirSetPreApprovedAction;
    this.uploadAction = DirectoriesActions.DirUploadPreApprovedAction;
    return this.selectPreApproved$;
  }

  private setCreditPurposeData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.CreditPurpose';
    this.service = this.creditPurposeService;
    this.objColNameProps = HEADERS.CREDIT_PURPOSE;
    this.setAction = DirectoriesActions.DirSetCreditPurposeAction;
    this.uploadAction = DirectoriesActions.DirUploadCreditPurposeAction;
    return this.selectCreditPurpose$;
  }

  private setEducationData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'Образование.xlsx';
    this.service = this.educationService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetEducationAction;
    this.uploadAction = DirectoriesActions.DirUploadEducationAction;
    return this.selectEducation$;
  }

  private setActivitiesData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.ActivitiesTypes';
    this.service = this.activitiesService;
    this.objColNameProps = HEADERS.ACTIVITIES;
    this.setAction = DirectoriesActions.DirSetActivitiesAction;
    this.uploadAction = DirectoriesActions.DirUploadActivitiesAction;
    return this.selectActivities$;
  }

  private setFamilyRelationshipData(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.FamilyConnections';
    this.service = this.familyRelationshipService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetFamilyRelationshipAction;
    this.uploadAction = DirectoriesActions.DirUploadFamilyRelationshipAction;
    return this.selectFamilyRelationship$;
  }

  private setNumberEmployeeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.NumberEmployee';
    this.service = this.numberEmployeeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetNumberEmployeeAction;
    this.uploadAction = DirectoriesActions.DirUploadNumberEmployeeAction;
    return this.selectNumberEmployee$;
  }

  private setAccommodationTypeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'Виды проживания.xlsx';
    this.service = this.accommodationTypeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetAccommodationTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadAccommodationTypeAction;
    return this.selectAccommodationType$;
  }

  private setCallCenterDeclineData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.CallCenterEmployeeRefusalReasons';
    this.service = this.callCenterDeclineService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_WITHOUT_VALUE;
    this.setAction = DirectoriesActions.DirSetCallCenterDeclineAction;
    this.uploadAction = DirectoriesActions.DirUploadCallCenterDeclineAction;
    return this.selectCallCenterDecline$;
  }

  private setEmploymentLegalTypeData(): Observable<PageDTO<DirAbsCode>> {
    this.tableBlockWidth = null;
    this.fileName = 'Организационно правовая структура работодателя.xlsx';
    this.service = this.employmentLegalStuctureService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetEmploymentLegalTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadEmploymentLegalTypeAction;
    return this.selectLegalStructureType$;
  }

  private setIpdlData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'Категории публичных должностных лиц.xlsx';
    this.service = this.ipdlService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetIpdlAction;
    this.uploadAction = DirectoriesActions.DirUploadIpdlAction;
    return this.selectIpdl$;
  }

  private setInnAbsenceReasonData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'Причины отсутствия ИНН.xlsx';
    this.service = this.innAbsenceReasonService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE_EN;
    this.setAction = DirectoriesActions.DirSetInnAbsenceReasonAction;
    this.uploadAction = DirectoriesActions.DirUploadInnAbsenceReasonAction;
    return this.selectInnAbsenceReason$;
  }

  private setCommunicationTypeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'Типы связи.xlsx';
    this.service = this.communicationTypeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetCommunicationTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadCommunicationTypeAction;
    return this.selectCommunicationType$;
  }

  private setIncomeTypeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.IncomeTypes';
    this.service = this.incomeTypeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetIncomeTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadIncomeTypeAction;
    return this.selectIncomeType$;
  }

  private setOperationTypeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.PlannedOperations';
    this.service = this.operationTypeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetOperationTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadOperationTypeAction;
    return this.selectOperationType$;
  }

  private setFatca(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.FATCA';
    this.service = this.fatcaService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetFatcaAction;
    this.uploadAction = DirectoriesActions.DirUploadFatcaAction;
    return this.selectFatca$;
  }

  private setOperationFreqType(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.OperationsFrequencyAndVolume';
    this.service = this.operationFreqTypeService;
    this.objColNameProps = HEADERS.CODE_NAME_RU_GE;
    this.setAction = DirectoriesActions.DirSetOperationFreqTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadOperationFreqTypeAction;
    return this.selectOperationFreqType$;
  }

  private setFatcaRegions(): Observable<PageDTO<Directory>> {
    this.tableBlockWidth = null;
    this.fileName = 'FatcaRegions';
    this.service = this.dirFatcaRegionHttpService;
    this.objColNameProps = HEADERS.FATCA_REGIONS;
    this.setAction = DirectoriesActions.DirSetFatcaRegionsAction;
    this.uploadAction = null; // DirectoriesActions.DirUploadFatcaRegionsAction;

    // this._showPagination = false;
    this.buttonsParams.uploadExel.show = false;
    this.buttonsParams.downloadExel.show = false;
    this.buttonsParams.otherButton.show = true;
    this.buttonsParams.otherButton.name = 'Buttons.Refresh';
    this.otherButtonEvent = () => {
      this.absSearchClientControllerService.getAbsBrunches(7).then(() => {
        this.dispatchData();
      });
    };

    return this.selectDirFatcaRegions$;
  }

  private setSignerData(): Observable<PageDTO<DirSigner>> {
    this.tableBlockWidth = null;
    this.fileName = 'Подписанты.xlsx';
    this.service = this.signerControllerService;
    this.objColNameProps = HEADERS.SIGNER;
    this.setAction = DirectoriesActions.DirSetSignerAction;
    this.uploadAction = DirectoriesActions.DirUploadSignerAction;
    return this.selectSigner$;
  }

  private setCityData(): Observable<PageDTO<DirCityDto>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.Localities';
    this.service = this.cityControllerService;
    this.objColNameProps = HEADERS.CITY;
    this.setAction = DirectoriesActions.DirSetCityAction;
    this.uploadAction = DirectoriesActions.DirUploadCityAction;
    return this.selectCity$;
  }

  private setRegionData(): Observable<PageDTO<DirAbsCode>> {
    this.tableBlockWidth = null;
    this.fileName = 'Регионы.xlsx';
    this.service = this.regionControllerService;
    this.objColNameProps = HEADERS.REGION;
    this.setAction = DirectoriesActions.DirSetRegionAction;
    this.uploadAction = DirectoriesActions.DirUploadRegionAction;
    return this.selectRegion$;
  }

  private setCallStatusData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'Статусы телефонной верификации.xlsx';
    this.service = this.callStatusControllerService;
    this.objColNameProps = HEADERS.CALL_STATUS;
    this.setAction = DirectoriesActions.DirSetCallStatusAction;
    this.uploadAction = DirectoriesActions.DirUploadCallStatusAction;
    return this.selectCallStatus$;
  }

  private setPaymentCardData(): Observable<PageDTO<DirIncomeType>> {
    this.tableBlockWidth = null;
    this.fileName = 'Directories.TypesOfCards';
    this.service = this.paymentCardControllerService;
    this.objColNameProps = HEADERS.PAYMENT_CARD;
    this.setAction = DirectoriesActions.DirSetPaymentCardAction;
    this.uploadAction = DirectoriesActions.DirUploadPaymentCardAction;
    return this.selectPaymentCard$;
  }

  private setDecisionMakerDeclineReasonData(): Observable<PageDTO<DirectoryVal>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.UnderwriterRefusalReasons';
    this.service = this.decisionMakerDeclineControllerService;
    this.objColNameProps = HEADERS.UNDER_DECLINE_REASON;
    this.setAction = DirectoriesActions.DirSetDecisionMakerDeclineReasonAction;
    this.uploadAction = DirectoriesActions.DirUploadDecisionMakerDeclineReasonAction;
    return this.selectDecisionMakerDeclineReason$;
  }

  private setInsuranceTypeData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.InsuranceTypes';
    this.service = this.insuranceTypeControllerService;
    this.objColNameProps = HEADERS.INSURANCE_TYPE;
    this.setAction = DirectoriesActions.DirSetInsuranceTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadInsuranceTypeAction;
    return this.selectInsuranceType$;
  }

  private setSegmentsData(): Observable<PageDTO<Segment>> {
    this.tableBlockWidth = null;
    this.fileName = 'Сегменты.xlsx';
    this.service = this.segmentService;
    this.objColNameProps = HEADERS.SEGMENTS;
    this.setAction = DirectoriesActions.DirSetSegmentsAction;
    this.uploadAction = DirectoriesActions.DirUploadSegmentsAction;
    return this.selectSegments$;
  }

  private setTariffData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.Tariff';
    this.service = this.tariffService;
    this.objColNameProps = HEADERS.DIR_TARIFF;
    this.setAction = DirectoriesActions.DirSetTariffAction;
    this.uploadAction = DirectoriesActions.DirUploadTariffAction;
    return this.selectTariff$;
  }

  private setPreApprovedFactorData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.PreApprovedClientsFactors';
    this.service = this.dirPreApprovedFactorService;
    this.objColNameProps = HEADERS.PREAPPROVED_FACTOR;
    this.setAction = DirectoriesActions.DirSetPreApprovedFactorAction;
    this.uploadAction = DirectoriesActions.DirUploadPreApprovedFactorAction;
    return this.selectPreApprovedFactor$;
  }

  private setAbsCommissionData(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.CommissionCodes';
    this.service = this.absCommissionService;
    this.objColNameProps = HEADERS.ABS_COMMISSION;
    this.setAction = DirectoriesActions.DirSetAbsCommissionAction;
    this.uploadAction = DirectoriesActions.DirUploadAbsCommissionAction;
    return this.selectAbsCommission$;
  }

  private setDirEnsureType(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.EnsureType';
    this.service = this.dirEnsureTypeService;
    this.objColNameProps = HEADERS.DIR_ENSURE_TYPE;
    this.setAction = DirectoriesActions.DirSetDirEnsureTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadDirEnsureTypeAction;
    return this.selectDirEnsureType$;
  }

  private setDirIssueType(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.IssueType';
    this.service = this.dirIssueTypeService;
    this.objColNameProps = HEADERS.DIR_ISSUE_TYPE;
    this.setAction = DirectoriesActions.DirSetDirIssueTypeAction;
    this.uploadAction = DirectoriesActions.DirUploadDirIssueTypeAction;
    return this.selectDirIssueType$;
  }

  private setDirIncomeFrequency(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.IncomeFrequency';
    this.service = this.dirIncomeFrequencyService;
    this.objColNameProps = HEADERS.DIR_INCOME_FREQUENCY;
    this.setAction = DirectoriesActions.DirSetDirIncomeFrequencyAction;
    this.uploadAction = DirectoriesActions.DirUploadDirIncomeFrequencyAction;
    return this.selectDirIncomeFrequency$;
  }

  private setDirScheduleFrequency(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.ScheduleFrequency';
    this.service = this.dirScheduleFrequencyService;
    this.objColNameProps = HEADERS.DIR_SCHEDULE_FREQUENCY;
    this.setAction = DirectoriesActions.DirSetDirScheduleFrequencyAction;
    this.uploadAction = DirectoriesActions.DirUploadDirScheduleFrequencyAction;
    return this.selectDirScheduleFrequency$;
  }

  private setDirJobPosition(): Observable<PageDTO<Dir>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.JobPosition';
    this.service = this.dirJobPositionService;
    this.objColNameProps = HEADERS.DIR_JOB_POSITION;
    this.setAction = DirectoriesActions.DirSetDirJobPositionAction;
    this.uploadAction = DirectoriesActions.DirUploadDirJobPositionAction;
    return this.selectDirJobPosition$;
  }

  private setRbp(): Observable<PageDTO<DirRiskBasedPrice>> {
    this.tableBlockWidth = null;
    this.fileName = 'FilesNames.RBP';
    this.service = this.rbpService;
    this.objColNameProps = HEADERS.DIR_RBP;
    this.setAction = DirectoriesActions.DirSetRbpAction;
    this.uploadAction = DirectoriesActions.DirUploadRbpAction;
    return this.selectRbp$;
  }
}
