import { Component, Input, OnInit } from '@angular/core';
import { Application, BaseFormField, Dir, EInputType, PaginationAndSortingDto, TableData } from '@app/_models';
import {
  INSIDE_INFO,
  INSIDE_INFO_TITLES,
  InsideInfoGroupKeys
} from '@app/components/tabs/inside-info/constants/inside-info.config';
import {
  INTERNAL_LOAN_HISTORY,
  OVERDUE_PROPS,
  OBLIGATIONS_PROPS,
  PARALLEL_APPLICATIONS,
  RELATED_PERSONS
} from '@app/components/tabs/inside-info/constants/inside-info.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupService } from '@app/services/form-group.service';
import {
  AssociatedPersonsDto,
  IntegrationAbsParallelApplicationsDto,
  SummaryIndividualsDataDto
} from '@app/_models/api-models/inner-information';
import { IntegrationAcraControllerService } from '@app/api';
import {
  AcraCreditInfoLoan,
  AcraLoanAggregatesDto,
  AcraLoanFilterDto,
  AcraLoanFilteredDto
} from '@app/_models/api-models/integration-acra';
import { tap } from 'rxjs/operators';
import {
  ACRA_LOAN_AGGREGATES_INFO,
  HistoryResponseGroupKeys
} from '@app/components/tabs/history-response/constants/history-response.config';
import { BooleanFilterType } from '@app/shared/components/table-sort/table-sort.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { VkiAggregates } from '@app/_models/api-models/vki-aggregates';
import { CustomDatePipe } from '@app/pipes/pipes';

// * Внутренняя информация
@Component({
  selector: 'ng-inside-info',
  templateUrl: './inside-info.component.html',
  styleUrls: ['./inside-info.component.scss'],
  providers: [CustomDatePipe]
})
export class InsideInfoComponent implements OnInit {
  public insideInfoForm: FormGroup;
  public eInputType = EInputType;

  public historyResponseGroupKeys = HistoryResponseGroupKeys;
  public aggregatesInfoConfig: BaseFormField[] = ACRA_LOAN_AGGREGATES_INFO;
  public insideInfoGroupKeys = InsideInfoGroupKeys;
  public insideInfoConfig: BaseFormField[] = INSIDE_INFO;
  public titles: Record<string, string> = INSIDE_INFO_TITLES;

  public aggregatesInfoData: AcraLoanAggregatesDto;
  public vkiAggregatesInfoData: VkiAggregates;
  public obligationsData: AcraLoanFilteredDto;

  public relatedPersonsColTableData: TableData<AssociatedPersonsDto> = new TableData(RELATED_PERSONS, []);
  public internalLoanHistoryColTableData: TableData<VkiAggregates> = new TableData(INTERNAL_LOAN_HISTORY, []);
  public overdueColTableData: TableData<VkiAggregates> = new TableData(OVERDUE_PROPS, []);
  public obligationsColTableData: TableData<AcraCreditInfoLoan> = new TableData(OBLIGATIONS_PROPS, []);
  public parallelApplicationsColTableData: TableData<IntegrationAbsParallelApplicationsDto> = new TableData(
    PARALLEL_APPLICATIONS,
    []
  );

  totalCount: number = 0;
  selectedPage: number = 0;
  itemLimit: number = 1000;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };
  public filterParams: AcraLoanFilterDto;

  @Input() applicationNumber: number;
  @Input() summaryIndividualsInfo: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: CustomDatePipe,
    private translateService: TranslateService,
    private formGroupService: FormGroupService<any, any>,
    private readonly integrationAcraService: IntegrationAcraControllerService
  ) {}

  ngOnInit() {
    this.remapObj(this.summaryIndividualsInfo);
    this.createForm();
    this.setTablesData();
    this.setFilterParams();
    this.getVkiAggregates();
    this.getObligationsData();

    this.translateServiceSubscription();
  }

  public translateServiceSubscription() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.obligationsColTableData = new TableData(
        OBLIGATIONS_PROPS,
        this.remapObligations(this.obligationsData.credits),
        this.obligationsData.filters
      );
    });
  }

  filterEvent(event: any) {
    this.setFilterParams(event);
    this.getObligationsData();
  }

  private remapObj(arr: any[]) {
    if (arr) {
      this.summaryIndividualsInfo = arr.map(data => ({ ...data, applicationNumber: this.applicationNumber }));
    }
  }

  private createForm() {
    this.insideInfoForm = this.fb.group({});
    const insideInfoControls: FormGroup = this.formGroupService.createForm(
      this.vkiAggregatesInfoData,
      this.insideInfoConfig,
      null
    );

    const aggregatesControls: FormGroup = this.formGroupService.createForm(
      this.aggregatesInfoData,
      this.aggregatesInfoConfig,
      null
    );
    this.insideInfoForm.addControl(HistoryResponseGroupKeys.ObligationsTotalInfo, aggregatesControls);

    this.insideInfoForm.addControl(InsideInfoGroupKeys.InternalLoanHistory, insideInfoControls);
  }

  private remapAppStatusAbsOrRkk(appData: any[]) {
    if (appData) {
      appData.forEach(el => {
        el.applicationTypeLoanView = {};
        el.applicationStatusForView = {};

        if (!!el.applicationStatusFromABS) {
          el.applicationStatusForView = {
            nameAm: el.applicationStatusFromABS.nameAm,
            nameRu: el.applicationStatusFromABS.nameRu,
            nameEn: el.applicationStatusFromABS.nameEn
          };
        } else if (!!el.applicationStatusfromRKK) {
          el.applicationStatusForView = {
            nameAm: el.applicationStatusfromRKK.nameAm,
            nameRu: el.applicationStatusfromRKK.nameRu,
            nameEn: el.applicationStatusfromRKK.nameEn
          };
        }
        if (!!el.loanTypeFromABS) {
          el.applicationTypeLoanView = {
            nameAm: el.loanTypeFromABS.nameAm,
            nameRu: el.loanTypeFromABS.nameRu,
            nameEn: el.loanTypeFromABS.nameEn
          };
        } else if (!!el.loanTypeFromRKK) {
          el.applicationTypeLoanView = {
            nameAm: el.loanTypeFromRKK.nameAm,
            nameRu: el.loanTypeFromRKK.nameRu,
            nameEn: el.loanTypeFromRKK.nameEn
          };
        }
      });
    }
  }

  private setTablesData() {
    this.remapAppStatusAbsOrRkk(this.summaryIndividualsInfo);

    if (!!this.summaryIndividualsInfo) {
      this.relatedPersonsColTableData = new TableData(
        RELATED_PERSONS,
        this.summaryIndividualsInfo.associatedPersonsList
      );
      this.parallelApplicationsColTableData = new TableData(PARALLEL_APPLICATIONS, this.summaryIndividualsInfo);
    }
  }

  private getObligationsData(): void {
    this.integrationAcraService
      .getCreditInfoLoan(this.params, this.filterParams)
      .pipe(
        tap(data => {
          this.obligationsData = data;
          this.totalCount = data.credits.length;
          this.aggregatesInfoData = { ...data.aggregates };
          this.patchForm(this.historyResponseGroupKeys.ObligationsTotalInfo, this.aggregatesInfoData);
          this.obligationsColTableData = new TableData(
            OBLIGATIONS_PROPS,
            this.remapObligations(data.credits),
            data.filters
          );
        })
      )
      .subscribe();
  }

  private getVkiAggregates(): void {
    this.integrationAcraService
      .getVkiAggregates(this.applicationNumber)
      .pipe(
        tap(data => {
          this.vkiAggregatesInfoData = data;
          this.internalLoanHistoryColTableData = new TableData(INTERNAL_LOAN_HISTORY, [data]);
          this.overdueColTableData = new TableData(OVERDUE_PROPS, [data]);
          this.insideInfoForm.get('internalLoanHistory').setValue({
            closeDate: this.datePipe.transform(data.closeDate, 'dd-MM-yyyy'),
            responseTimestamp: this.datePipe.transform(data.responseTimestamp, 'dd-MM-yyyy HH:mm:ss'),
            sumBalance: data.sumBalance
          });
        })
      )
      .subscribe();
  }

  private patchForm(control: string, val: any): void {
    this.insideInfoForm.get(control).patchValue(val);
  }

  private setFilterParams = (params?: any): void => {
    this.filterParams = {
      applicationId: this.applicationNumber,
      ...params,
      kpzz: params && params.isKPZZ,
      liabilityType: params && params.liabilityType,
      isReviewed: params && params.numberOfLoanClassReviews
    };
    delete this.filterParams.typeOfLoan;
  };

  private remapAmountOfDeposit(data: any[]) {
    const arr: any[] = [];
    data.forEach(el => {
      arr.push(el.amountOfDeposit || el.amountOfDeposit === 0 ? el.amountOfDeposit : null);
    });
    return arr.join(' ,') as any;
  }

  private remapCurrencyOfDeposit(data: any[]) {
    const arr: any[] = [];
    data.forEach(el => {
      arr.push(el.currencyOfDeposit || el.currencyOfDeposit === 0 ? el.currencyOfDeposit : null);
    });
    return arr.join(' ,') as any;
  }

  private remapDepositCodeRu(data: any[]) {
    const arr: any[] = [];
    data.forEach(el => {
      arr.push(el.depositCodeAbs.nameRu);
    });
    return arr.join(' ,') as any;
  }

  private remapDepositCodeAm(data: any[]) {
    const arr: any[] = [];
    data.forEach(el => {
      arr.push(el.depositCodeAbs.nameAm);
    });
    return arr.join(' ,') as any;
  }

  private remapObligations = (data: AcraCreditInfoLoan[]): AcraCreditInfoLoan[] => {
    return data.map(el => ({
      ...el,
      isCreditLine: el.isCreditLine
        ? this.translateService.instant(BooleanFilterType.YES)
        : this.translateService.instant(BooleanFilterType.NO),
      isKPZZ: el.isKPZZ
        ? this.translateService.instant(BooleanFilterType.YES)
        : this.translateService.instant(BooleanFilterType.NO)
    }));
  };
}
