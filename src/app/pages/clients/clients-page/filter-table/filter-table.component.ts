import * as ClientsActions from '@app/store/actions/clients.actions';
import * as CryptoJS from 'crypto-js';
import * as QUEUES_HEADERS from './constants/queue-table-headers';
import * as _ from 'lodash';

import { ActionCreator, Store, select } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AuthState,
  IFilterField,
  IFilteredParams,
  PaginationAndSortingDto,
  ResponseCommonDto,
  TableData,
  TableDataHeader
} from '@app/_models';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  selectAll,
  selectClientSearchParams,
  selectCompleted,
  selectError,
  selectInProgress
} from '@app/store/selectors/clients.selector';

import { CLIENTS_LINKS } from '../clients-page.component';
import { ClientControllerService } from './../../../../api/client-controller.service';
import { ClientPagedInfoDto } from '@app/_models/api-models/client';
import { CredentialsService } from '@app/services/authentication';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { NewClientRequestComponent } from '@app/shared/modals/new-client-request/new-client-request.component';
import { ToastService } from '@app/services/toast.service';
import { TypedAction } from '@ngrx/store/src/models';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnDestroy, OnInit, OnDestroy {
  dataSource: TableData<ClientPagedInfoDto> = new TableData();
  subscription$: Subscription;
  isRestartBtnInactive: boolean = false;
  isMonitoringQueue: boolean = false;
  isBtnRestartAllInactive: boolean = false;
  isBtnNewClientRequestDisable: boolean = true;

  allObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.all;
  adminErrorsObjColNameProps: TableDataHeader[] = QUEUES_HEADERS.adminErrors;
  objColNameProps: TableDataHeader[] = [];

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 20;
  btnName = 'Новый запрос';

  functionForButtonEvent: (event: ClientPagedInfoDto) => void;
  functionForDeclineAdminEvent: (event: ClientPagedInfoDto) => void;

  queuesFilter: IFilterField[];
  filterFields: IFilterField[];
  setAction: ActionCreator<
    | ClientsActions.ClientsActions.ClientsSetInProgress
    | ClientsActions.ClientsActions.ClientsSetCompleted
    | ClientsActions.ClientsActions.ClientsSetError
    | ClientsActions.ClientsActions.ClientsSetAll,
    (props: { data: PaginationAndSortingDto }) => { data: PaginationAndSortingDto } & TypedAction<string>
  >;

  subscription: Subscription;

  params: PaginationAndSortingDto = {
    page: 0,
    size: this.itemLimit,
    sort: 'id,desc'
  };

  searchInputValue: string;
  currentFilterValues: IFilteredParams;
  dashboardFilter: IFilterField[];

  selectClientSearchOptions$ = this._store.pipe(select(selectClientSearchParams));
  selectCompleted$ = this._store.pipe(select(selectCompleted));
  selectInProgress$ = this._store.pipe(select(selectInProgress));
  selectError$ = this._store.pipe(select(selectError));
  selectAll$ = this._store.pipe(select(selectAll));
  userId: string;
  selectUserData$ = this._store.pipe(select(selectUserData));

  private currentRoles: Record<string, boolean>;
  private paramsTitle: string;
  private isCanReassign: boolean = true;
  private destroy: Subject<boolean> = new Subject<boolean>();
  private reassignUsersByRole: AuthState[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _store: Store<IAppState>,
    private credentialsService: CredentialsService,
    private clientService: ClientControllerService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);

    this.isBtnNewClientRequestDisable = !(this.currentRoles.isCreditManager || this.currentRoles.isAdmin);

    this.createSearchParamsSubscription();
    this.createActivatedRouteSubscription();

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
    });
  }

  createSearchParamsSubscription() {
    this.selectClientSearchOptions$.pipe(takeUntil(this.destroy)).subscribe((searchValue: string) => {
      if (searchValue) {
        this.searchInputValue = searchValue;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  selectedPageEvent(pageNumber: number): void {
    this.params.page = pageNumber - 1;
    this._store.dispatch(this.setAction({ data: { ...this.params } }));
  }

  selectedItemEvent(client: ClientPagedInfoDto): void {
    const clientId = client.id;
    const path: string = '../client-data/view';
    const cryptoHash = CryptoJS.PBKDF2(clientId.toString(), this.userId.toString()).toString();

    this.router.navigate([path, clientId, cryptoHash], { relativeTo: this.activatedRoute });
  }

  onSearchEvent(inputVal: string): void {
    if (inputVal) {
      this.dispatchSearchFilterData(inputVal);
    }
  }

  onClearEvent(value: boolean) {
    this.checkRoute(this.paramsTitle);
    this._store.dispatch(ClientsActions.ClientsResetFilterAction());
  }

  newRequest() {
    if (this.currentRoles.isCreditManager || this.currentRoles.isAdmin) {
      const dialogRef = this.dialog.open(NewClientRequestComponent, {
        width: '30%',
        height: '70%',
        panelClass: 'custom-panel-cls'
      });

      dialogRef
        .afterClosed()
        .pipe(
          switchMap(async () => this.dispatchData(this.selectAll$)),
          takeUntil(this.destroy)
        )
        .subscribe();
    }
  }

  private checkRoute(params: string): void {
    this.isMonitoringQueue = false;
    localStorage.setItem('previousRoute', `/mode/clients/${params || CLIENTS_LINKS.all}`);
    switch (params) {
      case CLIENTS_LINKS.completed:
        this.setCompletedData();
        break;
      case CLIENTS_LINKS.inProgress:
        this.setInProgressData();
        break;
      case CLIENTS_LINKS.error:
        this.setErrorData();
        break;
      case CLIENTS_LINKS.all:
        this.setAllData();
        break;

      default:
        this.router.navigate([`/clients/${CLIENTS_LINKS.all}`]);
        break;
    }
  }

  private setCompletedData(): void {
    this.objColNameProps = this.allObjColNameProps;
    this.setAction = ClientsActions.ClientsSetCompletedAction;
    this.dispatchData(this.selectCompleted$);
  }

  private setInProgressData(): void {
    this.objColNameProps = this.allObjColNameProps;
    this.setAction = ClientsActions.ClientsSetInProgressAction;
    this.dispatchData(this.selectInProgress$);
  }

  private setErrorData() {
    this.objColNameProps = this.currentRoles.isAdmin ? this.adminErrorsObjColNameProps : this.allObjColNameProps;
    this.functionForButtonEvent = this.restart;
    this.setAction = ClientsActions.ClientsSetErrorAction;
    this.dispatchData(this.selectError$);
  }

  private setAllData() {
    this.objColNameProps = this.allObjColNameProps;
    this.setAction = ClientsActions.ClientsSetAllAction;
    this.dispatchData(this.selectAll$);
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
      .subscribe((res: ClientPagedInfoDto[]) => {
        this.dataSource = new TableData(this.objColNameProps, res);
      });

    if (this.params.page !== 0) {
      this.changePage.next(1);
    } else {
      this._store.dispatch(this.setAction({ data: { ...this.params } }));
    }
  }

  private dispatchSearchFilterData(searchValue: string = '') {
    this._store.dispatch(
      ClientsActions.ClientsSetSearchAction({
        value: searchValue
      })
    );
  }

  private restart(event: ClientPagedInfoDto) {
    this.isRestartBtnInactive = true;
    this.clientService
      .repeat(event.id)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isRestartBtnInactive = false))
      )
      .subscribe((res: ResponseCommonDto) => this.restartCallback(res, this.selectError$));
  }

  private restartCallback(res: ResponseCommonDto, select$: Observable<any>) {
    if (res) {
      this.dispatchData(select$);
      this.toastService.viewMsg('SuccessMessage.AppSuccessRestarted', 'success');
    } else {
      this.toastService.viewMsg('Заявка не перезапущена', 'warning');
    }
  }
}
