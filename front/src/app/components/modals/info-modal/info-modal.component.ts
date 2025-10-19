import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IInfoModalConfig {
  title?: string;
  textContent?: string;
  btnConfirmName?: string;
  btnCancelName?: string;
  showClose?: boolean;
}

export enum InfoModalResult {
  'CONFIRM' = 'CONFIRM',
  'CLOSE' = 'CLOSE'
}

@Component({
  selector: 'ngx-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  showClose = true;

  constructor(
    private dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInfoModalConfig
  ) {}

  ngOnInit(): void {
    this.showClose = this.data.showClose;
  }

  confirm() {
    this.dialogRef.close(InfoModalResult.CONFIRM);
  }
}
