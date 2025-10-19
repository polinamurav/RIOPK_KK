import {
  AttachmentSaveData,
  AuthState,
  ModalData,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { IAppState } from '@app/store/state/app.state';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { MimeTypes } from '@app/components/constants/mime-types';
import { ProductDiscountService } from '@app/api/product_discount.service';
import { PRODUCT_DISCOUNT_HEADERS } from '@app/pages/administration/administration-page/grocery-catalog-discounts/constants/grocery-catalog-discounts';
import { ProductDiscountDto } from '@app/_models/api-models/product-discount-dto';

@Component({
  selector: 'app-grocery-catalog-discounts-page',
  templateUrl: './grocery-catalog-discounts.component.html',
  styleUrls: ['./grocery-catalog-discounts.component.scss']
})
export class GroceryCatalogDiscountsPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  currentUserData: AuthState;
  dataSource: TableData<ProductDiscountDto>;
  objColNameProps: TableDataHeader[] = PRODUCT_DISCOUNT_HEADERS;
  language: string = this.translateService.currentLang;
  changePage: Subject<number> = new Subject<number>();
  params: PaginationAndSortingDto = {
    page: this.selectedPage,
    size: this.itemLimit.toString()
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private productDiscountService: ProductDiscountService,
    private translateService: TranslateService,
    private fileService: DownloadUploadFileService
  ) {}

  ngOnInit(): void {
    this.createLanguageSubscription();
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.getTableData();
  }

  fileServiceSelect(type: any) {
    if (type === 'downloadExel') {
      const fileName = 'Продуктовый каталог Скидки' + '.xlsx';
      this.productDiscountService
        .download()
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.fileService.downloadFile(res, fileName);
        });
    }
    if (type === 'uploadExel') {
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
            this.productDiscountService
              .upload(result)
              .pipe(
                tap(() => {
                  this.getTableData();
                })
              )
              .subscribe();
          }
        });
    }
  }

  getTableData(): void {
    this.productDiscountService.getByPage(this.params).subscribe(productData => {
      if (productData) {
        this.totalCount = productData.totalElements;
        this.dataSource = new TableData(this.objColNameProps, productData.content as any);
      }
    });
  }

  selectedItem(e: any) {}

  sortingDataEvent(e: any) {}

  private createLanguageSubscription() {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang: LangChangeEvent) => (this.language = lang.lang));
  }
}
