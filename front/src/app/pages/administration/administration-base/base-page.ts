import {
  AuthState,
  PageDTO,
  PaginationAndSortingDto,
  RoleAuthority,
  TableData,
  TableDataHeader,
  UserPosForTable
} from '@app/_models';
import { Observable, Subject } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { filter, pluck, takeUntil, tap } from 'rxjs/operators';
import { Directive, OnDestroy } from '@angular/core';
import { mapApiModelCollection } from '@app/services/util/map.utils';
import { CredentialsService } from '@app/services/authentication';
import {
  DirTradingCompanyPointForTable
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';

export interface BasePageService<T> {
  getList?: () => Observable<T[]>;
  getByPage?: (params: any) => Observable<PageDTO<T>>;
  create?: (item: T) => Observable<T>;
  update?: (item: T) => Observable<T>;
}

export class BasePage<T> {
  totalCount: number;
  itemLimit: number = 20;

  protected selectedPage: number = 0;

  protected params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  protected listData: T[];

  protected defaultMapper?: any;

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  private _isLoading = true;

  private _changePage: Subject<number> = new Subject<number>();

  private _dataSource: TableData<T>;
  private _tableConfig: TableDataHeader[];
  private readonly _service: BasePageService<T>;

  constructor(
    tableConfig: TableDataHeader[],
    service: BasePageService<T>,
    protected readonly credentialsService: CredentialsService
  ) {
    this._tableConfig = tableConfig;
    this._service = service;
  }

  get isLoading() {
    return this._isLoading;
  }

  get allowSelectItem() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN]);
  }

  get allowActivatePos() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN, RoleAuthority.HEAD_POS, RoleAuthority.SUPER_ADMIN_POS]);
  }

  get allowActivatePosUsers() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN, RoleAuthority.HEAD_POS]);
  }

  get allowEditPosUsers() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN, RoleAuthority.HEAD_POS, RoleAuthority.REG_MANAGER_POS]);
  }

  get allowDeactivatePos() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN, RoleAuthority.HEAD_POS, RoleAuthority.SUPER_ADMIN_POS]);
  }

  get allowSelectItemForPos() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      // RoleAuthority.SECURITY_POS,
      RoleAuthority.REG_MANAGER_POS
    ]);
  }

  get allowSelectItemForPosUsers() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.REG_MANAGER_POS,
      RoleAuthority.RM,
      RoleAuthority.RM_BOSS,
    ]);
  }

  get changePage() {
    return this._changePage;
  }

  get dataSource() {
    return this._dataSource;
  }

  get tableConfig() {
    return this._tableConfig;
  }

  updateTableConfig(tableConfig: TableDataHeader[]){
    this._tableConfig = tableConfig;
  }

  destroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchList = (): void => {
    console.log('fetchList');
    this._isLoading = true;
    this._service
      .getByPage(this.params)
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        tap(data => {
          if (data) {
            this.listData = data;

            if (this.defaultMapper) {
              this._dataSource = new TableData(this.tableConfig, mapApiModelCollection(data, this.defaultMapper));
            } else {
              this._dataSource = new TableData(this.tableConfig, data);
            }
          }
          this._isLoading = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  };

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this.fetchList();
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString(),
      sort: sortStr
    };
    this.fetchList();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params.value = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('value')) {
      delete this.params.value;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      delete this.params.value;
      this.changePage.next(1);
    }
  }
}

@Directive()
export class AllowEditDirective {
  constructor(protected readonly credentialsService: CredentialsService) {}

  get allowSelectItem() {
    return this.credentialsService.checkAccess([RoleAuthority.ADMIN]);
  }
}
