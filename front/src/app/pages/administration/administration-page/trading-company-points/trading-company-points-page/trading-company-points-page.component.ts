import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePage, BasePageService} from '@app/pages/administration/administration-base/base-page';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {AttachmentSaveData, AuthState, ModalData, PageDTO, RoleAuthority, UserDto, UserPosDto} from '@app/_models';
import {select, Store} from '@ngrx/store';
import {selectUserData} from '@app/store/selectors/auth.selector';
import {IAppState} from '@app/store/state/app.state';
import {MatDialog} from '@angular/material/dialog';
import {
  TRADING_COM_POINTS_FORM,
  TRADING_COM_POINTS_HEADERS, TRADING_COM_POINTS_HEADERS_WTOUT_OPZ
} from '@app/pages/administration/administration-page/trading-company-points/config/config';
import {TradingCompanyPointsService} from '@app/api/trading-company-points.service';
import {
  DirTradingCompanyPointDto,
  DirTradingCompanyPointForTable
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import {takeUntil, tap} from 'rxjs/operators';
import {TradingCompaniesService} from '@app/api/trading-companies.service';
import {CredentialsService} from "@app/services/authentication";
import {selectRetailDirectory} from "@app/store/selectors/retail-directories.selector";
import {RetailDirectoriesNames} from "@app/_models/api-models/retail-directories-names";
import {DirBranchControllerService} from "@app/api";
import {PosUsersResourceService} from "@app/api/pos-users-resource.service";
import {selectUsers} from "@app/store/selectors/administration.selector";
import {MimeTypes} from "@app/components/constants/mime-types";
import {DownloadUploadFileService} from "@app/services/download-upload-file.service";

@Component({
  selector: 'ngx-trading-company-points-page',
  templateUrl: './trading-company-points-page.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class TradingCompanyPointsPageComponent extends BasePage<DirTradingCompanyPointDto> implements OnInit, OnDestroy {

  selectCurrentUserData$: Observable<AuthState> = this._store.pipe(select(selectUserData));
  selectUsers$: Observable<PageDTO<UserDto>> = this._store.pipe(select(selectUsers));

  private optionsList: Record<string, any[]> = {
    tradingCompanies: [],
    creditPrograms: [],
    statuses: [],
    branches: [],
    branchesForSelect: [],
    managers: [],
    users: []
  };
  private _optionList$ = new BehaviorSubject<Record<string, any[]>>(this.optionsList)

  private tableHeader = this.setTableHeader();

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    protected tradingCompanyPointsService: TradingCompanyPointsService,
    private fileService: DownloadUploadFileService,
    protected posUsersResourceService: PosUsersResourceService,
    protected dirBranchControllerService: DirBranchControllerService,
    protected tradingCompaniesService: TradingCompaniesService,
    protected readonly credentialsService: CredentialsService,
  ) {

    super([], tradingCompanyPointsService, credentialsService);

  }

  get allowSelectItemForPos() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.RM_BOSS,
      RoleAuthority.RM,
      RoleAuthority.REG_MANAGER_POS
    ]);
  }

  get allowAddTradingPointsForPos() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS
    ]);
  }

  get allowCreateItemForPos() {
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.HEAD_POS,
      RoleAuthority.SUPPORT_POS,
      RoleAuthority.SUPER_ADMIN_POS,
      RoleAuthority.REG_MANAGER_POS
    ]);
  }

  get isCanViewOpz(){
    return this.credentialsService.checkAccess([
      RoleAuthority.ADMIN,
      RoleAuthority.RM_BOSS,
      RoleAuthority.RM
    ]);
  }


  setTableHeader() {
    return this.isCanViewOpz ? TRADING_COM_POINTS_HEADERS : TRADING_COM_POINTS_HEADERS_WTOUT_OPZ;
  }

  ngOnInit(): void {
    this.updateTableConfig(this.setTableHeader())
    this.getDirections();
    this.defaultMapper = DirTradingCompanyPointForTable;
    this.fetchList();
    // this.fetchList(DirTradingCompanyPointForTable);
  }

  selectedItem(event: DirTradingCompanyPointDto) {
    this.updateCreate(event, true);
  }

  createNew() {
    this.updateCreate({
      ...new DirTradingCompanyPointDto(),
      active: this.allowAddTradingPointsForPos,
      users: [],
      isOpz: false,
      creditPrograms: [],
      managers: [],
    });
  }

  downloadExcel() {
    this.tradingCompanyPointsService.download();
  }

  uploadExcel() {
    const params: ModalData = {
      accept: [MimeTypes.XLS, MimeTypes.XLSX],
      pathTitle: 'Modals.Buttons.ChooseFile',
      returnString: false
    };

    this.fileService
      .openDialog(params)
      .afterClosed()
      .subscribe((result: AttachmentSaveData | 'close') => {
        if (result && result !== 'close') {
          this.tradingCompanyPointsService
            .upload(result)
            .pipe(
              tap(() => {
                this.fetchList();
              })
            )
            .subscribe();
        }
      });
  }


  ngOnDestroy(): void {
    this.destroy();
  }

  private getDirections() {
    combineLatest([
      this.tradingCompanyPointsService.getCompanyStatuses(),
      this.tradingCompanyPointsService.getCreditPrograms(),
      this.tradingCompaniesService.getList(),
      this.dirBranchControllerService.getListWithPosUsers(),
      this.posUsersResourceService.getPosRegManager(),
    ]).pipe(tap(([statuses, creditPrograms, tradingCompanies, branches, managers]) => {

      branches.forEach(b => {
        b.nameRu = b.code.slice(4, 8) + ' ' + b.nameRu;
        b.nameAm = b.code.slice(4, 8) + ' ' + b.nameAm;
      })

      tradingCompanies.forEach(company => {
        company.displayName = `${company.code} ${company.companyName || ''}`;
      });

      managers = this.remapFioUsers(managers)

      this.optionsList = {
        ...this.optionsList,
        statuses,
        creditPrograms,
        tradingCompanies,
        branches,
        branchesForSelect: branches,
        managers
        // managers: users,
        // users
      };


      this._optionList$.next(this.optionsList)
    })).subscribe();
  }

  private updateCreate = (data: DirTradingCompanyPointDto, isUpdate?: boolean) => {
    //  lastName + firstName + patronymic
    if (data.users && data.users.length) {
      data.users = this.remapFioUsers(data.users)
    }

    if (data.branch && !this.optionsList.branches.find(e => e.id === data.branch.id)) {
      this.optionsList.branchesForSelect =  [...this.optionsList.branches, data.branch];
    }

    if (data.managers && data.managers.length) {
      data.managers = this.remapFioUsers(data.managers)
    }

    this.optionsList = {...this.optionsList};

    this.showDialog(
      {
        title: isUpdate ? 'Редактирование торговой точки компании' : 'Создание торговой точки компании',
        dataInfo: data,
        formConfig: TRADING_COM_POINTS_FORM,
        showSaveButton: isUpdate,
        showCreateButton: !isUpdate,
        disabledFields: isUpdate,
        optionsList$: this._optionList$,
        optionsList: this.optionsList,
        showEditActivateDeactivateButtons: this.allowAddTradingPointsForPos,
        activateDeactivateProp: 'active',
        ignoreDefaultValueForCheckBox: true,
        containerClass: 'grid-two-cols'
      },
      (attributesBeforeRequest: DirTradingCompanyPointDto) => {
        const cloneParams = Object.assign({}, this.params);

        attributesBeforeRequest.nameRu = attributesBeforeRequest.dirTradingCompany.nameRu;
        attributesBeforeRequest.nameAm = attributesBeforeRequest.dirTradingCompany.nameAm;
        attributesBeforeRequest.isDefaultLimit = !!attributesBeforeRequest.defaultLimit;
        attributesBeforeRequest.changedByUsername = null;

        this.tradingCompanyPointsService[`${isUpdate ? 'update' : 'create'}`](attributesBeforeRequest)
          .pipe(tap(() => {
            this.fetchList();
            // this.fetchList(DirTradingCompanyPointForTable);
          })).subscribe();

      });
  };

  private showDialog(data: AdministrationBaseModalData<DirTradingCompanyPointDto, any>, callback: (val: DirTradingCompanyPointDto) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
    dialogRef.componentInstance.emitFormValue.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res.control.code === 'branch' && !!res.value) {
        this.posUsersResourceService.getPosUsersByBranchCode(res.value.code).pipe(tap(users => {
          this.optionsList.users = users;

          this._optionList$.next(this.optionsList);
        })).subscribe();
      }
    });
    dialogRef.componentInstance.emitActivateData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private remapFioUsers = (data: UserPosDto[] | UserDto[]) => {
    return data.map(e => {
      return {
        ...e,
        fio: `${e.lastName || ''} ${e.firstName || ''} ${e.patronymic || ''}`
      }
    })
  }

}
