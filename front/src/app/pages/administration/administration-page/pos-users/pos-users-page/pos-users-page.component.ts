import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePage } from '@app/pages/administration/administration-base/base-page';
import {BehaviorSubject, combineLatest, forkJoin, Observable} from 'rxjs';
import {AuthState, RoleAuthority, RoleDto, UserPosDto, UserPosForTable} from '@app/_models';
import { select, Store } from '@ngrx/store';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { TradingCompanyPointsService } from '@app/api/trading-company-points.service';
import { USERS_POS_FORM, USERS_POS_HEADERS } from '@app/pages/administration/administration-page/pos-users/config';
import { takeUntil, tap } from 'rxjs/operators';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { PosUsersResourceService } from '@app/api/pos-users-resource.service';
import { UserControllerService } from '@app/api/user-controller.service';
import {CredentialsService} from '@app/services/authentication';
import {
  DirTradingCompanyPointDto, DirTradingCompanyPointForTable
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';

@Component({
  selector: 'ngx-pos-users-page',
  templateUrl: './pos-users-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class PosUsersPageComponent  extends BasePage<UserPosDto> implements OnInit, OnDestroy {
  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));


  private optionsList: Record<string, any[]> = {
    statuses: [],
    roles: [],
    points: [],
  };

  private _optionList$ = new BehaviorSubject<Record<string, any[]>>(this.optionsList)

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    protected readonly credentialsService: CredentialsService,
    protected tradingCompanyPointsService: TradingCompanyPointsService,
    private userControllerService: UserControllerService,
    protected posUsersResourceService: PosUsersResourceService,
  ) {
    super(USERS_POS_HEADERS, posUsersResourceService, credentialsService)
  }

  ngOnInit(): void {
    this.getDirections();
    this.defaultMapper = UserPosForTable;
    this.fetchList();
    // this.fetchList(UserPosForTable);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  selectedItem(event: UserPosDto) {
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      points: [],
      authorities: [],
      accessESign: false,
      active: this.allowActivatePosUsers,
    } as any);
  }


  private getDirections() {
    forkJoin([
      this.tradingCompanyPointsService.getList(),
      this.userControllerService.getUserRoles()
    ]).pipe(tap(([points, roles]) => {
      this.optionsList = {
        ...this.optionsList,
        points: this.pointsRemap(points),
        roles: this.getFilterRoles(roles)
      };

      this._optionList$.next(this.optionsList)
    })).subscribe();
  }

  private updateCreate = (data: UserPosDto, isUpdate?: boolean) => {

    const userNames = this.listData.map(e => e.username).filter(e => isUpdate ? e !== data.username : e);

    this.optionsList.userNames = userNames;

    data.points = this.pointsRemap(data.points);

    data.mobilePhone =  data.mobilePhone ? data.mobilePhone.replace('+374', '') : '';

    this.showDialog(
      {
        title: isUpdate ? 'ClientModal.EditUser' : 'ClientModal.CreateUser',
        dataInfo: data,
        formConfig: USERS_POS_FORM,
        showSaveButton: isUpdate && this.allowEditPosUsers,
        showCreateButton: !isUpdate && this.allowEditPosUsers,
        disabledFields: isUpdate || !this.allowEditPosUsers,
        optionsList: this.optionsList,
        optionsList$: this._optionList$,
        showEditButton: this.allowEditPosUsers && isUpdate,
        showCancelButton: !this.allowEditPosUsers,
        showEditActivateDeactivateButtons: this.allowActivatePosUsers && this.allowEditPosUsers,
        activateDeactivateProp: 'active',
        ignoreDefaultValueForCheckBox: true,
        containerClass: 'grid-two-cols',
      },
      (attributesBeforeRequest: UserPosDto) => {
        const cloneParams = Object.assign({}, this.params);

        attributesBeforeRequest.mobilePhone = attributesBeforeRequest.mobilePhone.includes('+374') ? attributesBeforeRequest.mobilePhone : '+374' + attributesBeforeRequest.mobilePhone;

        attributesBeforeRequest.fio = `${attributesBeforeRequest.firstName} ${attributesBeforeRequest.lastName} ${attributesBeforeRequest.patronymic || ''}`;

        attributesBeforeRequest.changedByUsername = null;

        if(!this.allowActivatePosUsers) {
          attributesBeforeRequest.active = false;
        }

        this.posUsersResourceService[`${isUpdate ? 'update' : 'create'}`](attributesBeforeRequest)
          .pipe(tap(() => {
            // this.fetchList(UserPosForTable);
            this.fetchList();
          })).subscribe();

      });
  };

  private showDialog(data: AdministrationBaseModalData<UserPosDto, any>, callback: (val: UserPosDto) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
    dialogRef.componentInstance.emitActivateData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private getFilterRoles = (roles: RoleDto[]): RoleDto[] => {
    // return roles.filter(el => el.authority.includes('POS'));
    return roles.filter(el => el.authority === RoleAuthority.TT1_POS || el.authority === RoleAuthority.TT2_POS)
  }

  private pointsRemap = (data: DirTradingCompanyPointDto[]) => {
    return data.map(d => {
      return {
        ...d,
        nameAm: `${d.code} ` + d.nameAm + ` ${d.address}`,
        nameRu: `${d.code} ` + d.nameRu + ` ${d.address}`,
      }
    });
  }

}
