import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  TableDataHeader,
  TableData,
  PaginationAndSortingDto,
  ApplicationByPinDto,
  CompareApplicationsDto
} from '@app/_models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationControllerService } from '@app/api';
import { pluck, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { IAppState } from '@app/store/state/app.state';
import { RetailAppRoutingModule } from '@app/components/retail-app/retail-app-routing.module';
import { Subject } from 'rxjs';

class ModalData {
  pin: string;
  applicationId: string | number;
}

@Component({
  selector: 'app-comparison-panel-modal-content',
  templateUrl: './comparison-panel-modal.component.html',
  styleUrls: ['./comparison-panel-modal.component.scss', '../../../../shared/components/modals/close-modal-btn.scss']
})
export class ComparisonPanelModalComponent implements OnInit, OnDestroy {
  applicationsColNameProps: TableDataHeader[] = [
    new TableDataHeader('applicationId', '№ ПРЕДЫДУЩЕЙ ЗАЯВКИ', 'string'),
    new TableDataHeader('created', 'ДАТА', 'date'),
    new TableDataHeader('stage.nameRu', 'ЭТАП', 'string'),
    new TableDataHeader('status.nameRu', 'СТАТУС', 'string'),
    new TableDataHeader('СРАВНИТЬ', 'СРАВНИТЬ', 'button')
  ];

  applicationsInfoData: TableData<ApplicationByPinDto> = new TableData(this.applicationsColNameProps, []);

  comparisonPanelColNameProps: TableDataHeader[] = [
    new TableDataHeader('field', 'ПОЛЕ', 'string'),
    new TableDataHeader('value', 'ЗНАЧЕНИЕ В ТЕКУЩЕЙ ЗАЯВКЕ', 'string'),
    new TableDataHeader('valuePrev', 'ЗНАЧЕНИЕ В СРАВНИВАЕМОЙ ЗАЯВКЕ', 'string')
  ];

  comparisonPanelInfoData: TableData<CompareApplicationsDto> = new TableData(this.comparisonPanelColNameProps, []);

  itemLimit: number = 20;
  totalCount: number = 1;

  params: PaginationAndSortingDto = {
    page: 0,
    size: 10
  };

  viewComparisonPanel: boolean = false;
  selectUserData$ = this._store.pipe(select(selectUserData));
  userId: RetailAppRoutingModule;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ComparisonPanelModalComponent>,
    public router: Router,
    private applicationControllerService: ApplicationControllerService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  ngOnInit(): void {
    this.applicationControllerService
      .getByPin(this.params, this.data.pin, this.data.applicationId)
      .pipe(pluck('content'))
      .subscribe(res => {
        this.applicationsInfoData = new TableData(this.applicationsColNameProps, res);
      });

    this.selectUserData$.pipe(takeUntil(this.destroy)).subscribe(res => {
      if (res && res.id) {
        this.userId = res.id.toString();
      }
    });
  }

  ngOnDestroy() {}

  compare(event: ApplicationByPinDto) {
    this.applicationControllerService
      .compareApplications(this.data.applicationId, event.id)
      .pipe(pluck('fieldDtos'))
      .subscribe(res => {
        if (!!res.length) {
          this.comparisonPanelInfoData = new TableData(this.comparisonPanelColNameProps, res);
        }
      });
  }

  selectedItem(item: ApplicationByPinDto) {
    CryptoJS.PBKDF2(item.id.toString(), this.userId.toString()).toString();
    const url = this.router.createUrlTree(['/pages/queues/stages/view', item.id]).toString();
    window.open('/#' + url, '_blank');
  }
}
