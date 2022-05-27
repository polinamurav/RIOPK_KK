import {Component, OnDestroy, OnInit} from "@angular/core";
import {
  AuthState,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader
} from "@app/_models";
import {select, Store} from "@ngrx/store";
import {IAppState} from "@app/store/state/app.state";
import {
  AdmCreateAccountProductAction,
  AdmSetAccountProductAction,
  AdmUpdateAccountProductAction
} from "@app/store/actions/administration.actions";
import {Observable, Subject} from "rxjs";
import {selectAccountProduct} from "@app/store/selectors/administration.selector";
import {filter, map, pluck, switchMap, takeUntil, tap} from "rxjs/operators";
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from "@app/shared/modals/administration-base-modal/administration-base-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {selectUserData} from "@app/store/selectors/auth.selector";
import {Sort} from "@angular/material/sort";
import {
  DirAccountProduct,
  DirAccountProductDto,
  EmptyDirAccountProductDto
} from "@app/_models/api-models/dir-account-product";
import {
  ACCOUNT_PRODUCT_FORM,
  ACCOUNT_PRODUCT_HEADERS
} from "@app/pages/administration/administration-page/account-product/constants/account-product.constants";

@Component({
  selector: 'account-product-page',
  templateUrl: './account-product-page.component.html',
  styleUrls: ['./account-product-page.component.scss']
})
export class AccountProductPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  currentUserData: AuthState;
  dataSource: TableData<DirAccountProduct>;
  objColNameProps: TableDataHeader[] = ACCOUNT_PRODUCT_HEADERS;

  private newDirAccountProductDto: DirAccountProductDto = new EmptyDirAccountProductDto;
  private selectAccountProduct$: Observable<PageDTO<DirAccountProduct>> = this._store.pipe(select(selectAccountProduct));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTableData(): void {
    this.selectAccountProduct$
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

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationData();
  }

  openNewDialog() {
    this.showDialog(
      {
        title: 'Modals.Title.NewAccountProduct',
        dataInfo: this.newDirAccountProductDto,
        formConfig: ACCOUNT_PRODUCT_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        // optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: DirAccountProductDto) => {
        this._store.dispatch(
          AdmCreateAccountProductAction({
            paginationData: this.params,
            data: {
              ...this.newDirAccountProductDto,
              ...attributesBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  selectedItem(accountProduct: DirAccountProduct) {
    const dirAccountProductDto: DirAccountProductDto = new DirAccountProductDto(accountProduct);

    this.showDialog(
      {
        title: 'Modals.Title.EditAccountProduct',
        dataInfo: dirAccountProductDto,
        formConfig: ACCOUNT_PRODUCT_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        // optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (val) => {
        this._store.dispatch(
          AdmUpdateAccountProductAction({
            paginationData: this.params,
            data: {
              ...val,
              updated: new Date(),
              changedByUsername: this.currentUserData.username,
              id: accountProduct.id
            }
          })
        );
      }
    );
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      sort: sortStr
    };
    this.dispatchSortAndPaginationData();
  }

  private showDialog(
    data: AdministrationBaseModalData<DirAccountProductDto, any>,
    callback: (val: DirAccountProductDto) => void
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

  private dispatchSortAndPaginationData() {
    this._store.dispatch(AdmSetAccountProductAction({data: { ...this.params }}));
  }
}
