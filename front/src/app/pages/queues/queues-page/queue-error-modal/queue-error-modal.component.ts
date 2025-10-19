import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationPagedInfoDto } from '@app/_models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-queue-error-modal',
  templateUrl: './queue-error-modal.component.html',
  styleUrls: ['./queue-error-modal.component.scss']
})
export class QueueErrorModalComponent implements OnInit {
  title: string;
  errorMessage: string;

  constructor(
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<QueueErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationPagedInfoDto
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    this.onChangeLang();
  }

  onChangeLang = (): void => {
    this.title = this.data.statusId === 'DECLINE' ? 'ErrorMessage.Refusal' : 'ErrorMessage.Error';

    this.errorMessage =
      this.translateService.currentLang === 'am'
        ? this.data.errorMessage || this.data.nameAmForCreditManager
        : this.data.errorMessage || this.data.nameRuForCreditManager;
  };
}
