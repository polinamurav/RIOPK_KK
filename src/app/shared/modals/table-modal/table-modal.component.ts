import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableHeader } from '@app/_models';

// TODO update type of interface's fields according to incomming model:
export interface IData {
  titleText: string;
  titleNumb: string;
  tableHeader: TableHeader[];
  tableContent: [];
}

@Component({
  selector: 'mat-app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {
  // TODO update types of varibles according to model from back:
  objColNameProps: TableHeader[];
  dataSource: [];
  title: string;
  number: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IData) {}

  ngOnInit() {
    this.objColNameProps = this.data.tableHeader;
    this.dataSource = this.data.tableContent;
    this.title = this.data.titleText;
    this.number = this.data.titleNumb;
  }
}
