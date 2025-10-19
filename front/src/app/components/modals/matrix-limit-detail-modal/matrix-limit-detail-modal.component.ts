import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Brms2MatrixFrontControllerService } from '@app/api';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import {
  BrmsApplicationCoefficientDto,
  BrmsApplicationCoefficientPosDto,
  BrmsProductCoefficientDto
} from '@app/_models/api-models/brms';
import { TableData } from '@app/_models';
import { MATRIX_LIMIT_DETAIL_HEADERS } from '@app/components/tabs/brms-decision/constants/brms-decision.constants';
import {TranslateService} from "@ngx-translate/core";

enum DetailPosEnum {
  ZP = 'ЗП',
  LNKI = 'КИ',
  POS = 'POS',
  MORTGAGE_AUTO = 'Авто/Ипотека'
}

@Component({
  selector: 'ngx-matrix-limit-detail-modal',
  templateUrl: './matrix-limit-detail-modal.component.html',
  styleUrls: ['./matrix-limit-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixLimitDetailModalComponent implements OnInit {
  matrixLimit: BrmsApplicationCoefficientDto;
  matrixLimitPos: BrmsApplicationCoefficientPosDto;
  limitTable: any[] = [];

  DetailPosEnum = DetailPosEnum;

  isPosDetail = true;

  matrixLimitDetailHeaders = MATRIX_LIMIT_DETAIL_HEADERS;
  limitTableConfigData: TableData<BrmsProductCoefficientDto> = new TableData(this.matrixLimitDetailHeaders, []);

  constructor(
    private translateService: TranslateService,
    private readonly brms2MatrixService: Brms2MatrixFrontControllerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef
  ) {}

  get currentLang() {
    return this.translateService.currentLang;
  }

  ngOnInit(): void {
    this.isPosDetail = this.data.applicationData.isPos;
    this.isPosDetail ? this.getPosLimits() : this.getLimits();
    this.cd.markForCheck();
  }

  private getLimits() {
    this.brms2MatrixService
      .getMatrixLimitDetail(this.data.applicationId, this.data.brmsDecisionType)
      .pipe(
        tap(data => {
          this.matrixLimit = data;
          this.prepareDataForTable();
          this.cd.markForCheck();
        })
      )
      .subscribe();
  }

  private getPosLimits() {
    this.brms2MatrixService
      .getMatrixLimitDetailPos(this.data.applicationId)
      .pipe(
        tap(data => {
          this.matrixLimitPos = data;
          this.cd.markForCheck();
        })
      )
      .subscribe();
  }

  private prepareDataForTable() {
    const limit = this.matrixLimit.productCoefficients;
    Object.keys(limit).forEach((key, index, arr) => {
      this.limitTable.push(limit[key]);
    });
    this.limitTableConfigData = new TableData(this.matrixLimitDetailHeaders, this.limitTable);
  }
}
