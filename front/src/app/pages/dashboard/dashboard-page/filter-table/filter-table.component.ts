import * as CryptoJS from 'crypto-js';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationControllerService, DirBranchControllerService, DirectoriesService } from '@app/api';
import {
  ApplicationPagedInfoDto, DirBranch,
  IFilteredParams,
  IFilterField,
  PaginationAndSortingDto,
  ProductDto,
  RoleAuthority,
  SearchParams,
  STAGES_PATH,
  StageType,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardTasksSetFilterAction, DashboardTasksSetSearchAction } from '@app/store/actions/tasks-filter.actions';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { selectDashboardFilterOptions, selectDashboardSearchParams } from '@app/store/selectors/tasks-filter.selector';

import { CredentialsService } from '@app/services/authentication';
import { CurrentAppService } from '@app/services/current-app.service';
import { DASHBOARD_FILTER } from './constants/dashboard-filter-config';
import { DashboardSetMyTasksAction } from '@app/store/actions/dashboard.actions';
import { IAppState } from '@app/store/state/app.state';
import { OtpEnterModalComponent } from '@app/components/modals/otp-enter-modal/otp-enter-modal.component';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { UserControllerService } from '@app/api/user-controller.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectMyTasks } from '@app/store/selectors/dashboard.selector';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { DashboardPageService } from '@app/pages/dashboard/dashboard-page/dashboard-page.service';
import {
  EnterPersDataModalComponent,
  EnterPersDataModalConfig
} from '@app/components/enter-pers-data-modal/enter-pers-data-modal.component';
import { FilterStorageKeys, SearchStorageKeys } from '@app/constants/table-filter-key';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {
  isVerifier: boolean = false;
  isRm: boolean = false;
  isAdmin: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;
  isRMBoss: boolean = false;
  isHeadPos: boolean = false;
  isRegManagerPos: boolean = false;
  isSupportPos: boolean = false;
  isBO: boolean = false;
  rmUsers: Observable<UserDto[]>;
  dataSource: TableData<ApplicationPagedInfoDto> = new TableData();
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
    new TableDataHeader('applicantFullName', 'TableHeader.Client', 'string', 'applicantFullName'),
    new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
    new TableDataHeader('updated', 'TableHeader.DateUpdate', 'dateAndTime', 'updated'),
    new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
    new TableDataHeader('productNameAm', 'TableHeader.Product', 'am', 'productNameAm'),
    new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
    new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
    new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
    new TableDataHeader('stageNameAm', 'TableHeader.Stage', 'am', 'stageNameAm'),
    new TableDataHeader('statusName', 'TableHeader.TypeOfTask', 'ru', 'statusName'),
    new TableDataHeader('statusNameAm', 'TableHeader.TypeOfTask', 'am', 'statusNameAm'),
    new TableDataHeader('statusReports.nameAm', 'TableHeader.Status', 'am', 'statusReports.nameAm'),
    new TableDataHeader('statusReports.nameRu', 'TableHeader.Status', 'ru', 'statusReports.nameRu'),
    new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
    new TableDataHeader('decisionMakerDisplay', 'TableHeader.DecisionMaker', 'string', 'decisionMakerDisplay'),
    new TableDataHeader('accepter', 'TableHeader.Accepter', 'string', 'accepter')
  ];

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 15;

  params: PaginationAndSortingDto = {
    page: 0,
    size: this.itemLimit
  };
  branches: DirBranch[] = [];

  searchInputValue: string;
  currentFilterValues: IFilteredParams;

  filterParams: IFilteredParams = {
    // decisionId: null,
    // statusId: null

    createdDate: '',
    productId: '',
    stageId: '',
    statusId: '',
    creditManagerId: '',
    verifierId: '',
    rmId: '',
    dsaId: '',
    accepterId: '',
    dateFrom: '',
    dateTo: '',
    branchCode: '',

    isDecline: false,
    isError: false,
    isIssued: false,
    isUserTask: false,
    isOnlyMyTasks: false,
    type: 'my-tasks'
  };

  userId: string;
  dashboardFilter: IFilterField[] = [...DASHBOARD_FILTER];
  productCategories: ProductDto[] = [];

  private config$ = this._store.pipe(select(selectMyTasks));
  private selectUserData$ = this._store.pipe(select(selectUserData));
  private selectTasksFilterOptions$ = this._store.pipe(select(selectDashboardFilterOptions));
  private selectTasksSearchOptions$ = this._store.pipe(select(selectDashboardSearchParams));
  private productCategories$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productCategories))
  );
  private isInitialized = false;
  private isDataLoading = false;

  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private applicationControllerService: ApplicationControllerService,
    private directoriesService: DirectoriesService,
    private userService: UserControllerService,
    private credentialsService: CredentialsService,
    private currentAppService: CurrentAppService,
    private readonly dashboardPageService: DashboardPageService,
    private dirBranchControllerService: DirBranchControllerService
  ) {}

  ngOnInit() {
    this.isVerifier = this.credentialsService.isVerifier;
    this.isRm = this.credentialsService.isRiskManager;
    this.isAdmin = this.credentialsService.isAdmin;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;
    this.isRMBoss = this.credentialsService.isRiskManagerBoss;
    this.isHeadPos = this.credentialsService.isHeadPos;
    this.isRegManagerPos = this.credentialsService.isRegManagerPos;
    this.isSupportPos = this.credentialsService.isSupportPos;
    this.isBO = this.credentialsService.isBO;

    this.getDirectories();
    this.createSubscription();
    this.restoreSearchParams();
    this.fillDropdownFilter();
    this.setCurrentFilterParams();
    // this.restoreFilterParams();

    // if (!this.currentFilterValues) {
    //   this.dispatchData();
    // }

    if (this.searchInputValue) {
      this.onSearchEvent(this.searchInputValue);
    }

    if (this.isAdmin || this.isRm || this.isRMBoss || this.isHeadPos || this.isRegManagerPos || this.isSupportPos || this.isBO) {
      this.objColNameProps.push(
        new TableDataHeader('regManagerFullName', 'Менеджер POS', 'string', 'regManagerFullName'),
        new TableDataHeader('dirTradingCompanyPointFull', 'Торговая точка', 'string', 'dirTradingCompanyPointFull')
      );
    }
  }

  get searchStorageKey(): string {
    return SearchStorageKeys.MyTasksSearch;
  }

  createSubscription() {
    this.dashboardPageService.updateDashboardTable$.pipe(
      tap(this.refresh),
      untilDestroyed(this)
    );
    this.selectTasksFilterOptions$.pipe(untilDestroyed(this)).subscribe((options: IFilteredParams) => {
      /*if (options) {
        this.filterParams = options;
      }*/
    });
    this.selectTasksSearchOptions$.pipe(untilDestroyed(this)).subscribe((options: SearchParams) => {
      /*if (options.search) {
        this.searchInputValue = options.search;
      }*/
    });
  }

  setCurrentFilterParams() {
    if (this.filterParams) {
      this.currentFilterValues = this.filterParams;
    }
  }

  selectedPageEvent(pageNumber: number): void {
    this.params.page = pageNumber - 1;
    this.dispatchData();
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params.sort = sortStr;
    this.dispatchData();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      localStorage.setItem(SearchStorageKeys.MyTasksSearch, inputVal);
      this.dispatchSearchFilterData({ search: inputVal });
      this.params.param = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('param')) {
      localStorage.removeItem(SearchStorageKeys.MyTasksSearch);
      delete this.params.param;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('param')) {
      localStorage.removeItem(SearchStorageKeys.MyTasksSearch);
      this.dispatchSearchFilterData({ search: '' });

      delete this.params.param;
      this.changePage.next(1);
    }
  }

  selectItemEvent(item: ApplicationPagedInfoDto) {
    this.currentAppService.setAppStageId(item);
    this.currentAppService.setAppProductId(item);

    if (!!item && !!item.stageId) {
      if (item.stageId === StageType.OTP) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.dialog
            .open(OtpEnterModalComponent, {
              height: '250px',
              maxWidth: '40vw',
              width: '40vw',
              panelClass: 'custom-panel-cls',
              data: item
            })
            .afterClosed()
            .subscribe(value => {
              if (value && value.needRefresh) {
                this.dispatchData();
              }
            });
        });
      }

      if (item.stageId === StageType.ENTER_PERS_DATA) {
        this.openEnterPersDataModal(item);
      } else {
        this.startTaskAndGetToForm(item.id, item.stageId);
      }
    }
  }

  selectedFilterFieldsEvent(options: { [key: string]: any }) {
    const preparedFilters = { ...options };
    const branchCodeValue = preparedFilters.branchCode;

    if (branchCodeValue && this.branches.length) {
      const branch = this.branches.find(b => b.id === branchCodeValue);
      if (branch) {
        preparedFilters.branchCode = branch.code;
      }
    }

    this.filterParams = preparedFilters;

    localStorage.setItem(FilterStorageKeys.MyTasks, JSON.stringify(preparedFilters));

    this.dispatchTasksFilterData(preparedFilters);
    this.dispatchData();
  }

  restoreFilterParams(): void {
    const savedFilters = localStorage.getItem(FilterStorageKeys.MyTasks);
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);

      if (filters.dateFrom) filters.dateFrom = new Date(filters.dateFrom);
      if (filters.dateTo) filters.dateTo = new Date(filters.dateTo);

      const filterParamsWithCode = { ...filters };

      const currentFilterValuesWithId = { ...filters };

      if (filters.branchCode && this.branches.length) {
        const branch = this.branches.find(b => b.code === filters.branchCode);
        if (branch) {
          currentFilterValuesWithId.branchCode = branch.id;
          filterParamsWithCode.branchCode = filters.branchCode;
        }
      }

      this.filterParams = { ...this.filterParams, ...filterParamsWithCode };
      this.currentFilterValues = { ...currentFilterValuesWithId };
    }
  }

  restoreSearchParams(): void {
    const savedSearch = localStorage.getItem(this.searchStorageKey);
    if (savedSearch) {
      this.searchInputValue = savedSearch;
      this.dispatchSearchFilterData({ search: savedSearch });
      this.params.param = savedSearch;
    }
  }

  toggleValue(toggleVal: boolean) {
    this.params.isOnlyMyTasks = toggleVal;
    this.dispatchData();
  }

  refresh = (): void => {
    this.dispatchData();
  };

  ngOnDestroy(): void {}

  private startTaskAndGetToForm(taskId: number, stageId: string): void {
    const path = `stages/` + STAGES_PATH[stageId];
    const cryptoHash = CryptoJS.PBKDF2(taskId.toString(), this.userId.toString()).toString();
    this.applicationControllerService.startTask(taskId.toString(), this.userId).subscribe(_ => {
      if (!!STAGES_PATH[stageId]) {
        this.router.navigate([path, taskId, cryptoHash], { relativeTo: this.route });
      }
    });
  }

  private dispatchData() {
    if (this.isDataLoading) {
      return;
    }

    this.isDataLoading = true;

    // this.restoreFilterParams();
    // this.restoreSearchParams();
    this._store.dispatch(
      DashboardSetMyTasksAction({ data: { ...this.params }, filter: { ...this.filterParams }, userId: this.userId })
    );
    this.config$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
          this.isDataLoading = false;
        }),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        const processedData = res.map((obj: ApplicationPagedInfoDto) => {
          return {
            ...obj,
            decisionMakerDisplay: this.getDecisionMakerValue(obj)
          };
        });

        this.dataSource = new TableData(this.objColNameProps, processedData);
      });
  }

  private getDecisionMakerValue(item: ApplicationPagedInfoDto): string {
    if (item.stageId === StageType.MANUAL_CHECKS || item.stageId === StageType.MANUAL_CHECKS_RETURN) {
      return item.verifier || '';
    }

    if (item.stageId === StageType.RM || item.stageId === StageType.RM_RETURN) {
      return item.rm || '';
    }

    return item.rm || item.verifier || '';
  }

  private dispatchTasksFilterData(params: IFilteredParams) {
    this._store.dispatch(
      DashboardTasksSetFilterAction({
        filterParams: { ...params }
      })
    );
  }

  private dispatchSearchFilterData(params: SearchParams) {
    this._store.dispatch(
      DashboardTasksSetSearchAction({
        searchParams: { ...params }
      })
    );
  }

  private getDirectories() {
    combineLatest([this.selectUserData$, this.productCategories$, this.dirBranchControllerService.getList()])
      .pipe(untilDestroyed(this))
      .subscribe(([selectedUserData, productCategories, branches]) => {
        this.branches = branches;
        this.productCategories = getOnlyActiveItems<ProductDto>(productCategories);
        this.updateDropdownFilter<ProductDto>('productId', this.productCategories);
        this.setCurrentUserId(selectedUserData);

        this.restoreFilterParams();
        if (!this.isInitialized) {
          this.dispatchData();
          this.isInitialized = true;
        }
      });
  }

  private setCurrentUserId(selectedUserData: UserDto) {
    if (selectedUserData && selectedUserData.id) {
      this.userId = selectedUserData.id.toString();
    }
  }

  private updateDropdownFilter<T>(optionName: string, value: T[]) {
    this.dashboardFilter.find(item => item.fcName === optionName).options = value;
  }

  private fillDropdownFilter() {
    this.dashboardFilter.find(item => item.fcName === 'productId').options = this.productCategories;

    this.directoriesService.getStagesDir().subscribe(stage => {
      this.dashboardFilter.find(item => item.fcName === 'stageId').options = stage;
    });

    this.directoriesService.getStatusDir().subscribe(status => {
      this.dashboardFilter.find(item => item.fcName === 'statusId').options = status;
    });

    this.userService.getUsersByRole(RoleAuthority.CREDIT_MANAGER).subscribe(creditManagerUser => {
      this.dashboardFilter.find(item => item.fcName === 'creditManagerId').options = creditManagerUser;
    });

    if (!!this.isAdmin || !!this.isRm) {
      this.rmUsers = this.userService.getUsersByRole(RoleAuthority.RM);
      this.rmUsers.subscribe(users => {
        this.dashboardFilter.find(item => item.fcName === 'verifierId').options = users;
        this.dashboardFilter.find(item => item.fcName === 'rmId').options = users;
      });
    } else {
      this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'verifierId'), 1);
      this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'rmId'), 1);
    }

    this.userService.getUsersByRole(RoleAuthority.BO).subscribe(accepterUser => {
      this.dashboardFilter.find(item => item.fcName === 'accepterId').options = accepterUser;
    });

    this.dirBranchControllerService.getList().subscribe(branches => {
      this.branches = branches;
      this.dashboardFilter.find(item => item.fcName === 'branchCode').options = branches;
    });
  }

  private openEnterPersDataModal(data: ApplicationPagedInfoDto) {
    const config: EnterPersDataModalConfig = {
      data,
      readonly: false
    };
    this.dialog
      .open(EnterPersDataModalComponent, {
        // height: '40vh',
        width: '50vw',
        panelClass: 'custom-panel-cls',
        data: config
      })
      .afterClosed()
      .subscribe(value => {
        this.refresh();
      });
  }
}
