import { AdmSetPrintingFormAction, AdmUploadPrintingFormAction } from '@app/store/actions/administration.actions';
import {
  AttachmentSaveData,
  ModalData,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader,
  UploadOptions
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { pluck, takeUntil, tap } from 'rxjs/operators';

import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { MimeTypes } from '@app/components/constants/mime-types';
import { PrintingFormControllerService } from '@app/api';
import { Subject } from 'rxjs';
import { ToastService } from '@app/services/toast.service';
import { selectPrintingForms } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'print-forms-page',
  templateUrl: './print-forms-page.component.html',
  styleUrls: ['./print-forms-page.component.scss']
})
export class PrintFormsPageComponent implements OnInit, OnDestroy {
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('id', 'КОД', 'string'),
    new TableDataHeader('nameRu', 'TableHeader.Appellation', 'ru', 'nameRu'),
    new TableDataHeader('nameAm', 'TableHeader.AppellationAm', 'am', 'nameAm'),
    new TableDataHeader('isOtp', 'TableHeader.OtpSign', 'toggleDisabled', 'isOtp'),
    new TableDataHeader('cloud_upload', 'ЗАГРУЗИТЬ', 'iconButton'),
    new TableDataHeader('cloud_download', 'ВЫГРУЗИТЬ', 'iconButton')
  ];

  dataSource;
  userId: number;
  userRole: number;
  selectUserData$ = this._store.pipe(select(selectUserData));
  selectPrintingForms$ = this._store.pipe(select(selectPrintingForms));

  params: PaginationAndSortingDto;

  selectedPage: number = 0;

  itemLimit: number = 20;

  totalCount: number;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this._store.dispatch(AdmSetPrintingFormAction({ data: this.params }));
    this.selectPrintingForms$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content')
      )
      .subscribe(data => {
        this.dataSource = new TableData(
          this.objColNameProps,
          data.map(item => ({ ...item, icon_upload: 'cloud_upload', icon_download: 'cloud_download' }))
        );
      });

    this.selectUserData$.pipe(takeUntil(this.destroy)).subscribe(res => {
      this.userId = res.id;
      this.userRole = res.authorities[0].id;
    });
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this._store.dispatch(AdmSetPrintingFormAction({ data: this.params }));
  }

  selectedItem(ev: any) {
    if (ev.type === 'cloud_download') {
      const fileName = ev.rowValue.nameRu + '.docx';
      this.printingFormService
        .download(ev.rowValue.code)
        .pipe(takeUntil(this.destroy))
        .subscribe(res => {
          this.fileService.downloadFile(res, fileName);
        });
    }
    if (ev.type === 'cloud_upload') {
      if (this.userRole !== 1) {
        this.toastService.viewMsg('Вы не можете загрузить файл, так как у Вас нет прав Администратора', 'warning');
        return;
      }
      const params: ModalData = {
        accept: [MimeTypes.DOC, MimeTypes.DOCX],
        pathTitle: 'Выберите файл',
        viewSearchSelect: false,
        returnString: false
      };

      this.fileService
        .openDialog(params)
        .afterClosed()
        .subscribe((result: AttachmentSaveData | 'close') => {
          const options: UploadOptions = {
            file: (result as AttachmentSaveData).file,
            id: ev.rowValue.code,
            userId: this.userId
          };
          if (result && result !== 'close') {
            this._store.dispatch(AdmUploadPrintingFormAction({ sortAndPage: this.params, uploadFile: options }));
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
