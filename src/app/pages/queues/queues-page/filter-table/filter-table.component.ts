import * as CryptoJS from 'crypto-js';
import * as QUEUES_HEADERS from './constants/queue-table-headers';
import * as QueuesActions from '@app/store/actions/queues.actions';

import { ActionCreator, Store, select } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ApplicationControllerService,
  BpmFrontControllerService,
  DirectoriesService,
  ProductCategoryControllerService
} from '@app/api';
import {
  ApplicationPagedInfoDto,
  AuthState,
  IFilterField,
  IFilteredParams,
  PaginationAndSortingDto,
  RoleAuthority,
  SearchParams,
  TableData,
  TableDataHeader
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
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
import { ProductGroup } from '@app/constants/product-group';
import { QUEUES_LINKS } from '../queues-page.component';
import { ToastService } from '@app/services/toast.service';
import { TypedAction } from '@ngrx/store/src/models';
import { UserControllerService } from '@app/api/user-controller.service';
import { UserReasignModalComponent } from '@app/shared/modals/user-reasign-modal/user-reasign-modal.component';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnDestroy, OnInit, OnDestroy {
  dataSource: TableData<ApplicationPagedInfoDto> = new TableData();
  subscription$: Subscription;

  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isAdmin: boolean = false;
  isCreditManagerBoss: boolean = false;
  isCallCenterBoss: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;
  isDSABoss: boolean = false;
  isVideoBank: boolean = false;
  isVideoBankBoss: boolean = false;
  isRefreshBtnInactive: boolean = false;
  isMonitoringQueue: boolean = false;
  isBtnRestartAllInactive: boolean = false;

  allObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.all;
  verifierObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifier;
  creditManagerBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.creditManagerBoss;
  accepterObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.accepter;
  callCenterBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.callCenterBoss;
  verifierBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierBoss;
  decisionMakerBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.decisionMakerBoss;
  dsaBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.dsaBoss;
  adminDeclinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminDeclines;
  verifierDeclinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierDeclines;
  adminArchivedObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminArchived;
  errorObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.error;
  verifierErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierErrors;
  creditManagerBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.creditManagerBossErrors;
  accepterErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.accepterErrors;
  callCenterBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.callCenterBossErrors;
  verifierBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.verifierBossErrors;
  decisionMakerBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.decisionMakerBossErrors;
  dsaBossErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.dsaBossErrors;
  adminErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminErrors;
  declinesObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.declines;
  monitoringObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.monitoring;
  videoBankBossObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.videoBankBoss;

  objColNameProps: TableDataHeader[] = [];

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 20;
  restartAllBtn = { name: 'Buttons.RestartAll', visible: false };

  functionForButtonEvent: (event: ApplicationPagedInfoDto) => void;
  functionForDeclineAdminEvent: (event: ApplicationPagedInfoDto) => void;

  queuesFilter: IFilterField[];
  filterFields: IFilterField[];
  setAction: ActionCreator<
    | QueuesActions.QueuesActions.QueuesSetArchive
    | QueuesActions.QueuesActions.QueuesSetUserTasks
    | QueuesActions.QueuesActions.QueuesSetDecline
    | QueuesActions.QueuesActions.QueuesSetError
    | QueuesActions.QueuesActions.QueuesSetAll
    | QueuesActions.QueuesActions.QueuesSetMonitoring,
    (props: {
      data: PaginationAndSortingDto;
      filter: IFilteredParams;
    }) => { data: PaginationAndSortingDto; filter: IFilteredParams } & TypedAction<string>
  >;

  subscription: Subscription;

  params: PaginationAndSortingDto = {
    page: 0,
    size: this.itemLimit
  };

  searchInputValue: string;
  currentFilterValues: IFilteredParams;

  filterParams: IFilteredParams = {
    createdDate: '',
    productId: '',
    stageId: '',
    status: '',
    creditManagerId: '',
    videoBankId: '',
    callCenterId: '',
    verifierId: '',
    decisionMakerId: '',
    dsaId: '',
    accepterId: ''
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
  private reassignUsersByRole: AuthState[];

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
    private productService: ProductCategoryControllerService,
    private userService: UserControllerService
  ) {}

  ngOnInit(): void {
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isAdmin = this.credentialsService.isAdmin;
    this.isCreditManagerBoss = this.credentialsService.isCreditManagerBoss;
    this.isCallCenterBoss = this.credentialsService.isCallCenterBoss;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;
    this.isDSABoss = this.credentialsService.isDSABoss;
    this.isVideoBank = this.credentialsService.isVideoBank;
    this.isVideoBankBoss = this.credentialsService.isVideoBankBoss;

    this.createFilterParamsSubscription();
    this.createSearchParamsSubscription();
    this.setCurrentFilterParams();
    this.createActivatedRouteSubscription();

    this.fillDropdownFilter();

    this.selectUserData$.pipe(takeUntil(this.destroy)).subscribe(res => {
      if (res && res.id) {
        this.userId = res.id.toString();
      }
    });
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

  selectedFilterFieldsEvent(options: { [key: string]: string }) {
    this.dispatchTasksFilterData(options);

    this.filterParams = options;
    this.changePage.next(1);
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
    // const appId = item.id || item.applicationId;
    // const path: string = item.productGroupId === ProductGroup.Retail ? '../stages/view' : '../mass-segment-stages/view';

    let appId;
    let path;
    if (this.isMonitoringQueue) {
      appId = item.appId || item.applicationId;
      path = '../stages/view'
    } else {
      appId = item.id || item.applicationId;
      path = item.productGroupId === ProductGroup.Retail ? '../stages/view' : '../mass-segment-stages/view';
    }

    const cryptoHash = CryptoJS.PBKDF2(appId.toString(), this.userId.toString()).toString();

    this.router.navigate([path, appId, cryptoHash], { relativeTo: this.activatedRoute });
  }

  sortingDataEvent(sortData: Sort): void {}

  onSearchEvent(inputVal: string): void {
    // if (!!inputVal) {
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
      this.dispatchSearchFilterData({ search: '' });

      delete this.params.param;
      this.changePage.next(1);
    }
  }

  restart(event: ApplicationPagedInfoDto) {
    this.isRefreshBtnInactive = true;
    this.bpmFrontControllerService
      .signalRepeat(event.id)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isRefreshBtnInactive = false))
      )
      .subscribe(res => this.restartCallback(this.selectError$));
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
        reassignRole = RoleAuthority.VERIFIER;
        break;

      case 'decisionMaker':
        reassignRole = RoleAuthority.DECISION_MAKER;
        break;

      case 'dsa':
        reassignRole = RoleAuthority.DSA;
        break;

      default:
        break;
    }

    if (reassignRole !== null && this.isCanReassign) {
      this.userService
        .getUsersByRole(reassignRole)
        .pipe(takeUntil(this.destroy))
        .subscribe((dep: AuthState[]) => {
          this.reassignUsersByRole = dep;
          this.openModal(ev.row.id, reassignRole);
        });
    }
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

  private fillDropdownFilter() {
    this.dashboardFilter = [...DASHBOARD_FILTER];

    this.productService.getAllActive().subscribe(product => {
      this.dashboardFilter.find(item => item.fcName === 'productId').options = product;
    });

    this.directoriesService.getStagesDir().subscribe(stage => {
      this.dashboardFilter.find(item => item.fcName === 'stageId').options = stage;
    });

    this.directoriesService.getStatusDir().subscribe(status => {
      this.dashboardFilter.find(item => item.fcName === 'status').options = status;
    });

    this.userService.getUsersByRole(RoleAuthority.CREDIT_MANAGER).subscribe(creditManagerUser => {
      this.dashboardFilter.find(item => item.fcName === 'creditManagerId').options = creditManagerUser;
    });

    this.userService.getUsersByRole(RoleAuthority.CALL_CENTER).subscribe(callCenterUser => {
      this.dashboardFilter.find(item => item.fcName === 'callCenterId').options = callCenterUser;
    });

    this.userService.getUsersByRole(RoleAuthority.VIDEO_BANK).subscribe(videoBankUser => {
      this.dashboardFilter.find(item => item.fcName === 'videoBankId').options = videoBankUser;
    });

    if (!!this.isAdmin || !!this.isVerifier || !!this.isVerifierBoss) {
      this.userService.getUsersByRole(RoleAuthority.VERIFIER).subscribe(verifierUser => {
        this.dashboardFilter.find(item => item.fcName === 'verifierId').options = verifierUser;
      });
    } else {
      this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'verifierId'), 1);
    }
    if (!!this.isAdmin || !!this.isDecisionMaker || !!this.isDecisionMakerBoss) {
      this.userService.getUsersByRole(RoleAuthority.DECISION_MAKER).subscribe(decisionMakerUser => {
        this.dashboardFilter.find(item => item.fcName === 'decisionMakerId').options = decisionMakerUser;
      });
    } else {
      this.dashboardFilter.splice(this.dashboardFilter.findIndex(item => item.fcName === 'decisionMakerId'), 1);
    }

    this.userService.getUsersByRole(RoleAuthority.DSA).subscribe(dsaUser => {
      this.dashboardFilter.find(item => item.fcName === 'dsaId').options = dsaUser;
    });
  }

  private openModal(applicationId: string | number, reassignRole: string) {
    this.dialog.open(UserReasignModalComponent, {
      width: '600px',
      height: '80vh',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: { dependents: this.reassignUsersByRole, applicationId, reassignRole }
    });
  }

  private checkRoute(params: string): void {
    this.isMonitoringQueue = false;
    localStorage.setItem('previousRoute', `/mode/lending/queues/${params || QUEUES_LINKS.all}`);

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
        this.router.navigate([`/lending/queues/${QUEUES_LINKS.all}`]);
        break;
    }
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
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminDeclinesObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.functionForButtonEvent = this.onDeclineInvalidBtnClick;
    this.setAction = QueuesActions.QueuesSetDeclineAction;
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
      this.objColNameProps = this.adminArchivedObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.setAction = QueuesActions.QueuesSetArchiveAction;
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
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.setAction = QueuesActions.QueuesSetUserTasksAction;
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
      this.objColNameProps = this.adminErrorsObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.errorObjColNameProps;
    }
    this.functionForButtonEvent = this.restart;
    this.functionForDeclineAdminEvent = this.onDeclineAdminBtnClick;
    this.setAction = QueuesActions.QueuesSetErrorAction;
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
    } else if (this.isAdmin) {
      this.objColNameProps = this.adminArchivedObjColNameProps;
    } else if (this.isVideoBankBoss) {
      this.objColNameProps = this.videoBankBossObjColNameProps;
    } else {
      this.objColNameProps = this.allObjColNameProps;
    }
    this.setAction = QueuesActions.QueuesSetAllAction;
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
    this.dataSource = new TableData(this.objColNameProps, []);

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

          if (this.isMonitoringQueue) {
            const refreshCondition: boolean = obj.stageId === 'ERROR' && obj.statusId === 'ERROR';
            obj = { ...obj, refresh: refreshCondition };
          }

          return obj;
        });

        this.dataSource = new TableData(this.objColNameProps, resWithDeactivationField);
      });

    if (this.params.page !== 0) {
      this.changePage.next(1);
    } else {
      this._store.dispatch(this.setAction({ data: { ...this.params }, filter: { ...this.filterParams } }));
    }
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
}
