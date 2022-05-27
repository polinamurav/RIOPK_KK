import { Component, Input, OnInit } from '@angular/core';
import {
  TableData,
  IntegrationInterfaceDto,
  BaseFormField,
  EInputType,
  CreditInfoResponseDto,
  CreditInfoContractDto,
  CreditInfoContractGuaranteeDto,
  CreditInfoContractSubjectDto
} from '@app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  HISTORY_RESPONSE_SCORING_INFO,
  HISTORY_RESPONSE_TITLES,
  HistoryResponseGroupKeys
} from '@app/components/tabs/history-response/constants/history-response.config';
import { FormGroupService } from '@app/services/form-group.service';
import {
  CREDIT_INFO_CONTRACT,
  CREDIT_INFO_CONTRACT_GUARANTEE,
  CREDIT_INFO_CONTRACT_SUBJECTS,
  CREDIT_INFO_CONTRACT_TWO,
  CREDIT_INFO_RESPONSE
} from '@app/components/tabs/history-response/constants/history-response.constants';

@Component({
  selector: 'ng-history-response',
  templateUrl: './history-response.component.html',
  styleUrls: ['./history-response.component.scss']
})
export class HistoryResponseComponent implements OnInit {
  titles: Record<string, string> = HISTORY_RESPONSE_TITLES;
  HistoryResponseGroupKeys = HistoryResponseGroupKeys;
  scoringInfoConfig: BaseFormField[] = HISTORY_RESPONSE_SCORING_INFO;
  EInputType = EInputType;

  form: FormGroup;

  @Input() integrationInterface: IntegrationInterfaceDto;

  creditInfoColTableData: TableData<CreditInfoResponseDto> = new TableData(CREDIT_INFO_RESPONSE, []);
  arrayCreditInfoContractColTableData: TableData<CreditInfoContractDto>[] = [];
  arrayCreditInfoContractTwoColTableData: TableData<CreditInfoContractDto>[] = [];
  arrayCreditInfoContractGuaranteeColTableData: TableData<CreditInfoContractGuaranteeDto>[] = [];
  arrayCreditInfoContractSubjectColTableData: TableData<CreditInfoContractSubjectDto>[] = [];

  constructor(private fb: FormBuilder, private formGroupService: FormGroupService<any, any>) {}

  ngOnInit() {
    this.createForm();
    this.setTablesData();
  }

  private setTablesData() {
    if (!!this.integrationInterface.pinCreditInfoResponse) {
      this.creditInfoColTableData = new TableData(CREDIT_INFO_RESPONSE, [
        this.integrationInterface.pinCreditInfoResponse
      ]);
    }

    if (
      !!this.integrationInterface.pinCreditInfoResponse &&
      !!this.integrationInterface.pinCreditInfoResponse.creditInfoContracts
    ) {
      this.integrationInterface.pinCreditInfoResponse.creditInfoContracts.forEach(element => {
        if (element.totalCreditAmount == null) {
          element.totalCreditAmount = element.creditLimitAmount;
          element.totalCreditAmountCurrency = element.creditLimitAmountCurrency;
        }
        if (element.outstandingAmount == null || element.outstandingAmount == 0.0) {
          element.outstandingAmount = element.currentUndisbursedLoanAmount;
          element.outstandingAmountCurrency = element.currentUndisbursedLoanAmountCurrency;
        }
        this.arrayCreditInfoContractColTableData.push(new TableData(CREDIT_INFO_CONTRACT, [element]));
        this.arrayCreditInfoContractTwoColTableData.push(new TableData(CREDIT_INFO_CONTRACT_TWO, [element]));
        this.arrayCreditInfoContractGuaranteeColTableData.push(
          new TableData(CREDIT_INFO_CONTRACT_GUARANTEE, element.creditInfoContractGuarantees)
        );
        this.arrayCreditInfoContractSubjectColTableData.push(
          new TableData(CREDIT_INFO_CONTRACT_SUBJECTS, element.creditInfoContractSubjects)
        );
      });
    }
  }

  private createForm() {
    this.form = this.fb.group({});
    const scoringInfoControls: FormGroup = this.formGroupService.createForm(
      this.integrationInterface,
      this.scoringInfoConfig,
      null
    );

    this.form.addControl(HistoryResponseGroupKeys.ScoringInformation, scoringInfoControls);
  }
}
