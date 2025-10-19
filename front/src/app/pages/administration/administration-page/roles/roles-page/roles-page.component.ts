import { Component, OnInit } from '@angular/core';
import { ELocalNames, TableHeader } from '@app/_models';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';

export interface PeriodicElement {
  name: boolean;
  position: string;
  weight: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Credit manager', name: true, weight: 'Acceptance of applications, data entry' },
  { position: 'Underwriter', name: true, weight: 'Application verification' },
  { position: 'Administrator', name: true, weight: 'Global access to application functionality' }
];

@Component({
  selector: 'roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent implements OnInit {
  dataSource: PeriodicElement[];
  objColNameProps: TableHeader[] = [
    {
      code: 'position',
      value: 'РОЛЬ',
      type: 'string'
    },
    {
      code: ELocalNames.NameRu,
      value: 'СТАТУС',
      type: 'status'
    },
    {
      code: 'weight',
      value: 'ОПИСАНИЕ',
      type: 'string'
    }
  ];
  changePage: Subject<number> = new Subject<number>();

  constructor() {}

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
  }

  selectedPageEvent(pageNumber: number): void {}

  sortingDataEvent(sortData: Sort): void {}

  onSearchEvent(inputVal: string): void {
    this.changePage.next(1);
  }
}
