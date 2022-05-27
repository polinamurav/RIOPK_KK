import {
  ApplicationPagedInfoDto,
  AttachmentSaveData,
  ModalData,
  PaginationAndSortingDto,
  PreapprovedUpload,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PreapprovedUploadSetAction,
  PreapprovedUploadUploadAction
} from '@app/store/actions/preapproved-upload.actions';
import { Store, select } from '@ngrx/store';
import { finalize, pluck, tap } from 'rxjs/operators';

import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { IAppState } from '@app/store/state/app.state';
import { MimeTypes } from '@app/components/constants/mime-types';
import { PREAPPROVED_HEADERS } from '../constants/preapproved-upload-headers';
import { PreapprovedUploadControllerService } from '@app/api';
import { Subject } from 'rxjs';
import { selectPreapprovedUpload } from '@app/store/selectors/preapproved-upload.selectors';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-preapproved-upload-table',
  templateUrl: './preapproved-upload-table.component.html',
  styleUrls: ['./preapproved-upload-table.component.scss']
})
export class PreapprovedUploadTableComponent implements OnInit, OnDestroy {
  public dataLoading: boolean;
  public changePage: Subject<number> = new Subject<number>();

  public objColNameProps: TableDataHeader[] = PREAPPROVED_HEADERS;
  public dataSource: TableData<ApplicationPagedInfoDto> = new TableData();
  public totalCount: number = 0;
  public itemLimit: number = 15;
  public params: PaginationAndSortingDto = {
    page: 0,
    size: this.itemLimit
  };

  private _downloadFileLoading: boolean;
  private _preapprovedUpload$ = this._store.pipe(select(selectPreapprovedUpload));

  constructor(
    private _store: Store<IAppState>,
    private downloadUploadFileService: DownloadUploadFileService,
    private preapprovedUploadService: PreapprovedUploadControllerService
  ) {
    this.dispatchData();
  }

  ngOnInit(): void {
    this.dataSource = new TableData(this.objColNameProps, []);
  }

  ngOnDestroy(): void {}

  selectedPageEvent(pageNumber: number): void {
    this.params.page = pageNumber - 1;
    this.dispatchData();
  }

  linkEvent(attachment: PreapprovedUpload) {
    this.downloadFile(attachment);
  }

  uploadExcel() {
    const params: ModalData = {
      accept: [MimeTypes.XLS, MimeTypes.XLSX],
      pathTitle: 'Выберите файл типа xls/xlsx,',
      returnString: false
    };

    this.downloadUploadFileService
      .openDialog(params)
      .afterClosed()
      .subscribe((result: AttachmentSaveData | 'close') => {
        if (result && result !== 'close') {
          const options = {
            file: result.file
          };
          this.dataLoading = true;
          this._store.dispatch(PreapprovedUploadUploadAction({ data: { ...this.params }, uploadFile: options }));
        }
      });
  }

  private downloadFile(attachment: PreapprovedUpload) {
    if (!this._downloadFileLoading) {
      this._downloadFileLoading = true;
      this.preapprovedUploadService
        .download(attachment.id)
        .pipe(finalize(() => (this._downloadFileLoading = false)))
        .subscribe(value => {
          this.downloadUploadFileService.downloadFile(value, attachment.fileName);
        });
    }
  }

  private dispatchData() {
    this._store.dispatch(PreapprovedUploadSetAction({ data: { ...this.params } }));

    this._preapprovedUpload$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.dataSource = new TableData(this.objColNameProps, res);
        this.dataLoading = false;
      });
  }
}
