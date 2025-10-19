import * as CryptoJS from 'crypto-js';
import * as QUEUES_HEADERS from './constants/queue-table-headers';
import * as QueuesActions from '@app/store/actions/queues.actions';

import { ActionCreator, select, Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ApplicationControllerService,
  BpmFrontControllerService, DirBranchControllerService,
  DirectoriesService,
  ProductCategoryControllerService
} from '@app/api';
import {
  ApplicationPagedInfoDto,
  AuthState, DirBranch,
  IFilteredParams,
  IFilterField,
  PaginationAndSortingDto,
  RoleAuthority,
  SearchParams,
  StageType,
  TableCellConfig,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, throwError, combineLatest, of } from 'rxjs';
import { QueuesTasksSetFilterAction, QueuesTasksSetSearchAction } from '@app/store/actions/tasks-filter.actions';
import { catchError, finalize, pluck, takeUntil, tap } from 'rxjs/operators';
import {
  selectAll,
  selectArchive,
  selectDecline,
  selectError,
  selectMonitoring,
  selectUserTasks
} from '@app/store/selectors/queues.selector';
import { selectQueuesFilterOptions, selectQueuesSearchParams } from '@app/store/selectors/tasks-filter.selector';

import { CredentialsService } from '@app/services/authentication';
import { DASHBOARD_FILTER } from '@app/pages/dashboard/dashboard-page/filter-table/constants/dashboard-filter-config';
import { IAppState } from '@app/store/state/app.state';
import { QUEUES_LINKS } from '../queues-page.component';
import { ToastService } from '@app/services/toast.service';
import { TypedAction } from '@ngrx/store/src/models';
import { UserControllerService } from '@app/api/user-controller.service';
import { UserReasignModalComponent } from '@app/shared/components/modals/user-reasign-modal/user-reasign-modal.component';
import { selectUserData } from '@app/store/selectors/auth.selector';
import {
  EnterPersDataModalComponent,
  EnterPersDataModalConfig
} from '@app/components/enter-pers-data-modal/enter-pers-data-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { environment } from '@env/environment';
import { QueueErrorModalComponent } from '@app/pages/queues/queues-page/queue-error-modal/queue-error-modal.component';
import { errorWithManagerPos } from './constants/queue-table-headers';
import { FilterStorageKeys, SearchStorageKeys } from '@app/constants/table-filter-key';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterTableComponent implements OnDestroy, OnInit, OnDestroy {
  dataSource: TableData<ApplicationPagedInfoDto> = new TableData();
  subscription$: Subscription;

  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isAdmin: boolean = false;
  isAdminIT: boolean = false;
  isCreditManager: boolean = false;
  isCreditManagerBoss: boolean = false;
  isCallCenterBoss: boolean = false;
  isVerifierBoss: boolean = false;
  isRiskManager: boolean = false;
  isRiskManagerBoss: boolean = false;
  isDSA: boolean = false;
  isBusinessOwner: boolean = false;
  isBO: boolean = false;
  isHeadPos: boolean = false;
  isRegManagerPos: boolean = false;
  isSupportPos: boolean = false;
  rmUsers: Observable<UserDto[]>;
  isDecisionMakerBoss: boolean = false;
  isDSABoss: boolean = false;
  isVideoBank: boolean = false;
  isVideoBankBoss: boolean = false;
  isRefreshBtnInactive: boolean = false;
  isMonitoringQueue: boolean = false;
  isBtnRestartAllInactive: boolean = false;

  allObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.all;
  allObjColNamePropsWithRefreshApp: TableDataHeader[] = QUEUES_HEADERS.allWithRefreshApp;
  allObjColNamePropsWithManagerPos: TableDataHeader[] = QUEUES_HEADERS.allWithManagerPos;
  verifierObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifier;
  creditManagerBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.creditManagerBoss;
  accepterObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.accepter;
  callCenterBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.callCenterBoss;
  verifierBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierBoss;
  decisionMakerBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.decisionMakerBoss;
  dsaBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.dsaBoss;
  adminDeclinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminDeclines;
  adminITDeclinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminITDeclines;
  verifierDeclinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierDeclines;
  adminArchivedObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminArchived;
  adminAllObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminAll;
  adminITAllObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminITAll;

  adminITObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminIT;

  errorObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.error;
  errorWithManagerPosObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.errorWithManagerPos;
  errorWithoutRefreshObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.errorWithAllBtns;
  verifierErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierErrors;
  creditManagerBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.creditManagerBossErrors;
  accepterErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.accepterErrors;
  callCenterBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.callCenterBossErrors;
  verifierBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierBossErrors;
  decisionMakerBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.decisionMakerBossErrors;
  dsaBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.dsaBossErrors;
  adminErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminErrors;
  adminITErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminITErrors;
  adminErrorsWithManagerPosObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminErrorsWithManagerPos;
  declinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.declines;
  monitoringObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.monitoring;
  videoBankBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.videoBankBoss;
  declinesRmObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.declines_rm;
  declinesRmBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.declines_rm_boss;

  objColNameProps: TableDataHeader[] = [];

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 20;
  restartAllBtn = { name: 'Buttons.RestartAll', visible: false };

  functionForButtonEvent: (event: ApplicationPagedInfoDto) => void;
  functionForDeclineAdminEvent: (event: ApplicationPagedInfoDto) => void;

  queuesFilter: IFilterField[];
  filterFields: IFilterField[];
  setAction: ActionCreator<| QueuesActions.QueuesActions.QueuesSetArchive
    | QueuesActions.QueuesActions.QueuesSetUserTasks
    | QueuesActions.QueuesActions.QueuesSetDecline
    | QueuesActions.QueuesActions.QueuesSetError
    | QueuesActions.QueuesActions.QueuesSetAll
    | QueuesActions.QueuesActions.QueuesSetMonitoring,
    (props: {
      data: PaginationAndSortingDto;
      filter: IFilteredParams;
    }) => { data: PaginationAndSortingDto; filter: IFilteredParams } & TypedAction<string>>;

  subscription: Subscription;

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
    accepterId: '',
    dateFrom: '',
    dateTo: '',
    branchCode: '',

    isDecline: false,
    isError: false,
    isIssued: false,
    isUserTask: false,
    isOnlyMyTasks: false,
    type: ''
  };

  dashboardFilter: IFilterField[];

  selectTasksSearchOptions$ = this._store.pipe(select(selectQueuesSearchParams));
  selectTasksFilterOptions$ = this._store.pipe(select(selectQueuesFilterOptions));
  selectDeclines$ = this._store.pipe(select(selectDecline));
  selectArchive$ = this._store.pipe(select(selectArchive));
  selectUserTasks$ = this._store.pipe(select(selectUserTasks));
  selectError$ = this._store.pipe(select(selectError));
  selectAll$ = this._store.pipe(select(selectAll));
  selectMonitoring$ = this._store.pipe(select(selectMonitoring));
  userId: string;
  selectUserData$ = this._store.pipe(select(selectUserData));

  private paramsTitle: string;
  private isCanReassign: boolean = true;
  private destroy: Subject<boolean> = new Subject<boolean>();
  private reassignUsersByRole: UserDto[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _store: Store<IAppState>,
    private bpmFrontControllerService: BpmFrontControllerService,
    private credentialsService: CredentialsService,
    private appService: ApplicationControllerService,
    private toastService: ToastService,
    private directoriesService: DirectoriesService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private productService: ProductCategoryControllerService,
    private userService: UserControllerService,
    private applicationControllerService: ApplicationControllerService,
    private dirBranchControllerService: DirBranchControllerService
  ) {
  }

  ngOnInit(): void {
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isRiskManager = this.credentialsService.isRiskManager;
    this.isRiskManagerBoss = this.credentialsService.isRiskManagerBoss;
    this.isAdmin = this.credentialsService.isAdmin;
    this.isAdminIT = this.credentialsService.isAdminIT;
    this.isCreditManager = this.credentialsService.isCreditManager;
    this.isCreditManagerBoss = this.credentialsService.isCreditManagerBoss;
    this.isCallCenterBoss = this.credentialsService.isCallCenterBoss;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;
    this.isDSABoss = this.credentialsService.isDSABoss;
    this.isDSA = this.credentialsService.isDSA;
    this.isBusinessOwner = this.credentialsService.isBusinessOwner;
    this.isBO = this.credentialsService.isBO;
    this.isHeadPos = this.credentialsService.isHeadPos;
    this.isRegManagerPos = this.credentialsService.isRegManagerPos;
    this.isSupportPos = this.credentialsService.isSupportPos;
    this.isVideoBank = this.credentialsService.isVideoBank;
    this.isVideoBankBoss = this.credentialsService.isVideoBankBoss;

    this.createFilterParamsSubscription();
    this.createSearchParamsSubscription();
    this.createActivatedRouteSubscription();
    // this.restoreSearchParams();

    this.fillDropdownFilter();
    // this.restoreFilterParams();

    this.selectUserData$.pipe(takeUntil(this.destroy)).subscribe(res => {
      if (res && res.id) {
        this.userId = res.id.toString();
      }
    });
  }

  get searchStorageKey(): string {
    return SearchStorageKeys.QueuesSearch;
  }

  createActivatedRouteSubscription() {

    this.activatedRoute.params.pipe(takeUntil(this.destroy)).subscribe((params: Params) => {

      this.paramsTitle = params.title;

      this.checkRoute(this.paramsTitle);
      this.setResetAllBtnVisibility(this.paramsTitle);
    });
  }

  setResetAllBtnVisibility(paramsTitle: string) {
    this.restartAllBtn.visible = paramsTitle === QUEUES_LINKS.error;
  }

  createFilterParamsSubscription() {
    this.selectTasksFilterOptions$.pipe(takeUntil(this.destroy)).subscribe((options: IFilteredParams) => {
      /*if (options) {
        this.filterParams = options;
      }*/
    });
  }

  createSearchParamsSubscription() {
    this.selectTasksSearchOptions$.pipe(takeUntil(this.destroy)).subscribe((options: SearchParams) => {
      /*if (options.search) {
        this.searchInputValue = options.search;
      }*/
    });
  }

  setCurrentFilterParams() {
    if (this.filterParams) {
      this.currentFilterValues = this.filterParams;
    }

    if (this.searchInputValue) {
      this.onSearchEvent(this.searchInputValue);
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

    localStorage.setItem(FilterStorageKeys.Queues, JSON.stringify(preparedFilters));

    this.dispatchTasksFilterData(preparedFilters);

    this.changePage.next(1);
  }

  restoreFilterParams(): void {
    if (this.filterParams.isUserTask || this.filterParams.isDecline || this.filterParams.isError || this.filterParams.isIssued) {
      return;
    }

    const savedFilters = localStorage.getItem(FilterStorageKeys.Queues);
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
    const savedSearch = localStorage.getItem(SearchStorageKeys.QueuesSearch);

    if (savedSearch && savedSearch.trim() !== '') {
        this.searchInputValue = savedSearch;
      this.dispatchSearchFilterData({ search: savedSearch });
      this.params.param = savedSearch;
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  selectedPageEvent(pageNumber: number): void {
    this.params.page = pageNumber - 1;
    this._store.dispatch(this.setAction({ data: { ...this.params }, filter: { ...this.filterParams } }));
  }

  selectedItemEvent(item: ApplicationPagedInfoDto): void {
    let appId;
    let path;
    if (this.isMonitoringQueue) {
      appId = item.appId || item.applicationId;
      path = '../stages/view';
    } else {
      appId = item.id || item.applicationId;
      path = '../stages/view';
    }

    const cryptoHash = CryptoJS.PBKDF2(appId.toString(), this.userId.toString()).toString();

    if (item.stageId === StageType.ENTER_PERS_DATA) {
      this.openEnterPersDataModal(item);
    } else {
      this.router.navigate([path, appId, cryptoHash], { relativeTo: this.activatedRoute });
    }
  }

  sortingDataEvent(sortData: Sort): void {
  }

  onSearchEvent(inputVal: string): void {
    // if (!!inputVal) {
    if (inputVal) {
      localStorage.setItem(SearchStorageKeys.QueuesSearch, inputVal);
    } else {
      localStorage.removeItem(SearchStorageKeys.QueuesSearch);
    }
    this.dispatchSearchFilterData({ search: inputVal });
    this.params.param = inputVal;
    this.changePage.next(1);
    // } else if (this.params.hasOwnProperty('param')) {
    //   delete this.params.param;
    //   this.changePage.next(1);
    // }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('param')) {
      localStorage.removeItem(SearchStorageKeys.QueuesSearch);
      this.searchInputValue = '';
      this.dispatchSearchFilterData({ search: '' });

      delete this.params.param;
      this.changePage.next(1);
    }
  }

  iconButtonEvent(event: { rowValue: any; type: string }) {
    if(event.type === 'restart-process') {
      this.onDeclineResetBtnClick(event.rowValue);
    } else {
      this.bpmFrontControllerService.errorReport(event.rowValue.id);
    }
  }

  restart(event: ApplicationPagedInfoDto) {

    this.isRefreshBtnInactive = true;
    if(event.baseProductId === 'PS001') {
      this.bpmFrontControllerService
        .posAppRestartError(event.id)
        .pipe(
          takeUntil(this.destroy),
          finalize(() => (this.isRefreshBtnInactive = false))
        )
        .subscribe(res => this.restartCallback(this.selectError$));
    } else {
      this.bpmFrontControllerService
        .signalRepeat(event.id)
        .pipe(
          takeUntil(this.destroy),
          finalize(() => (this.isRefreshBtnInactive = false))
        )
        .subscribe(res => this.restartCallback(this.selectError$));
    }



  }

  restartRefinance(event: ApplicationPagedInfoDto) {
    this.isRefreshBtnInactive = true;
    this.bpmFrontControllerService
      .refinanceSignalRepeat(event.appId)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isRefreshBtnInactive = false))
      )
      .subscribe(res => this.restartCallback(this.selectMonitoring$));
  }

  restartCallback(select$: Observable<any>) {
    this.dispatchData(select$);
    this.isRefreshBtnInactive = false;
    this.toastService.viewMsg('SuccessMessage.AppSuccessRestarted', 'success');
  }

  onDeclineInvalidBtnClick(event: ApplicationPagedInfoDto) {
    this.appService
      .declineInvalid(event.id)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(_ => {
        this.toastService.viewMsg('Статус заявки успешно изменен', 'success');
      });
  }

  onDeclineResetBtnClick(event: ApplicationPagedInfoDto) {
    this.isRefreshBtnInactive = true;

    if(event.baseProductId === 'PS001') {

      this.bpmFrontControllerService
        .posAppRestart(event.id, event.stageId)
        .pipe(
          finalize(() => (this.isRefreshBtnInactive = false)),
          catchError(err => {
            return throwError(err);
          })
        )
        .subscribe(_ => {
          this.getTableDataByLink();
          this.toastService.viewMsg('SuccessMessage.AppSuccessRestarted', 'success');
        });

    } else {
      this.bpmFrontControllerService
        .refinanceSignalReset(event.id)
        .pipe(
          finalize(() => (this.isRefreshBtnInactive = false)),
          catchError(err => {
            return throwError(err);
          })
        )
        .subscribe(_ => {
          this.getTableDataByLink();
          this.toastService.viewMsg('SuccessMessage.AppSuccessRestarted', 'success');
        });
    }



  }

  onDeclineAdminBtnClick(event: ApplicationPagedInfoDto) {
    this.appService
      .declineAdmin(event.id)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(_ => {
        this.toastService.viewMsg('Статус заявки успешно изменен', 'success');
      });
  }

  onUserReassign(ev: { row: ApplicationPagedInfoDto; col: string }) {
    this.checkAppStatus(ev.row);

    const applicationId = ev.row.id;
    const stageId = ev.row.stageId as StageType;

    let reassignRole = null;
    switch (ev.col) {
      case 'creditManager':
        reassignRole = RoleAuthority.CREDIT_MANAGER;
        break;

      case 'callCenter':
        reassignRole = RoleAuthority.CALL_CENTER;
        break;

      case 'videoBank':
        reassignRole = RoleAuthority.VIDEO_BANK;
        break;

      case 'verifier':
        reassignRole = RoleAuthority.RM;
        break;

      case 'accepter':
        reassignRole = RoleAuthority.BO;
        break;

      case 'decisionMaker':
        reassignRole = RoleAuthority.DECISION_MAKER;
        break;

      case 'rm':
        reassignRole = RoleAuthority.RM;
        break;

      case 'dsa':
        reassignRole = RoleAuthority.DSA;
        break;

      case 'decisionMakerDisplay':
        reassignRole = RoleAuthority.RM;
        break;

        default:
        break;
    }

    if (reassignRole !== null && this.isCanReassign) {
      this.getUsersForReassign(applicationId, reassignRole, stageId);
    }
  }

  getUsersForReassign(
    applicationId: string | number,
    reassignRole: string,
    stageId: StageType
  ) {
    let usersObservable: Observable<UserDto[]>;

    if (reassignRole === RoleAuthority.RM) {
      if ([StageType.MANUAL_CHECKS, StageType.MANUAL_CHECKS_RETURN].includes(stageId)) {
        usersObservable = this.userService.getUsersByRole(RoleAuthority.RM);
      }
      else if ([StageType.RM, StageType.RM_RETURN].includes(stageId)) {
        usersObservable = this.userService.getUsersByRoleRM(applicationId);
      }
    } else {
      usersObservable = this.userService.getUsersByRole(reassignRole);
    }

    usersObservable
      .pipe(takeUntil(this.destroy))
      .subscribe((users: UserDto[]) => {
        this.reassignUsersByRole = users;
        this.openModal(applicationId, reassignRole);
      });
  }

  restartAll(e: MouseEvent) {
    this.isBtnRestartAllInactive = true;

    this.bpmFrontControllerService
      .repeatAll()
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isBtnRestartAllInactive = false))
      )
      .subscribe((res: any) => {
        this.dispatchData(this.selectError$);
        if (!res) {
          this.toastService.viewMsg('Перезапуск заявок успешно запущен', 'success');
        } else {
          this.toastService.viewMsg(res.message, 'warning');
        }
      });
  }

  refresh() {
    this.changePage.next(1);
  }

  private checkAppStatus(app: ApplicationPagedInfoDto) {
    if (app && app.statusId) {
      const condition: boolean =
        app.statusId.toString().includes('DECLINE') || app.statusId.toString().includes('ISSUED');

      condition ? this.canNotReassign() : this.canReassign();
    }
  }

  private canReassign() {
    this.isCanReassign = true;
  }

  private canNotReassign() {
    this.isCanReassign = false;
  }

  // private fillDropdownFilter() {
  //   this.dashboardFilter = [...DASHBOARD_FILTER];
  //
  //   this.productService.getAllActive().subscribe(product => {
  //     this.dashboardFilter.find(item => item.fcName === 'productId').options = product;
  //   });
  //
  //   this.directoriesService.getStagesDir().subscribe(stage => {
  //     this.dashboardFilter.find(item => item.fcName === 'stageId').options = stage;
  //   });
  //
  //   this.directoriesService.getStatusDir().subscribe(status => {
  //     this.dashboardFilter.find(item => item.fcName === 'statusId').options = status;
  //   });
  //
  //   this.userService.getUsersByRole(RoleAuthority.CREDIT_MANAGER).subscribe(creditManagerUser => {
  //     this.dashboardFilter.find(item => item.fcName === 'creditManagerId').options = creditManagerUser;
  //   });
  //
  //   if (!!this.isAdmin || !!this.isRiskManager) {
  //     this.rmUsers = this.userService.getUsersByRole(RoleAuthority.RM);
  //     this.rmUsers.subscribe(users => {
  //       this.dashboardFilter.find(item => item.fcName === 'verifierId').options = users;
  //       this.dashboardFilter.find(item => item.fcName === 'rmId').options = users;
  //     });
  //   } else {
  //     this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'verifierId'), 1);
  //     this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'rmId'), 1);
  //   }
  //
  //   this.userService.getUsersByRole(RoleAuthority.BO).subscribe(accepterUser => {
  //     this.dashboardFilter.find(item => item.fcName === 'accepterId').options = accepterUser;
  //   });
  //
  //   this.dirBranchControllerService.getList().subscribe(branches => {
  //     this.branches = branches;
  //     this.dashboardFilter.find(item => item.fcName === 'branchCode').options = branches;
  //     this.restoreFilterParams();
  //   });
  //
  //   this.cd.markForCheck();
  // }
  private fillDropdownFilter() {
    this.dashboardFilter = [...DASHBOARD_FILTER];

    combineLatest([
      this.productService.getAllActive(),
      this.directoriesService.getStagesDir(),
      this.directoriesService.getStatusDir(),
      this.userService.getUsersByRole(RoleAuthority.CREDIT_MANAGER),
      this.userService.getUsersByRole(RoleAuthority.BO),
      this.dirBranchControllerService.getList(),
      (this.isAdmin || this.isRiskManager) ?
        this.userService.getUsersByRole(RoleAuthority.RM) : of([])
    ]).pipe(
      takeUntil(this.destroy)
    ).subscribe(([
                   product, stage, status, creditManagerUser, accepterUser, branches, rmUsers
                 ]) => {

      this.dashboardFilter.find(item => item.fcName === 'productId').options = product;
      this.dashboardFilter.find(item => item.fcName === 'stageId').options = stage;
      this.dashboardFilter.find(item => item.fcName === 'statusId').options = status;
      this.dashboardFilter.find(item => item.fcName === 'creditManagerId').options = creditManagerUser;
      this.dashboardFilter.find(item => item.fcName === 'accepterId').options = accepterUser;

      this.branches = branches;
      this.dashboardFilter.find(item => item.fcName === 'branchCode').options = branches;

      if (!!this.isAdmin || !!this.isRiskManager) {
        this.dashboardFilter.find(item => item.fcName === 'verifierId').options = rmUsers;
        this.dashboardFilter.find(item => item.fcName === 'rmId').options = rmUsers;
      }

      this.restoreFilterParams();
      this.cd.markForCheck();
    });
  }

  private openModal(applicationId: string | number, reassignRole: string) {
    this.dialog.open(UserReasignModalComponent, {
      width: '600px',
      height: '80vh',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { dependents: this.reassignUsersByRole, applicationId, reassignRole }
    }).afterClosed().pipe(tap(val => {
      if (val === 'SUCCESS') {
        this.refresh();
      }
    })).subscribe();
  }

  private checkRoute(params: string): void {
    this.isMonitoringQueue = false;
    localStorage.setItem(environment.previousRoute, `/pages/queues/${params || QUEUES_LINKS.all}`);

    this.dispatchSearchFilterData({ search: '' });
    this.searchInputValue = '';
    delete this.params.param;

    switch (params) {
      case QUEUES_LINKS.declines:
        this.setDeclinesData();
        break;
      case QUEUES_LINKS.archive:
        this.setArchiveData();
        break;
      case QUEUES_LINKS.userTasks:
        this.setUserTasksData();
        break;
      case QUEUES_LINKS.error:
        this.setErrorData();
        break;
      case QUEUES_LINKS.all:
        this.setAllData();
        break;
      case QUEUES_LINKS.monitoring:
        this.setMonitoringData();
        break;

      default:
        this.router.navigate([`/queues/${QUEUES_LINKS.all}`]);
        break;
    }
    this.setTableConfig(params);

    this.cd.markForCheck();
  }

  private setFilterParams(isDecline: boolean, isError: boolean, isIssued: boolean, isUserTask: boolean) {
    this.filterParams.isDecline = isDecline;
    this.filterParams.isError = isError;
    this.filterParams.isIssued = isIssued;
    this.filterParams.isUserTask = isUserTask;

    this.setCurrentFilterParams();
  }

  private setDeclinesData(): void {
    if (!!this.isDecisionMaker) {
      this.objColNameProps = this.declinesObjColNameProps;
    } else if (!!this.isVerifier) {
      this.objColNameProps = this.verifierDeclinesObjColNameProps;
    } else if (!!this.isCreditManagerBoss) {
      this.objColNameProps = this.creditManagerBossObjColNameProps;
    } else if (!!this.isCallCenterBoss) {
      this.objColNameProps = this.callCenterBossObjColNameProps;
    } else if (this.isVerifierBoss) {
      this.objColNameProps = this.verifierBossObjColNameProps;
    } else if (this.isDecisionMakerBoss) {
      this.objColNameProps = this.decisionMakerBossObjColNameProps;
    } else if (this.isDSABoss) {
      this.objColNameProps = this.dsaBossObjColNameProps;
    } else if (this.isHeadPos || this.isSupportPos || this.isRegManagerPos || this.isBO) {
      this.objColNameProps = this.allObjColNamePropsWithManagerPos;
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminDeclinesObjColNameProps;
    } else if (this.isAdminIT) {
      this.objColNameProps = this.adminITDeclinesObjColNameProps;
      this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else if (this.isRiskManager) {
      this.objColNameProps = this.declinesRmObjColNameProps;
    }  else if (this.isRiskManagerBoss) {
      this.objColNameProps = this.declinesRmBossObjColNameProps;
      this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }

    if (this.isRiskManager || this.isRiskManagerBoss) {
      this.functionForButtonEvent = this.onDeclineResetBtnClick;
    } else {
      this.functionForButtonEvent = this.onDeclineInvalidBtnClick;
    }
    this.setAction = QueuesActions.QueuesSetDeclineAction;
    this.setFilterParams(true, false, false, false);
    this.dispatchData(this.selectDeclines$);
  }

  private setArchiveData(): void {
    if (!!this.isCreditManagerBoss) {
      this.objColNameProps = this.creditManagerBossObjColNameProps;
    } else if (!!this.isVerifier) {
      this.objColNameProps = this.verifierObjColNameProps;
    } else if (!!this.isCallCenterBoss) {
      this.objColNameProps = this.callCenterBossObjColNameProps;
    } else if (this.isVerifierBoss) {
      this.objColNameProps = this.verifierBossObjColNameProps;
    } else if (this.isDecisionMakerBoss) {
      this.objColNameProps = this.decisionMakerBossObjColNameProps;
    } else if (this.isDSABoss) {
      this.objColNameProps = this.dsaBossObjColNameProps;
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminAllObjColNameProps;
    } else if (this.isAdminIT) {
      this.objColNameProps = this.adminITAllObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else if (this.isHeadPos || this.isSupportPos || this.isRegManagerPos ||
      this.isRiskManager || this.isRiskManagerBoss || this.isBO) {
      this.objColNameProps = this.allObjColNamePropsWithManagerPos;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.setAction = QueuesActions.QueuesSetArchiveAction;
    this.setFilterParams(false, false, true, false);
    this.dispatchData(this.selectArchive$);
  }

  private setUserTasksData(): void {
    if (!!this.isCreditManagerBoss) {
      this.objColNameProps = this.creditManagerBossObjColNameProps;
    } else if (!!this.isVerifier) {
      this.objColNameProps = this.verifierObjColNameProps;
    } else if (!!this.isCallCenterBoss) {
      this.objColNameProps = this.callCenterBossObjColNameProps;
    } else if (this.isVerifierBoss) {
      this.objColNameProps = this.verifierBossObjColNameProps;
    } else if (this.isDecisionMakerBoss) {
      this.objColNameProps = this.decisionMakerBossObjColNameProps;
    } else if (this.isDSABoss) {
      this.objColNameProps = this.dsaBossObjColNameProps;
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminArchivedObjColNameProps;
      this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
      this.functionForButtonEvent = this.onDeclineResetBtnClick;
    } else if (this.isAdminIT) {
      this.objColNameProps = this.adminITObjColNameProps;
      this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
      this.functionForButtonEvent = this.onDeclineResetBtnClick;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else if (this.isRiskManager) {
      this.objColNameProps = this.allObjColNamePropsWithManagerPos;
    } else if (this.isHeadPos || this.isSupportPos || this.isRegManagerPos || this.isBO) {
      this.objColNameProps = this.allObjColNamePropsWithManagerPos;
    } else if (this.isRiskManagerBoss) {
      this.objColNameProps = this.allObjColNamePropsWithRefreshApp;
      this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
      this.functionForButtonEvent = this.onDeclineResetBtnClick;
    }  else {
      this.objColNameProps = this.allObjColNameProps;
    }

    this.setAction = QueuesActions.QueuesSetUserTasksAction;
    this.setFilterParams(false, false, false, true);
    this.dispatchData(this.selectUserTasks$);
  }

  private setErrorData() {
    if (!!this.isCreditManagerBoss) {
      this.objColNameProps = this.creditManagerBossErrorsObjColNameProps;
    } else if (!!this.isVerifier) {
      this.objColNameProps = this.verifierErrorsObjColNameProps;
    } else if (!!this.isCallCenterBoss) {
      this.objColNameProps = this.callCenterBossErrorsObjColNameProps;
    } else if (this.isVerifierBoss) {
      this.objColNameProps = this.verifierBossErrorsObjColNameProps;
    } else if (this.isDecisionMakerBoss) {
      this.objColNameProps = this.decisionMakerBossErrorsObjColNameProps;
    } else if (this.isDSABoss) {
      this.objColNameProps = this.dsaBossErrorsObjColNameProps;
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminErrorsWithManagerPosObjColNameProps;
    } else if (this.isAdminIT) {
      this.objColNameProps = this.adminITErrorsObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else if(this.isRiskManagerBoss) {
      this.objColNameProps = this.errorWithoutRefreshObjColNameProps;
    } else if (this.isRiskManager || this.isHeadPos || this.isSupportPos ||
      this.isRegManagerPos || this.isBO) {
      this.objColNameProps = this.errorWithManagerPosObjColNameProps
    } else {
      this.objColNameProps = this.errorObjColNameProps;
    }
    this.functionForButtonEvent = this.restart;
    this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
    this.setAction = QueuesActions.QueuesSetErrorAction;
    this.setFilterParams(false, true, false, false);
    this.dispatchData(this.selectError$);
  }

  private setAllData() {
    if (!!this.isCreditManagerBoss) {
      this.objColNameProps = this.creditManagerBossObjColNameProps;
    } else if (!!this.isVerifier) {
      this.objColNameProps = this.verifierObjColNameProps;
    } else if (!!this.isCallCenterBoss) {
      this.objColNameProps = this.callCenterBossObjColNameProps;
    } else if (this.isVerifierBoss) {
      this.objColNameProps = this.verifierBossObjColNameProps;
    } else if (this.isDecisionMakerBoss) {
      this.objColNameProps = this.decisionMakerBossObjColNameProps;
    } else if (this.isDSABoss) {
      this.objColNameProps = this.dsaBossObjColNameProps;
    } else if (this.isHeadPos || this.isSupportPos || this.isRegManagerPos||
      this.isRiskManager || this.isRiskManagerBoss || this.isBO) {
      this.objColNameProps = this.allObjColNamePropsWithManagerPos;
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminAllObjColNameProps;
    } else if (this.isAdminIT) {
      this.objColNameProps = this.adminITAllObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.setAction = QueuesActions.QueuesSetAllAction;
    this.setFilterParams(false, false, false, false);
    this.dispatchData(this.selectAll$);
  }

  private setMonitoringData() {
    this.isMonitoringQueue = true;
    this.objColNameProps = this.monitoringObjColNameProps;
    this.setAction = QueuesActions.QueuesSetMonitoringAction;
    this.functionForButtonEvent = this.restartRefinance;
    this.dispatchData(this.selectMonitoring$);
  }

  private dispatchData(select$: Observable<any>) {
    this.restoreFilterParams();
    this.restoreSearchParams();
    this.dataSource = new TableData(this.objColNameProps, []);
    this.cd.markForCheck();
    if (!!this.subscription$) {
      this.subscription$.unsubscribe();
    }

    this.subscription = select$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(res => {
        const resWithDeactivationField = res.map((obj: ApplicationPagedInfoDto) => {
          const reassignmentCondition: boolean =
            (obj.statusId && obj.statusId.toString().includes('DECLINE')) ||
            (obj.statusId && obj.statusId.toString().includes('ISSUED'));

          const deactivationCondition: boolean =
            !!obj.stageId && obj.stageId === 'COMPLETED' && !!obj.statusId && obj.statusId === 'DECLINE_INVALID';

          obj = { ...obj, userReassignment: !reassignmentCondition };

          obj = { ...obj, isAvailForDeactivation: !deactivationCondition };

          obj = {
            ...obj,
            decisionMakerDisplay: this.getDecisionMakerValue(obj)
          };

          if (this.isMonitoringQueue) {
            const refreshCondition: boolean = obj.stageId === 'ERROR' && obj.statusId === 'ERROR';
            obj = { ...obj, refresh: refreshCondition };
          }

          return obj;
        });

        this.dataSource = new TableData(this.objColNameProps, resWithDeactivationField);
        this.cd.markForCheck();
      });

    if (this.params.page !== 0) {
      this.changePage.next(1);
    } else {
      this._store.dispatch(this.setAction({ data: { ...this.params }, filter: { ...this.filterParams } }));
    }

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
      QueuesTasksSetFilterAction({
        filterParams: { ...params }
      })
    );
  }

  private dispatchSearchFilterData(params: SearchParams) {
    this._store.dispatch(
      QueuesTasksSetSearchAction({
        searchParams: { ...params }
      })
    );
  }

  private openEnterPersDataModal(data: ApplicationPagedInfoDto) {
    const config: EnterPersDataModalConfig = {
      data,
      readonly: false
    };
    this.dialog
      .open(EnterPersDataModalComponent, {
        // height: '40vh',
        maxWidth: '40vw',
        width: '50vw',
        panelClass: 'custom-panel-cls',
        data: config
      })
      .afterClosed()
      .subscribe(value => {
      });
  }

  private setTableConfig(params: string) {
    this.objColNameProps.forEach(col => {
      if (col.value === 'TableHeader.Status') {
        col.setCellClick(this.setOnErrorStatusEvent());
      }
    });
    this.cd.markForCheck();
  }

  private setOnErrorStatusEvent = (): TableCellConfig<any> => {
    const canSeeDecline = this.isAdminIT
      || this.isAdmin
      || this.isCreditManagerBoss
      || this.isCreditManager
      || this.isRiskManager
      || this.isRiskManagerBoss
      || this.isDSA
      || this.isBusinessOwner
      || this.isHeadPos
      || this.isRegManagerPos
      || this.isSupportPos;
    const canSeeError = this.isAdminIT || this.isAdmin || this.isRiskManager || this.isRiskManagerBoss;

    return {
      class: item => (canSeeError && (item.statusId === 'ERROR' || (item.statusReports && item.statusReports.id === 'Error')))
      || (canSeeDecline && (item.statusId === 'DECLINE' || (item.statusReports && item.statusReports.id === 'Refusal'))) ? 'link' : '',
      visible: item => true,
      clickEvent: (item, e) => {
        if ( canSeeError && (item.statusId === 'ERROR' || (item.statusReports && item.statusReports.id === 'Error'))  ) {
          e.stopPropagation();
          this.applicationControllerService.applicationGetErrorMessage(item.id).subscribe(res => {
            console.log(res)
            if (!!res) {
              item.errorMessage = res.message;
              this.showErrorModal(item);
            }
          });
        }
        if ( canSeeDecline && (item.statusId === 'DECLINE' || (item.statusReports && item.statusReports.id === 'Refusal'))  ) {
          e.stopPropagation();
          if (item.nameRuForCreditManager || item.nameAmForCreditManager) {
            this.showErrorModal(item);
          }
        }
      }
    };
  };

  private showErrorModal = (data: ApplicationPagedInfoDto): void => {
    this.dialog.open(QueueErrorModalComponent, {
      width: '600px',
      // height: '80vh',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    }).afterClosed().pipe(tap(val => {
      if (val === 'SUCCESS') {
        this.refresh();
      }
    })).subscribe();
  };


  private getTableDataByLink() {
    switch (this.paramsTitle) {
      case QUEUES_LINKS.declines:
        this.dispatchData(this.selectDeclines$);
        break;
      case QUEUES_LINKS.userTasks:
        this.dispatchData(this.selectUserTasks$);
        break;
      case QUEUES_LINKS.error:
        this.dispatchData(this.selectError$);
        break;
    }
  }

}
