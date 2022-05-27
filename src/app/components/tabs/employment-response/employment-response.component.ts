import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { InsideInfoDto, RevenueServiceEmploymentDto, TableData, TableDataHeader } from '@app/_models';

import { EMPLOYMENT_HEADERS } from '@app/components/tabs/employment-response/constants/employment-response.constants';

@Component({
  selector: 'ng-employment-response',
  templateUrl: './employment-response.component.html',
  styleUrls: ['./employment-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentResponseComponent implements OnInit {
  incomeColumnNameProps: TableDataHeader[] = EMPLOYMENT_HEADERS;
  incomeColumnData: TableData<RevenueServiceEmploymentDto> = new TableData(this.incomeColumnNameProps, []);

  @Input() revenue: RevenueServiceEmploymentDto[];
  @Input() insideInfoDto: InsideInfoDto;

  ngOnInit(): void {
    this.setIncomeData(this.revenue);
  }

  private setIncomeData(revenue: RevenueServiceEmploymentDto[]): void {
    if (revenue && revenue.length) {
      this.incomeColumnData = new TableData(this.incomeColumnNameProps, revenue);
    }
  }
}
