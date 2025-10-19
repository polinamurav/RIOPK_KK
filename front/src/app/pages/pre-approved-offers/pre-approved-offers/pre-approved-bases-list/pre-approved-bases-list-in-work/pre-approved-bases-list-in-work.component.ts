import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PreApprovedBasesListDataService } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';
import { PreapproveBaseDto } from '@app/_models/api-models/preapprove-base-dto';

@Component({
  selector: 'ngx-pre-approved-bases-list-in-work',
  templateUrl: './pre-approved-bases-list-in-work.component.html',
  styleUrls: ['./pre-approved-bases-list-in-work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreApprovedBasesListInWorkComponent implements OnInit {
  constructor(private readonly preApprovedBasesListDataService: PreApprovedBasesListDataService) {}

  get tableData() {
    return this.preApprovedBasesListDataService.preapproveBaseInWorkTable;
  }

  get selectedBase() {
    return this.preApprovedBasesListDataService.selectedBase;
  }

  get baseListLoading$() {
    return this.preApprovedBasesListDataService.baseListLoading$;
  }

  ngOnInit(): void {}

  selectedItem(base: PreapproveBaseDto) {
    this.preApprovedBasesListDataService.setBase(base);
  }
}
