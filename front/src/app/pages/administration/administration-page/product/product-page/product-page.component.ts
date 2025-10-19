import {
  AdmCreateProductAction,
  AdmSetProductAction,
  AdmUpdateProductAction
} from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import {
  AuthState,
  Dir,
  DirAbsCode,
  EmptyProductResDto,
  PageDTO,
  PaginationAndSortingDto,
  ProductDto,
  ProductResDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirSalesChannelControllerService, ProductCategoryControllerService, SegmentControllerService } from '@app/api';
import { Observable, Subject, forkJoin } from 'rxjs';
import {
  PRODUCT_FORM,
  PRODUCT_HEADERS
} from '@app/pages/administration/administration-page/product/constants/product.constants';
import { Store, select } from '@ngrx/store';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { ProductGroupControllerService } from '@app/api/massegment-api';
import { Sort } from '@angular/material/sort';
import { selectProduct } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { DirAccountProductControllerService } from '@app/api/dir-account-product-controller.service';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';
import { CredentialsService } from '@app/services/authentication';

type Options = ProductDto | Dir | DirProductGroup | DirAbsCode;

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 1;
  itemLimit: number = 20;
  currentUserData: AuthState;
  dataSource: TableData<ProductDto>;
  objColNameProps: TableDataHeader[] = PRODUCT_HEADERS;

  private newProductData: ProductResDto | any = new EmptyProductResDto();
  private selectProduct$: Observable<PageDTO<ProductDto>> = this._store.pipe(select(selectProduct));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private params: PaginationAndSortingDto;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private optionsList: Record<string, Options[]> = {
    productGroupList: [],
    segmentsList: [],
    channelsList: [],
    accountProductList: []
  };

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private productCategoryControllerService: ProductCategoryControllerService,
    private segmentControllerService: SegmentControllerService,
    private productGroupService: ProductGroupControllerService,
    protected readonly credentialsService: CredentialsService,
    private dirSalesChannelService: DirSalesChannelControllerService,
    private dirAccountProductControllerService: DirAccountProductControllerService
  ) {
    super(credentialsService);
    this.params = { page: this.selectedPage - 1, size: this.itemLimit };
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit() {
    this.getTableData();
    this.setOptionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTableData(): void {
    this.selectProduct$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        switchMap(res => {
          return this.selectCurrentUserData$.pipe(map(userData => ({ res, userData })));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ res, userData }) => {
        this.currentUserData = userData;
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  setOptionsList(): void {
    forkJoin([
      this.productGroupService.getList(),
      this.segmentControllerService.getList(),
      this.dirSalesChannelService.getList(),
      this.dirAccountProductControllerService.getList()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([productGroupList, segmentList, channelsList, accountProductList]) => {
        this.optionsList.productGroupList = productGroupList;
        this.optionsList.segmentsList = segmentList;
        this.optionsList.channelsList = channelsList;
        this.optionsList.accountProductList = accountProductList;
      });
  }

  selectedItem(product: ProductDto) {
    const productRes: ProductResDto = new ProductResDto(product);

    console.log('productRes', productRes);

    this.showDialog(
      {
        title: 'Administration.Titles.EditProduct',
        dataInfo: productRes,
        formConfig: PRODUCT_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (val: ProductDto | ProductResDto | any) => {
        this._store.dispatch(
          AdmUpdateProductAction({
            paginationData: this.params,
            data: {
              paymentDays: product.paymentDays,
              scheduleFreq: product.scheduleFreq,
              scheduleTypes: product.scheduleTypes,
              segments: product.segments,
              ...val,
              updated: new Date(),
              changedByUsername: this.currentUserData.username,
              id: product.id
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationAction();
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      sort: sortStr
    };
    this.dispatchSortAndPaginationAction();
  }

  openNewProductDialog() {
    this.showDialog(
      {
        title: 'Administration.Titles.NewProduct',
        dataInfo: this.newProductData,
        formConfig: PRODUCT_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (productBeforeRequest: ProductDto | ProductResDto | any) => {
        this._store.dispatch(
          AdmCreateProductAction({
            paginationData: this.params,
            data: {
              ...this.newProductData,
              ...productBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  private showDialog(
    data: AdministrationBaseModalData<ProductResDto, Options>,
    callback: (val: ProductResDto) => void
  ) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private dispatchSortAndPaginationAction() {
    this._store.dispatch(AdmSetProductAction({ data: this.params }));
  }
}
