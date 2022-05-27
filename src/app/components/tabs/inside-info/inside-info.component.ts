import {Component, OnInit, Input} from '@angular/core';
import {
  TableData,
  IntegrationInterfaceDto,
  InternalLoanDto,
  AbsClientInfoRelateDto
} from '@app/_models';
import {INSIDE_INFO_TITLES, InsideInfoGroupKeys} from "@app/components/tabs/inside-info/constants/inside-info.config";
import {
  INTERNAL_LOAN_HISTORY,
  OVERDUE_PAYMENT_INFO,
  RELATED_PERSONS
} from "@app/components/tabs/inside-info/constants/inside-info.constants";

@Component({
  selector: 'ng-inside-info',
  templateUrl: './inside-info.component.html',
  styleUrls: ['./inside-info.component.scss']
})
export class InsideInfoComponent implements OnInit {
  @Input() integrationInterface: IntegrationInterfaceDto;

  titles: Record<string, string> = INSIDE_INFO_TITLES;
  InsideInfoGroupKeys = InsideInfoGroupKeys;

  relatedPersonsColTableData: TableData<AbsClientInfoRelateDto> = new TableData(RELATED_PERSONS, []);
  arrayInternalLoanHistoryColTableData: TableData<InternalLoanDto>[] = [];
  arrayOverduePaymentInfoColTableData: TableData<InternalLoanDto>[] = [];

  constructor() {}

  ngOnInit() {
    if (!!this.integrationInterface.internalLoanListResponseDto) {
      this.integrationInterface.internalLoanListResponseDto.internalLoans.forEach((element) => {
        this.arrayInternalLoanHistoryColTableData.push(new TableData(INTERNAL_LOAN_HISTORY, [element]));
        this.arrayOverduePaymentInfoColTableData.push(new TableData(OVERDUE_PAYMENT_INFO, [element]));
      });
      this.relatedPersonsColTableData = new TableData(RELATED_PERSONS, this.integrationInterface.absClientInfoResponseDto.RELATE_PERSONS);
    }
  }
}
