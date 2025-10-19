import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PreApprovedBasesListDataService } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';

@Component({
  selector: 'ngx-pre-approved-bases-list',
  templateUrl: './pre-approved-bases-list.component.html',
  styleUrls: ['./pre-approved-bases-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreApprovedBasesListComponent implements OnInit {
  constructor(private readonly preApprovedBasesListDataService: PreApprovedBasesListDataService) {}

  ngOnInit(): void {
    this.preApprovedBasesListDataService.init();
  }
}
