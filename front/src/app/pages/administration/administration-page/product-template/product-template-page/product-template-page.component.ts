import { Component, OnDestroy, OnInit } from '@angular/core';
import { AttachmentSaveData, AuthState, ModalData, TableData, TableDataHeader } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { productTemplates } from '@app/store/selectors/administration.selector';
import { IAppState } from '@app/store/state/app.state';
import { DirCompetenceLevel } from '@app/_models/api-models/dir-competence-level';
import { untilDestroyed } from '@app/core';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PRODUCT_TEMPLATE_HEADERS } from '@app/pages/administration/administration-page/product-template/product-template.constants';
import { MimeTypes } from '@app/components/constants/mime-types';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { ProductTemplateAction } from '@app/store/actions/administration.actions';
import { ProductTemplateService } from '@app/api/product-template.service';
import { HttpResponse } from '@angular/common/http';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';
import { CredentialsService } from '@app/services/authentication';

@Component({
  selector: 'ngx-product-template-page',
  templateUrl: './product-template-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class ProductTemplatePageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  objColNameProps: TableDataHeader[] = PRODUCT_TEMPLATE_HEADERS;

  public dataSource: TableData<any>;

  public userRole: number;
  private userName: string;

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private productTemplatesData$ = this._store.pipe(select(productTemplates));

  constructor(
    private productTemplateService: ProductTemplateService,
    private fileService: DownloadUploadFileService,
    protected readonly credentialsService: CredentialsService,
    private _store: Store<IAppState>
  ) {
    super(credentialsService);
  }

  ngOnInit(): void {
    this.getList();
    this.getDataAndDirectories();
  }

  ngOnDestroy() {}

  downloadExel() {
    this.productTemplateService.download().subscribe((res: HttpResponse<Blob>) => {
      this.fileService.saveFileAsBinary(res);
    });
  }

  uploadExel() {
    const params: ModalData = {
      accept: [MimeTypes.XLS, MimeTypes.XLSX],
      pathTitle: 'Modals.Buttons.ChooseFile',
      returnString: false
    };

    this.fileService
      .openDialog(params)
      .afterClosed()
      .subscribe((result: AttachmentSaveData | 'close') => {
        if (result && result !== 'close') {
          this.productTemplateService
            .upload(result)
            .pipe(
              tap(() => {
                this._store.dispatch(ProductTemplateAction(null));
              })
            )
            .subscribe();
        }
      });
  }

  private getDataAndDirectories() {
    combineLatest([this.selectUserData$])
      .pipe(untilDestroyed(this))
      .subscribe(([userData]) => {
        this.getCurrentUser(userData);
      });
  }

  private getCurrentUser(userData: AuthState) {
    if (userData && userData.username) {
      this.userName = userData.username;
      this.userRole = userData.authorities[0].id;
    }
  }

  private getList() {
    this._store.dispatch(ProductTemplateAction(null));
    this.productTemplatesData$.pipe(tap(this.setTableData)).subscribe();
  }

  private setTableData = (data: DirCompetenceLevel[]): void => {
    if (data) {
      this.dataSource = new TableData(this.objColNameProps, data);
    }
  };
}
