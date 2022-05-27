import {
  AdmCreateDiscountConditionAction,
  AdmSetDiscountConditionAction,
  AdmUpdateDiscountConditionAction
} from './../../../../../store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirSalesChannelControllerService, ProductCategoryControllerService, SegmentControllerService } from '@app/api';
import {
  Directory,
  EmptyProductDiscountConditionDto,
  PaginationAndSortingDto,
  ProductDiscountCondition,
  ProductDiscountConditionDto,
  ProductRes,
  Segment,
  TableData,
  TableDataHeader
} from '@app/_models';
import { PRODUCT_DISCOUNT_FORM, PRODUCT_DISCOUNT_HEADERS } from '../constants/product-discount.constants';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest } from 'rxjs';
import { filter, pluck, tap } from 'rxjs/operators';

import { AuthState } from './../../../../../_models/api-models/user';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { selectDiscountCondition } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

type Options = ProductRes | Directory | Segment;

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class ProductDiscountComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = PRODUCT_DISCOUNT_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private userName: string;
  private emptyProductDiscountConditionDto: EmptyProductDiscountConditionDto = new EmptyProductDiscountConditionDto();
  private optionsList: Record<string, Options[]> = {
    productCategory: [],
    salesChanel: [],
    segment: []
  };

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private discountCondition$ = this._store.pipe(select(selectDiscountCondition));

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private productCategoryService: ProductCategoryControllerService,
    private dirSalesChannelService: DirSalesChannelControllerService,
    private segmentService: SegmentControllerService
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getDiscountCondition();
    this.getDataAndDirectories();
  }

  ngOnDestroy(): void {}

  selectedItem(item: ProductDiscountCondition) {
    const itemDto: ProductDiscountConditionDto = new ProductDiscountConditionDto(item);

    this.showDialog(
      {
        title: 'Administration.Titles.EditDiscount',
        dataInfo: itemDto,
        formConfig: PRODUCT_DISCOUNT_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList
      },
      (data: ProductDiscountConditionDto) => {
        this._store.dispatch(
          AdmUpdateDiscountConditionAction({
            paginationData: { ...this.params },
            data: {
              ...item,
              ...data,
              changedByUsername: this.userName,
              updated: new Date()
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this._store.dispatch(AdmSetDiscountConditionAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Administration.Titles.CreateDiscount',
        dataInfo: this.emptyProductDiscountConditionDto,
        formConfig: PRODUCT_DISCOUNT_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: ProductDiscountConditionDto) => {
        this._store.dispatch(
          AdmCreateDiscountConditionAction({
            paginationData: { ...this.params },
            data: {
              ...this.emptyProductDiscountConditionDto,
              ...data,
              created: new Date(),
              changedByUsername: this.userName,
              updated: null
            }
          })
        );
      }
    );
  }

  showDialog(data: AdministrationBaseModalData<ProductDiscountConditionDto, Options>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  getDataAndDirectories() {
    combineLatest([
      this.selectUserData$,
      this.productCategoryService.getAllActive(),
      this.dirSalesChannelService.getList(),
      this.segmentService.getList()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([userData, productCategory, salesChanel, segment]) => {
        this.getCurrentUser(userData);
        this.optionsList.productCategory = productCategory;
        this.optionsList.salesChanel = salesChanel;
        this.optionsList.segment = segment;
      });
  }

  private getDiscountCondition() {
    this.discountCondition$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  private getCurrentUser(userData: AuthState) {
    if (userData && userData.username) {
      this.userName = userData.username;
      this.userRole = userData.authorities[0].id;
    }
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetDiscountConditionAction({
        data: { ...this.params }
      })
    );
  }
}
