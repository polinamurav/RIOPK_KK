import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsFirstPayDateRsDto } from '@app/_models';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'ngx-abs-first-pay-date-modal',
  templateUrl: './abs-first-pay-date-modal.component.html',
  styleUrls: ['./abs-first-pay-date-modal.component.scss']
})
export class AbsFirstPayDateModalComponent implements OnInit {
  emitData: EventEmitter<string> = new EventEmitter<string>();

  firstPayDateControl = new FormControl();
  firstPayDateCheckboxControl = new FormControl(true);

  constructor(
    private dialogRef: MatDialogRef<AbsFirstPayDateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public config: AbsFirstPayDateRsDto
  ) {}

  get formatDate(): string {
    return moment(this.firstPayDateControl.value).format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.setDate();
  }

  save() {
    this.emitData.emit(this.formatDate);
    this.dialogRef.close();
  }

  private setDate = (): void => {
    this.firstPayDateControl.setValue(new Date(this.config.date));
    this.firstPayDateControl.disable();

    this.firstPayDateCheckboxControl.valueChanges
      .pipe(
        tap(val => {
          if (val) {
            this.firstPayDateControl.disable();
          } else {
            this.firstPayDateControl.enable();
          }
        })
      )
      .subscribe();
  };
}
