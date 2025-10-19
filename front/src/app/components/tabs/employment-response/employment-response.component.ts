import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApplicantIncomeGetDto, Application, BaseFormField, EInputType, TableData } from '@app/_models';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  EmploymentResponseGroupKeys,
  GENERAL_INFO,
  GENERAL_RESPONSE_TITLES
} from './constants/employment-response.config';
import { FormGroupService } from '@app/services/form-group.service';
import {
  EKENG_INCOME_INFO_PROPS,
  EXPERIENCE_INFO_PROPS,
  NORK_INCOME_INFO_PROPS,
  SALARY_RECEIPTS_IN_BANK_INFO_PROPS
} from './constants/employment-response.constants';
import {
  AbsProvenIncomeInfo,
  EkengTaxPayerInfo,
  NorqEkengAbsResponses,
  NorqArgWorkDataDto,
  AbsCardTurnover
} from '@app/_models/api-models/integration-norq';
import { AbsSearchClientControllerService } from '@app/api/abs-search-client-controller.service';
import { tap } from 'rxjs/operators';

// Информация о занятости
@Component({
  selector: 'ng-employment-response',
  templateUrl: './employment-response.component.html',
  styleUrls: ['./employment-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentResponseComponent implements OnInit {
  public employmentInfoform: FormGroup;

  public eInputType = EInputType;
  public employmentResponseGroupKeys = EmploymentResponseGroupKeys;
  public generalInfoConfig: BaseFormField[] = GENERAL_INFO;
  public titles: Record<string, string> = GENERAL_RESPONSE_TITLES;

  public experienceInfoColTableData: TableData<ApplicantIncomeGetDto> = new TableData(EXPERIENCE_INFO_PROPS, []);
  public norkIncomeInfoColTableData: TableData<NorqArgWorkDataDto> = new TableData(NORK_INCOME_INFO_PROPS, []);
  public ekengIncomeInfoColTableData: TableData<EkengTaxPayerInfo> = new TableData(EKENG_INCOME_INFO_PROPS, []);
  public salaryReceiptsInBankInfoColTableData: TableData<AbsCardTurnover> = new TableData(
    SALARY_RECEIPTS_IN_BANK_INFO_PROPS,
    []
  );

  @Input() public employmentInfo: NorqEkengAbsResponses;
  @Input() applicationData: Application;
  @Input() applicantIncome: ApplicantIncomeGetDto[] = [];

  constructor(
    private fb: FormBuilder,
    private absSearchClientService: AbsSearchClientControllerService,
    private formGroupService: FormGroupService<any, any>
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.setTablesData();
    this.getSalaryReceipts();
  }

  private createForm() {
    this.employmentInfoform = this.fb.group({});
    const employmentInfoControls: FormGroup = this.formGroupService.createForm(
      this.applicationData.applicant,
      this.generalInfoConfig,
      null
    );
    this.employmentInfoform.addControl(EmploymentResponseGroupKeys.GeneralInformation, employmentInfoControls);
  }

  private setTablesData() {
    if (!!this.employmentInfo) {
      this.norkIncomeInfoColTableData = new TableData(
        NORK_INCOME_INFO_PROPS,
        this.employmentInfo.argWorkDataList ? this.employmentInfo.argWorkDataList : []
      );
      this.ekengIncomeInfoColTableData = new TableData(
        EKENG_INCOME_INFO_PROPS,
        this.employmentInfo.ekengTaxResponse ? this.employmentInfo.ekengTaxResponse.ekengTaxPayerInfos : []
      );
    }

    if (this.applicantIncome) {
      this.experienceInfoColTableData = new TableData(EXPERIENCE_INFO_PROPS, this.applicantIncome);
    }
  }

  private getSalaryReceipts() {
    this.absSearchClientService
      .getAbsCardTurnover(this.applicationData.id)
      .pipe(
        tap(data => {
          data.forEach(el => {
            el.fullCormName = `${el.corpTaxPayer || ''} ${el.corpNamea || ''}`;
          });
          this.salaryReceiptsInBankInfoColTableData = new TableData(SALARY_RECEIPTS_IN_BANK_INFO_PROPS, data);
        })
      )
      .subscribe();
  }
}
