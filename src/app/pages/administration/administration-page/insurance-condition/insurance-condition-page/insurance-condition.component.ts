import {
  AdmCreateInsuranceConditionAction,
  AdmSetInsuranceConditionsAction,
  AdmUpdateInsuranceConditionAction
} from '@app/store/actions/administration.actions';
import {
  AuthState,
  DirInsuranceType,
  InsuranceCompany,
  InsuranceCondition,
  InsuranceConditionDto,
  PageDTO,
  PaginationAndSortingDto,
  ProductRes,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirectoriesService, InsuranceCompanyControllerService, ProductCategoryControllerService } from '@app/api';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { IAppState } from '@app/store/state/app.state';
// tslint:disable-next-line: max-line-length
import { InsuranceConditionModalComponent } from '@app/shared/modals/insurance-conditions-modal/insurance-condition-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material';
import { selectInsuranceConditions } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

export interface InsuranceModalData {
  conditionData?: InsuranceConditionDto;
  companies?: InsuranceCompany[];
  types?: DirInsuranceType[];
  products?: ProductRes[];
  title?: string;
  showSendButton?: boolean;
  disabledFields?: boolean;
}

@Component({
  selector: 'insurance-condition-page',
  templateUrl: './insurance-conditions.component.html',
  styleUrls: ['./insurance-condition.component.scss']
})
export class InsuranceConditionPageComponent implements OnInit, OnDestroy {
  public totalCount: number;
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader(
      'insuranceType.nameRu',
      'Administration.TableHeaders.InsuranceParams.InsuranceType',
      'ru',
      'insuranceType.nameRu'
    ),
    new TableDataHeader(
      'insuranceType.nameGe',
      'Administration.TableHeaders.InsuranceParams.InsuranceType',
      'ge',
      'insuranceType.nameGe'
    ),
    new TableDataHeader(
      'insuranceCompany.name',
      'Administration.TableHeaders.InsuranceParams.InsuranceCompany',
      'string',
      'insuranceCompany.name'
    ),
    new TableDataHeader('product.nameRu', 'Administration.TableHeaders.Product', 'ru', 'product.nameRu'),
    new TableDataHeader('product.nameGe', 'Administration.TableHeaders.Product', 'ge', 'product.nameGe'),
    new TableDataHeader('minTerm', 'Administration.TableHeaders.InsuranceParams.MinTerm', 'string', 'minTerm'),
    new TableDataHeader('maxTerm', 'Administration.TableHeaders.InsuranceParams.MaxTerm', 'string', 'maxTerm'),
    new TableDataHeader('rate', 'Administration.TableHeaders.InsuranceParams.Rate', 'string', 'rate'),
    new TableDataHeader('minAmount', 'Administration.TableHeaders.InsuranceParams.MinAmount', 'string', 'minSum'),
    new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status', 'active')
  ];

  public currentUserData: AuthState;

  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;

  public types: DirInsuranceType[];
  public insuranceCompanies: InsuranceCompany[];
  public productData: ProductRes[];

  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  public userId: number;
  public newConditionInfo: InsuranceConditionDto = new InsuranceConditionDto();

  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private insuranceConditions$: Observable<PageDTO<InsuranceCondition>> = this._store.pipe(
    select(selectInsuranceConditions)
  );

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private directoriesService: DirectoriesService,
    private productCategoryControllerService: ProductCategoryControllerService,
    private insuranceCompaniesService: InsuranceCompanyControllerService
  ) {
    this.params = { page: this.selectedPage - 1, size: this.itemLimit };
    this.dispatchSortAndPaginationData();
  }

  selectedItem(conditionData: InsuranceConditionDto) {
    this.getTypesAndCountriesAndProducts(this.updateConditionDialog.bind(this, conditionData));
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationData();
  }

  openNewConditionDialog(e: Event) {
    this.getTypesAndCountriesAndProducts(this.showNewConditionDialog.bind(this));
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

  ngOnInit() {
    this.getInsuranceConditions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getTypesAndCountriesAndProducts(showDialog: () => void) {
    forkJoin([
      this.productCategoryControllerService.getAllActive(),
      this.insuranceCompaniesService.getAll(),
      this.directoriesService.getInsuranceTypeDir()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([productData, copmanyData, typeData]) => {
        this.productData = productData;
        this.insuranceCompanies = copmanyData;
        this.types = typeData;
        showDialog();
      });
  }

  private showNewConditionDialog() {
    this.showDialog(
      {
        types: this.types,
        companies: this.insuranceCompanies,
        products: this.productData,
        showSendButton: true,
        disabledFields: false,
        title: 'Administration.Titles.CreateInsuranceParameter'
      },
      (data: Partial<InsuranceConditionDto>) => {
        this._store.dispatch(
          AdmCreateInsuranceConditionAction({
            paginationData: this.params,
            data: {
              ...data,
              changedByUsername: this.currentUserData.username,
              created: new Date()
            }
          })
        );
      }
    );
  }

  private showDialog(data: InsuranceModalData, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(InsuranceConditionModalComponent, {
      width: '50%',
      height: '40%',
      panelClass: 'custom-panel-cls',
      data
    });
    (dialogRef.componentInstance as InsuranceConditionModalComponent).emitData.subscribe(callback);
  }

  private updateConditionDialog(conditionData: InsuranceConditionDto) {
    this.showDialog(
      {
        types: this.types,
        companies: this.insuranceCompanies,
        products: this.productData,
        conditionData,
        disabledFields: true,
        title: 'Administration.Titles.EditInsuranceParameter'
      },
      (data: Partial<InsuranceConditionDto>) => {
        this._store.dispatch(
          AdmUpdateInsuranceConditionAction({
            paginationData: this.params,
            data: {
              ...data,
              id: conditionData.id,
              changedByUsername: this.currentUserData.username,
              insuranceCompanyId: data.insuranceCompanyId,
              insuranceTypeId: data.insuranceTypeId,
              productId: data.productId,
              updated: new Date()
            }
          })
        );
      }
    );
  }

  private getInsuranceConditions() {
    this.insuranceConditions$
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

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetInsuranceConditionsAction({
        data: { ...this.params }
      })
    );
  }
}
