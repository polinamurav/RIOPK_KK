import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DirectoriesService, ReportControllerService } from '@app/api';
import {tap} from "rxjs/operators";
import {DirOnlineHistoryReportStatusDto} from "@app/pages/report/report-page/upra-report/models";
import moment from 'moment';
import {ToastService} from "@app/services/toast.service";
import { EInputType, ELocalNames, ValueType } from '@app/_models';
import { PosUsersResourceService } from '@app/api/pos-users-resource.service';
import {TradingCompaniesService} from '@app/api/trading-companies.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  DirTradingCompanyPointDto
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { TradingCompanyPointsService } from '@app/api/trading-company-points.service';
import { TranslateService } from '@ngx-translate/core';

export interface posReportStartDto {
  dateFrom: Date | string;
  dateTo: Date | string;
  applicationStatusId?: string;
  dirTradingCompanyId?: number;
  dirTradingCompanyPointId?: number;
  managerId?: number;
  ttuserId?: number;
}

@Component({
  selector: 'ngx-report-pos',
  templateUrl: './report-pos.component.html',
  styleUrls: ['./report-pos.component.scss']
})
export class ReportPosComponent implements OnInit {

  ValueType = ValueType;
  isLoading = false;
  language: string = this.translateService.currentLang;

  status: DirOnlineHistoryReportStatusDto;

  datesRanges = {
    minDate: null,
    maxDate: new Date(),
  }

  posReportForm = new FormGroup({
    dateFrom: new FormControl(null, Validators.required),
    dateTo: new FormControl(null, Validators.required),
    applicationStatusId: new FormControl(null),
    dirTradingCompanyId: new FormControl(null),
    dirTradingCompanyPointId: new FormControl(null),
    managerId: new FormControl(null),
    ttuserId: new FormControl(null)
  })

  optionsList: Record<string, any[]> = {
    applicationStatusId: [],
    dirTradingCompanyId: [],
    dirTradingCompanyPointId: [],
    managerId: [],
    ttuserId: []
  };

  private allTTUsers: any[] = [];
  private allPoints: any[] = [];

  get dateFromValue() {
    return this.posReportForm.controls.dateFrom.value || this.datesRanges.minDate;
  }

  get isProcessing() {
    return !!this.status && this.status.id === 'PROCESSING';
  }


  get isCompleted() {
    return !!this.status && this.status.id === 'COMPLETED';
  }

  constructor(
    private toastService: ToastService,
    private reportControllerService: ReportControllerService,
    private tradingCompaniesService: TradingCompaniesService,
    private tradingCompanyPointsService: TradingCompanyPointsService,
    private posUsersResourceService: PosUsersResourceService,
    private directoriesService: DirectoriesService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    // this.posReportForm.disable();
    this.refresh();
    this.loadInitialData();

    this.posReportForm.get('dirTradingCompanyId').valueChanges.subscribe(company => {
      const companyId = company && company.id ? company.id : company;
      this.filterPointsByCompany(companyId);
      this.optionsList.ttuserId = this.allTTUsers;
    });

    this.posReportForm.get('dirTradingCompanyPointId').valueChanges.subscribe(point => {
      const pointId = point && point.id ? point.id : point;
      this.filterUsersByPoint(pointId);
    });
  }

  getReport() {
    if(this.posReportForm.valid) {
      this.isLoading = true;
      const formValue = this.posReportForm.value;

      this.reportControllerService.getReportPosStart({
        dateFrom: this.formatDate(this.posReportForm.controls.dateFrom.value),
        dateTo: this.formatDate(this.posReportForm.controls.dateTo.value),
        applicationStatusId: formValue.applicationStatusId && formValue.applicationStatusId.id
          ? formValue.applicationStatusId.id
          : formValue.applicationStatusId,
        dirTradingCompanyId: formValue.dirTradingCompanyId && formValue.dirTradingCompanyId.id
          ? formValue.dirTradingCompanyId.id
          : formValue.dirTradingCompanyId,
        dirTradingCompanyPointId: formValue.dirTradingCompanyPointId && formValue.dirTradingCompanyPointId.id
          ? formValue.dirTradingCompanyPointId.id
          : formValue.dirTradingCompanyPointId,
        managerId: formValue.managerId && formValue.managerId.id
          ? formValue.managerId.id
          : formValue.managerId,
        ttuserId: formValue.ttuserId && formValue.ttuserId.id
          ? formValue.ttuserId.id
          : formValue.ttuserId,
      }).pipe(tap(res => {
        this.refresh();
        this.isLoading = false;
      })).subscribe();
    } else {
      this.showError();
    }

  }

  refresh() {
    this.reportControllerService.getPosReportStatus().pipe(tap(res => {
      this.status = res;
      this.isLoading = false;
    })).subscribe();
  }

  download() {
    this.isLoading = true;
    this.reportControllerService.getReportPos(() => {
      this.isLoading = false;
    })
  }

  private filterPointsByCompany(companyId: number | null) {
    if (!companyId) {
      this.optionsList.dirTradingCompanyPointId = this.allPoints;
      return;
    }

    this.optionsList.dirTradingCompanyPointId = this.allPoints.filter(point => {
        return point.dirTradingCompany && point.dirTradingCompany.id === companyId;
      }
    );
  }

  private filterUsersByPoint(pointId: number | null) {
    if (!pointId) {
      this.optionsList.ttuserId = this.allTTUsers;
      return;
    }

    this.optionsList.ttuserId = this.allTTUsers.filter(user =>
      user.points && user.points.some(point => point.id === pointId)
    );

    this.posReportForm.get('ttuserId').setValue(null);
  }

  private loadInitialData() {
    combineLatest([
      this.directoriesService.getStatusReportsDir(), // статус
      this.tradingCompaniesService.getList(), // торговые компании
      this.tradingCompanyPointsService.getList(), // торговые точки
      this.posUsersResourceService.getPosRegManager(), // pos менеджер
      this.posUsersResourceService.getPosTTUser(), // tt
    ]).pipe(
      tap(([applicationStatusId, dirTradingCompanyId, dirTradingCompanyPointId, managerId, ttuserId]) => {
        dirTradingCompanyId.forEach(company => {
          company.companyName = `${company.code} ${company.companyName || ''}`;
        })

        managerId = managerId.map(manager => ({
          ...manager,
          fio: `${manager.lastName || ''} ${manager.firstName || ''} ${manager.patronymic || ''}`
        }));

        this.allTTUsers = ttuserId.map(tt => ({
          ...tt,
          fio: `${tt.lastName || ''} ${tt.firstName || ''} ${tt.patronymic || ''}`
        }));

        this.allPoints = this.pointsRemap(dirTradingCompanyPointId);

        this.optionsList = {
          ...this.optionsList,
          applicationStatusId,
          dirTradingCompanyId,
          dirTradingCompanyPointId: this.allPoints,
          managerId,
          ttuserId: this.allTTUsers
        };
      })
    ).subscribe();
  }

  private pointsRemap = (data: DirTradingCompanyPointDto[]) => {
    return data.map(d => {
      return {
        ...d,
        nameAm: `${d.code} ` + (d.nameAm || '') + ` ${d.address || ''}`,
        nameRu: `${d.code} ` + (d.nameRu || '') + ` ${d.address || ''}`,
      }
    });
  }

  private formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private showError = () => {
    this.toastService.viewMsg('ErrorMessage.ReportOnlineErrorDates', 'error');
  }

  get maxDateTo() {
    const dateFrom = this.posReportForm.controls.dateFrom.value;
    if (!dateFrom) {
      return this.datesRanges.maxDate;
    }

    const dateFromPlus = moment(dateFrom).add(2, 'month').toDate();
    const currentDate = new Date();

    return dateFromPlus < currentDate ? dateFromPlus : currentDate;
  }

  protected readonly ELocalNames = ELocalNames;
  protected readonly EInputType = EInputType;
}
