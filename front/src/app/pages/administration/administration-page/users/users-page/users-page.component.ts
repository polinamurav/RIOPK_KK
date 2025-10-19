import { AdmCreateUserAction, AdmSetUserAction, AdmUpdateUserAction } from '@app/store/actions/administration.actions';
import {
  AuthState,
  IUserModalConfig,
  PageDTO,
  PaginationAndSortingDto, RoleAuthority,
  RoleDto,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UserModalComponent } from '@app/shared/components/modals/user-modal/user-modal.component';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { UserControllerService } from '@app/api/user-controller.service';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { selectUsers } from '@app/store/selectors/administration.selector';
import { AllowEditDirective } from '@app/pages/administration/administration-base/base-page';
import { CredentialsService } from '@app/services/authentication';
import { TradingCompanyPointsService } from '@app/api/trading-company-points.service';
import { DirTradingCompanyPointDto } from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';

@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent extends AllowEditDirective implements OnInit, OnDestroy {
  currentUserData: AuthState;

  totalCount: number;

  selectedPage: number = 0;

  itemLimit: number = 20;

  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString(),
    sort: 'username,asc'
  };

  dataSource: TableData<UserDto>;

  userRoles: RoleDto[];
  partners: DirPartner[];
  points$ = new BehaviorSubject<DirTradingCompanyPointDto[]>([]);

  selectUsers$: Observable<PageDTO<UserDto>> = this._store.pipe(select(selectUsers));

  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));

  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('code', 'Administration.TableHeaders.Key', 'string'),
    new TableDataHeader('username', 'Administration.TableHeaders.Login', 'string', 'username'),
    new TableDataHeader('fio', 'Administration.TableHeaders.Fio', 'string'),
    new TableDataHeader('branchCode', 'Administration.TableHeaders.Branch', 'ru', 'branchCode'),
    new TableDataHeader('email', 'Administration.TableHeaders.Email', 'string'),
    new TableDataHeader('created', 'Administration.TableHeaders.DateOfCreation', 'date'),
    new TableDataHeader('active', 'Administration.TableHeaders.Active', 'status'),
    new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string')
    // new TableDataHeader('dirDepartment.nameRu', 'ОТДЕЛ', 'string', 'dirDepartment.nameRu'),
    /* new TableDataHeader('bossUser.nameRu', 'НАЧАЛЬНИК', 'string', 'bossUser.nameRu'), */
  ];

  changePage: Subject<number> = new Subject<number>();

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private _store: Store<IAppState>,
    protected readonly credentialsService: CredentialsService,
    protected tradingCompanyPointsService: TradingCompanyPointsService,
    private userControllerService: UserControllerService
  ) {
    super(credentialsService);
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.selectUsers$
      .pipe(
        tap((res: PageDTO<UserDto>) => {
          if (res) {
            this.totalCount = res.totalElements;
          }
        }),
        filter(res => !!res),
        pluck('content'),
        switchMap(res => {
          return this.selectCurrentUserData$.pipe(map(userData => ({ res, userData })));
        }),
        takeUntil(this.destroy)
      )
      .subscribe(({ res, userData }) => {
        this.currentUserData = userData;
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });

    this.getDirections();

    this.userControllerService.getUserRoles().subscribe(roles => {
      this.userRoles = roles;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetUserAction({
        data: { ...this.params }
      })
    );
  }

  sortingDataEvent(sortData: Sort): void {
    const sortStr = sortData.active + ',' + sortData.direction;
    this.params.sort = sortStr;
    this.dispatchSortAndPaginationData();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params.search = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  showDialog(data: IUserModalConfig, callback: (data: UserDto) => void) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '1000px',
      height: '80%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    (dialogRef.componentInstance as UserModalComponent).emitData.pipe(takeUntil(this.destroy)).subscribe(callback);
  }

  activateDeactivateUser(id: number, status: string, callback: (isActive: boolean) => boolean) {
    this.userControllerService
      .activateDeactivate(id)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        if (status === 'activate') {
          callback(true);
        } else if (status === 'deactivate') {
          callback(false);
        }
        this.dispatchSortAndPaginationData();
      });
  }

  selectedItem(item: UserDto) {
    this.showDialog(
      {
        currentUserData: this.currentUserData,
        activateDeactivateUser: this.activateDeactivateUser.bind(this, item.id),
        clientData: item,
        showAdminModal: true,
        userRoles: this.userRoles,
        partners: this.partners,
        points$: this.points$,
        isActiveUser: item.active,
        title: 'ClientModal.EditUser'
      },
      (data: UserDto) => {
        this._store.dispatch(
          AdmUpdateUserAction({
            paginationData: { ...this.params },
            data
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this._store.dispatch(AdmSetUserAction({ data: { ...this.params } }));
  }

  openNewUserDialog() {
    this.showDialog(
      {
        currentUserData: this.currentUserData,
        showAdminModal: true,
        userRoles: this.getFilterRoles(this.userRoles),
        partners: this.partners,
        points$: this.points$,
        showSendButton: true,
        title: 'ClientModal.CreateUser'
      },
      (data: UserDto) => {
        this._store.dispatch(
          AdmCreateUserAction({
            paginationData: { ...this.params },
            data
          })
        );
      }
    );
  }

  private getFilterRoles = (roles: RoleDto[]): RoleDto[] => {
    return roles.filter(el => el.authority !== RoleAuthority.TT1_POS && el.authority !== RoleAuthority.TT2_POS)
  }

  private getDirections() {
    forkJoin([this.tradingCompanyPointsService.getList()])
      .pipe(
        tap(([points]) => {
          this.points$.next(points);
        })
      )
      .subscribe();
  }
}
