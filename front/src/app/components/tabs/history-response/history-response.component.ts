import * as HEADERS from './constants/history-response.constants';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  Application,
  BaseFormField,
  EInputType,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ACRA_LOAN_AGGREGATES_INFO,
  HISTORY_RESPONSE_TITLES,
  HistoryResponseGroupKeys,
  INDIVIDUALS_INFO
} from '@app/components/tabs/history-response/constants/history-response.config';
import { FormGroupService } from '@app/services/form-group.service';
import {
  OBLIGATIONS_PROPS,
  OTHER_BANKS_REQUEST_PROPS,
  OVERDUE_PROPS,
  WORST_RISK_CLASS_PROPS
} from '@app/components/tabs/history-response/constants/history-response.constants';
import {
  AcraCreditInfoLoan,
  AcraCreditInfoOtherBanks,
  AcraCreditInfoResponse,
  AcraLoanAggregatesDto,
  AcraLoanFilterDto
} from '@app/_models/api-models/integration-acra';
import { IntegrationAcraControllerService } from '@app/api';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BooleanFilterType } from '@app/shared/components/table-sort/table-sort.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

// Кредитный отчёт
@Component({
  selector: 'ng-history-response',
  templateUrl: './history-response.component.html',
  styleUrls: ['./history-response.component.scss']
})
export class HistoryResponseComponent implements OnInit {
  public creditReportform: FormGroup;

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  selectedPage: number = 0;
  itemLimit: number = 1000;

  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  public filterParams: AcraLoanFilterDto;
  public dataCreditsContent: any;

  public aggregatesInfoData: AcraLoanAggregatesDto;
  public eInputType = EInputType;
  public historyResponseGroupKeys = HistoryResponseGroupKeys;
  public individualsInfoConfig: BaseFormField[] = INDIVIDUALS_INFO;
  public aggregatesInfoConfig: BaseFormField[] = ACRA_LOAN_AGGREGATES_INFO;
  public titles: Record<string, string> = HISTORY_RESPONSE_TITLES;

  public worstRiskClassColTableData: TableData<AcraCreditInfoResponse> = new TableData(WORST_RISK_CLASS_PROPS, []);
  public overdueColTableData: TableData<AcraCreditInfoResponse> = new TableData(OVERDUE_PROPS, []);

  public obligationsColTableHeaders: TableDataHeader[] = HEADERS.OBLIGATIONS_PROPS; // * Отлагательные условия
  public obligationsColTableData: TableData<AcraCreditInfoLoan> = new TableData(OBLIGATIONS_PROPS, []); // * Обязательства
  public otherBanksRequestsColTableData: TableData<AcraCreditInfoOtherBanks> = new TableData(
    OTHER_BANKS_REQUEST_PROPS,
    []
  );

  @Input() public acraCreditInfo: AcraCreditInfoResponse;
  @Input() applicationData: Application;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private formGroupService: FormGroupService<any, any>,
    private integrationAcraService: IntegrationAcraControllerService
  ) {}

  public ngOnInit() {
    this.createForm();
    this.setFilterParams();
    this.setTablesData();
    this.getObligationsData();
    this.translateServiceSubscription();
  }

  public translateServiceSubscription() {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.obligationsColTableData = new TableData(
        OBLIGATIONS_PROPS,
        this.remapObligations(this.dataCreditsContent.credits),
        this.dataCreditsContent.filters
      );
    });
  }

  filterEvent(event: any) {
    this.params.page = 0;
    this.changePage.next(0);
    this.setFilterParams(event);
    this.getObligationsData();
  }

  selectedPageEventObligations(pageNumber: number) {
    this.params.page = pageNumber - 1;
    this.getObligationsData();
  }

  private getObligationsData() {
    this.integrationAcraService
      .getByFiltersAndParams(this.params, this.filterParams)
      .pipe(
        tap(res => {
          this.totalCount = res.credits.length;
          this.aggregatesInfoData = { ...res.aggregates };
          this.patchForm(this.historyResponseGroupKeys.ObligationsTotalInfo, this.aggregatesInfoData);
          this.dataCreditsContent = res;
          this.obligationsColTableData = new TableData(
            OBLIGATIONS_PROPS,
            this.remapObligations(res.credits),
            res.filters
          );
        })
      )
      .subscribe();
  }

  private remapObligations = (data: any[]): AcraCreditInfoLoan[] => {
    return data.map(el => {
      return {
        ...el,
        isCreditLine: el.isCreditLine
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO),
        isKPZZ: el.isKPZZ
          ? this.translateService.instant(BooleanFilterType.YES)
          : this.translateService.instant(BooleanFilterType.NO)
      };
    });
  };

  private createForm() {
    this.creditReportform = this.fb.group({});
    const individualsInfoControls: FormGroup = this.formGroupService.createForm(
      this.acraCreditInfo,
      this.individualsInfoConfig,
      null
    );
    this.creditReportform.addControl(HistoryResponseGroupKeys.IndividualsInformation, individualsInfoControls);

    const aggregatesControls: FormGroup = this.formGroupService.createForm(
      this.aggregatesInfoData,
      this.aggregatesInfoConfig,
      null
    );
    this.creditReportform.addControl(HistoryResponseGroupKeys.ObligationsTotalInfo, aggregatesControls);
  }

  private setTablesData() {
    if (!!this.acraCreditInfo) {
      this.worstRiskClassColTableData = new TableData(WORST_RISK_CLASS_PROPS, [this.acraCreditInfo]);
      this.overdueColTableData = new TableData(OVERDUE_PROPS, [this.acraCreditInfo]);
      this.otherBanksRequestsColTableData = new TableData(
        OTHER_BANKS_REQUEST_PROPS,
        this.acraCreditInfo.acraCreditInfoList
      );
    }
  }

  private patchForm(control: string, val: any): void {
    this.creditReportform.get(control).patchValue(val);
  }

  private setFilterParams = (params?: any): void => {
    this.filterParams = {
      applicationId: this.applicationData.id,
      ...params,
      kpzz: params && params.isKPZZ ? params.isKPZZ : params && params.isKPZZ === false ? params.isKPZZ : null,
      isReviewed: params && params.numberOfLoanClassReviews
    };
  };
}
