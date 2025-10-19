import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState, PageDTO, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import {
  AdmCreateExpenseSettingAction,
  AdmSetExpenseSettingAction,
  AdmUpdateExpenseSettingAction
} from '@app/store/actions/administration.actions';
import { forkJoin, Observable, Subject } from 'rxjs';
import { selectExpenseSetting } from '@app/store/selectors/administration.selector';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { Sort } from '@angular/material/sort';
import { DirAccountProduct } from '@app/_models/api-models/dir-account-product';
import {
  EXPENSE_SETTING_FORM,
  EXPENSE_SETTING_HEADERS
} from '@app/pages/administration/administration-page/expense-setting/constants/expense-setting.constants';
import {
  AbsExpenseSetting,
  AbsExpenseSettingDto,
  EmptyAbsExpenseSettingDto
} from '@app/_models/api-models/abs-expense-setting';
import { DirExpenseType } from '@app/_models/api-models/dir-expense-type';
import { DirAccountProductControllerService } from '@app/api/dir-account-product-controller.service';
import { DirExpenseTypeControllerService } from '@app/api/dir-expense-type-controller.service';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';
import { CredentialsService } from '@app/services/authentication';

type Options = DirAccountProduct | DirExpenseType;

@Component({
  selector: 'expense-setting-page',
  templateUrl: './expense-setting-page.component.html',
  styleUrls: ['./expense-setting-page.component.scss']
})
export class ExpenseSettingPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  currentUserData: AuthState;
  dataSource: TableData<AbsExpenseSetting>;
  objColNameProps: TableDataHeader[] = EXPENSE_SETTING_HEADERS;
  private newAbsExpenseSettingDto: AbsExpenseSettingDto = new EmptyAbsExpenseSettingDto();
  private selectExpenseSetting$: Observable<PageDTO<AbsExpenseSetting>> = this._store.pipe(
    select(selectExpenseSetting)
  );
  private selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private optionsList: Record<string, Options[]> = {
    accountProductList: [],
    expenseTypeList: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private dirAccountProductService: DirAccountProductControllerService,
    private dirExpenseTypeService: DirExpenseTypeControllerService,
    protected readonly credentialsService: CredentialsService
  ) {
    super(credentialsService);
    this.dispatchSortAndPaginationData();
  }

  ngOnInit(): void {
    this.getTableData();
    this.setOptionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTableData(): void {
    this.selectExpenseSetting$
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
    forkJoin([this.dirAccountProductService.getList(), this.dirExpenseTypeService.getList()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([accountProducts, expenseTypes]) => {
        this.optionsList.accountProductList = accountProducts;
        this.optionsList.expenseTypeList = expenseTypes;
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
        title: 'Modals.Title.NewExpenseSetting',
        dataInfo: this.newAbsExpenseSettingDto,
        formConfig: EXPENSE_SETTING_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: AbsExpenseSettingDto) => {
        this._store.dispatch(
          AdmCreateExpenseSettingAction({
            paginationData: this.params,
            data: {
              ...this.newAbsExpenseSettingDto,
              ...attributesBeforeRequest
            }
          })
        );
      }
    );
  }

  selectedItem(absExpenseSetting: AbsExpenseSetting) {
    const absExpenseSettingDto: AbsExpenseSettingDto = new AbsExpenseSettingDto(absExpenseSetting);

    this.showDialog(
      {
        title: 'Modals.Title.EditExpenseSetting',
        dataInfo: absExpenseSettingDto,
        formConfig: EXPENSE_SETTING_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      val => {
        this._store.dispatch(
          AdmUpdateExpenseSettingAction({
            paginationData: this.params,
            data: {
              ...val,
              id: absExpenseSetting.id
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
    data: AdministrationBaseModalData<AbsExpenseSettingDto, Options>,
    callback: (val: AbsExpenseSettingDto) => void
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
    this._store.dispatch(AdmSetExpenseSettingAction({ data: { ...this.params } }));
  }
}
