import { Component, OnInit } from '@angular/core';
import { PreApprovedBasesListDataService } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';
import { PreapproveBaseDto } from '@app/_models/api-models/preapprove-base-dto';

@Component({
  selector: 'ngx-pre-approved-bases-list-active',
  templateUrl: './pre-approved-bases-list-active.component.html',
  styleUrls: ['./pre-approved-bases-list-active.component.scss']
})
export class PreApprovedBasesListActiveComponent implements OnInit {
  constructor(private readonly preApprovedBasesListDataService: PreApprovedBasesListDataService) {}

  get tableData() {
    return this.preApprovedBasesListDataService.preapproveBaseInActivatedTable;
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

  deactivate(event: PreapproveBaseDto) {
    this.preApprovedBasesListDataService.deactivateBase(event);
  }
}
