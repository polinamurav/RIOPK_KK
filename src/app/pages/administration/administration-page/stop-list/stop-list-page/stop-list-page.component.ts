import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageDTO, PaginationAndSortingDto, StopListAbsDto, TableData, TableDataHeader } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { filter, pluck, takeUntil, tap } from 'rxjs/operators';

import { AdmSetStopListAction } from '@app/store/actions/administration.actions';
import { CredentialsService } from '@app/services/authentication';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { StopListAbsControllerService } from '@app/api';
import { ToastService } from '@app/services/toast.service';
import { selectStopList } from '@app/store/selectors/administration.selector';

@Component({
  selector: 'app-stop-list-page',
  templateUrl: './stop-list-page.component.html',
  styleUrls: ['./stop-list-page.component.scss']
})
export class StopListPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 10;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  dataSource: TableData<StopListAbsDto> = new TableData();
  changePage: Subject<number> = new Subject<number>();

  isAdmin: boolean = false;
  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;

  fileName: string = 'Стоп-листы АБС.xlsx';

  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('clnId', 'ID клиента', 'string', 'clnId'),
    new TableDataHeader('name', 'ФИО клиента', 'string', 'name'),
    new TableDataHeader('iname', 'ФИО латинскими буквами', 'string', 'iname'),
    new TableDataHeader('long_', 'Полное наименование юр.лиц', 'string', 'long'),
    new TableDataHeader('pin', 'ФИН-код', 'string', 'pin'),
    new TableDataHeader('inn', 'ИНН', 'string', 'inn'),
    new TableDataHeader('isSme', 'Клиент МСБ', 'string', 'isSme'),
    new TableDataHeader('statusListId', 'Статус', 'string', 'statusListId'),
    new TableDataHeader('address', 'Адрес', 'string', 'address'),
    new TableDataHeader('mobile', 'Мобильный телефон', 'string', 'mobile'),
    new TableDataHeader('inDate', 'Дата добавления в стоп-лист', 'date', 'inDate'),
    new TableDataHeader('comment', 'Комментарий', 'string', 'comment'),
    new TableDataHeader('stopListReason', 'Причина внесения в стоп-лист', 'string', 'stopListReason'),
    new TableDataHeader('author', 'Кем внесен', 'string', 'author')
  ];

  private selectStopList$: Observable<PageDTO<StopListAbsDto>> = this._store.pipe(select(selectStopList));
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private credentialsService: CredentialsService,
    private _store: Store<IAppState>,
    private stopListService: StopListAbsControllerService,
    private toastService: ToastService,
    private fileService: DownloadUploadFileService
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.isAdmin = this.credentialsService.isAdmin;
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;

    this.selectStopList$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(res => {
        if (!!res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params.search = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this.dispatchSortAndPaginationData();
  }

  updateStopList() {
    this.stopListService
      .update()
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        if (!!res) {
          this.toastService.viewMsg('Записи обновлены', 'success');
        } else {
          this.toastService.viewMsg('Записи не были обновлены', 'warning');
        }
      });

    this.dispatchSortAndPaginationData();
  }

  downloadExel() {
    this.stopListService
      .download()
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.fileService.downloadFile(res, this.fileName);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetStopListAction({
        data: { ...this.params }
      })
    );
  }
}
