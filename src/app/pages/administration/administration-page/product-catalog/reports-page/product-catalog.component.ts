import {
  AdmCreateConditionAction,
  AdmSetConditionAction,
  AdmUpdateConditionAction
} from '@app/store/actions/administration.actions';
import {
  AuthState,
  Condition,
  ConditionDto,
  Dir,
  EmptyConditionDto,
  PageDTO,
  PaginationAndSortingDto,
  ProductRes,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirectoriesService, ProductCategoryControllerService } from '@app/api';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Sort } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { IAppState } from '@app/store/state/app.state';
import { selectConditions } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import {
  PRODUCT_CATALOG_FORM,
  PRODUCT_CATALOG_HEADERS
} from '@app/pages/administration/administration-page/product-catalog/constants/product-catalog.constants';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { TariffControllerService } from '@app/api/tariff-controller.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

type Options = ProductRes | Dir;

@Component({
  selector: 'product-catalog-page',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  currentUserData: AuthState;
  dataSource: TableData<Condition>;
  objColNameProps: TableDataHeader[] = PRODUCT_CATALOG_HEADERS;
  language: string = this.translateService.currentLang;
  changePage: Subject<number> = new Subject<number>();
  params: PaginationAndSortingDto = {
    page: this.selectedPage,
    size: this.itemLimit.toString()
  };

  private newProductData: EmptyConditionDto = new EmptyConditionDto();
  private selectConditions$: Observable<PageDTO<Condition>> = this._store.pipe(select(selectConditions));
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private optionsList: Record<string, Options[]> = {
    product: [],
    currencies: [],
    tariff: []
  };

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    private directoriesService: DirectoriesService,
    private productCategoryControllerService: ProductCategoryControllerService,
    private tariffControllerService: TariffControllerService,
    private translateService: TranslateService
  ) {
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit(): void {
    this.createLanguageSubscription();
    this.getTableData();
    this.setOptionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: inputVal.trim(),
        lang: this.language
      };
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  getTableData(): void {
    this.selectConditions$
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
      this.productCategoryControllerService.getAllActive(),
      this.directoriesService.getCurrencies(),
      this.tariffControllerService.getList()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([productData, currencies, tariff]) => {
        this.optionsList.product = productData;
        this.optionsList.currencies = currencies;
        this.optionsList.tariff = tariff;
      });
  }

  selectedItem(condition: Condition) {
    const conditionDto: ConditionDto = new ConditionDto(condition);

    this.showDialog(
      {
        title: 'Modals.Title.Product',
        dataInfo: conditionDto,
        formConfig: PRODUCT_CATALOG_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-three-cols'
      },
      (val: ConditionDto) => {
        this._store.dispatch(
          AdmUpdateConditionAction({
            data: {
              ...val,
              updated: new Date(),
              changedByUsername: this.currentUserData.username,
              id: condition.id
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    if (this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: this.params.value.trim(),
        lang: this.language
      };
    } else {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString()
      };
    }
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
        title: 'Modals.Title.NewProduct',
        dataInfo: this.newProductData,
        formConfig: PRODUCT_CATALOG_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList,
        containerClass: 'grid-three-cols'
      },
      (conditionBeforeRequest: ConditionDto) => {
        this._store.dispatch(
          AdmCreateConditionAction({
            paginationData: this.params,
            data: {
              ...this.newProductData,
              ...conditionBeforeRequest,
              created: new Date(),
              changedByUsername: this.currentUserData.username
            }
          })
        );
      }
    );
  }

  private showDialog(data: AdministrationBaseModalData<ConditionDto, Options>, callback: (val: ConditionDto) => void) {
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
    this._store.dispatch(AdmSetConditionAction({ data: this.params }));
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang: LangChangeEvent) => (this.language = lang.lang));
  }
}
