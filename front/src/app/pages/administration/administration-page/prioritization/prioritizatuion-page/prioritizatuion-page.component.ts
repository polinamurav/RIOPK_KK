import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableDataHeader, TableData, Directory, PageDTO, PaginationAndSortingDto, ProductDto } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { Observable, Subject } from 'rxjs';
import { tap, filter, pluck, takeUntil } from 'rxjs/operators';
import { selectSalesChanel, selectProduct } from '@app/store/selectors/administration.selector';
import { AdmSetSalesChanelAction, AdmSetProductAction } from '@app/store/actions/administration.actions';

@Component({
  selector: 'app-prioritizatuion-page',
  templateUrl: './prioritizatuion-page.component.html',
  styleUrls: ['./prioritizatuion-page.component.scss']
})
export class PrioritizatuionPageComponent implements OnInit, OnDestroy {
  totalSalesChannelCount: number;
  selectedSalesChannelPage: number = 1;

  totalProductCount: number;
  selectedProductPage: number = 1;

  itemLimit: number = 10;

  salesChannelData: TableData<Directory>;
  productData: TableData<ProductDto>;

  salesChannelColNameProps: TableDataHeader[] = [
    new TableDataHeader('code', 'КОД', 'string', 'code'),
    new TableDataHeader('nameRu', 'НАИМЕНОВАНИЕ', 'string', 'nameRu'),
    new TableDataHeader('value', 'ЗНАЧЕНИЕ', 'string', 'value'),
    new TableDataHeader('priority', 'ПРИОРИТЕТ', 'string', 'priority'),
    new TableDataHeader('limit', 'ЛИМИТ', 'string', 'limit'),
    new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
    new TableDataHeader('changedByUsername', 'КЕМ ИЗМЕНЕНО', 'string', 'changedByUsername'),
    new TableDataHeader('updated', 'ДАТА ИЗМЕНЕНИЯ', 'string', 'updated')
  ];

  productColNameProps: TableDataHeader[] = [
    new TableDataHeader('code', 'КОД', 'string', 'code'),
    new TableDataHeader('nameRu', 'НАИМЕНОВАНИЕ', 'string', 'nameRu'),
    new TableDataHeader('nameAm', 'НАИМЕНОВАНИЕ AM', 'string', 'nameAm'),
    new TableDataHeader('priority', 'ПРИОРИТЕТ', 'string', 'priority'),
    new TableDataHeader('absCode', 'КОД ЦФТ', 'string', 'absCode'),
    new TableDataHeader('active', 'АКТИВНО', 'status', 'active'),
    new TableDataHeader('changedByUsername', 'КЕМ ИЗМЕНЕНО', 'string', 'changedByUsername'),
    new TableDataHeader('updated', 'ДАТА ИЗМЕНЕНИЯ', 'string', 'updated')
  ];

  private paramsSalesChannel: PaginationAndSortingDto;
  private paramsProduct: PaginationAndSortingDto;

  private selectSalesChanel$: Observable<PageDTO<Directory>> = this._store.pipe(select(selectSalesChanel));
  private selectProduct$: Observable<PageDTO<ProductDto>> = this._store.pipe(select(selectProduct));
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _store: Store<IAppState>) {
    this.paramsSalesChannel = { page: this.selectedSalesChannelPage - 1, size: this.itemLimit };
    this.paramsProduct = { page: this.selectedProductPage - 1, size: this.itemLimit };
    this.dispatchSortAndPaginationSalesChanelAction();
    this.dispatchSortAndPaginationProductAction();
  }

  ngOnInit() {
    this.selectSalesChanel$
      .pipe(
        tap(res => {
          this.totalSalesChannelCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        if (res) {
          this.salesChannelData = new TableData(this.salesChannelColNameProps, res);
        }
      });

    this.selectProduct$
      .pipe(
        tap(res => {
          this.totalProductCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        if (res) {
          this.productData = new TableData(this.productColNameProps, res);
        }
      });
  }

  selectedSalesChannelItem(item: Directory) {}

  selectedProductItem(item: ProductDto) {}

  selectedSalesChannelPageEvent(pageNumber: number) {
    this.selectedSalesChannelPage = pageNumber - 1;
    this.paramsSalesChannel = {
      page: this.selectedSalesChannelPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationSalesChanelAction();
  }

  selectedProductPageEvent(pageNumber: number) {
    this.selectedProductPage = pageNumber - 1;
    this.paramsProduct = {
      page: this.selectedProductPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationProductAction();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private dispatchSortAndPaginationSalesChanelAction() {
    this._store.dispatch(AdmSetSalesChanelAction({ data: this.paramsSalesChannel }));
  }

  private dispatchSortAndPaginationProductAction() {
    this._store.dispatch(AdmSetProductAction({ data: this.paramsProduct }));
  }
}
