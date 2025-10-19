import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReportControllerService} from "@app/api";
import {tap} from "rxjs/operators";
import {DirOnlineHistoryReportStatusDto} from "@app/pages/report/report-page/upra-report/models";
import moment from 'moment';
import {ToastService} from "@app/services/toast.service";

export interface ReportOnlineDates {
  dateFrom: Date | string;
  dateTo: Date | string;
}

@Component({
  selector: 'ngx-report-online',
  templateUrl: './report-online.component.html',
  styleUrls: ['./report-online.component.scss']
})
export class ReportOnlineComponent implements OnInit {

  isLoading = false;

  status: DirOnlineHistoryReportStatusDto;

  datesRanges = {
    minDate: getMinDate(),
    maxDate: new Date(),
  }

  onlineReportForm = new FormGroup({
    dateFrom: new FormControl('', Validators.required),
    dateTo: new FormControl('', Validators.required),
  })

  get dateFromValue() {
    return this.onlineReportForm.controls.dateFrom.value || this.datesRanges.minDate;
  }

  get isProcessing() {
    return !!this.status && this.status.id === 'PROCESSING';
  }


  get isCompleted() {
    return !!this.status && this.status.id === 'COMPLETED';
  }

  constructor(
    private toastService: ToastService,
    private reportControllerService: ReportControllerService
  ) {
  }

  ngOnInit(): void {
    // this.onlineReportForm.disable();
    this.refresh();
  }

  getReport() {
    if(this.onlineReportForm.valid) {
      this.isLoading = true;
      this.reportControllerService.getReportOnlineStart({
        dateFrom: this.formatDate(this.onlineReportForm.controls.dateFrom.value),
        dateTo: this.formatDate(this.onlineReportForm.controls.dateTo.value),
      }).pipe(tap(res => {
        this.refresh();
        this.isLoading = false;
      })).subscribe();
    } else {
      this.showError();
    }

  }

  refresh() {
    this.reportControllerService.getReportStatus().pipe(tap(res => {
      this.status = res;
      this.isLoading = false;
    })).subscribe();
  }

  download() {
    this.isLoading = true;
    this.reportControllerService.getReportOnline(() => {
      this.isLoading = false;
    })
  }

  private formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private showError = () => {
    this.toastService.viewMsg('ErrorMessage.ReportOnlineErrorDates', 'error');
  }

}


function getMinDate()  {
  const today = new Date();
  return  new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
}
