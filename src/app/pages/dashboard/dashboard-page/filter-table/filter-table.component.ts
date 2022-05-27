import * as CryptoJS from 'crypto-js';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationControllerService, DirectoriesService } from '@app/api';
import {
  ApplicationPagedInfoDto,
  IFilterField,
  IFilteredParams,
  PaginationAndSortingDto,
  PathForStage,
  ProductRes,
  RoleAuthority,
  SearchParams,
  StageType,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardTasksSetFilterAction, DashboardTasksSetSearchAction } from '@app/store/actions/tasks-filter.actions';
import { MatDialog, Sort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { selectDashboardFilterOptions, selectDashboardSearchParams } from '@app/store/selectors/tasks-filter.selector';

import { CredentialsService } from '@app/services/authentication';
import { CurrentAppService } from '@app/services/current-app.service';
import { DASHBOARD_FILTER } from './constants/dashboard-filter-config';
import { DashboardSetMyTasksAction } from '@app/store/actions/dashboard.actions';
import { IAppState } from '@app/store/state/app.state';
import { OtpEnterModalComponent } from '@app/components/modals/otp-enter-modal/otp-enter-modal.component';
import { ProductGroup } from '@app/constants/product-group';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { UserControllerService } from '@app/api/user-controller.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectMyTasks } from '@app/store/selectors/dashboard.selector';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {
  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isAdmin: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;
  dataSource: TableData<ApplicationPagedInfoDto> = new TableData();
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('applicationId', 'TableHeader.Number', 'string', 'applicationId'),
    new TableDataHeader('customerFullName', 'TableHeader.Client', 'string', 'customerFullName'),
    new TableDataHeader('created', 'TableHeader.DateCreation', 'dateAndTime', 'created'),
    new TableDataHeader('productName', 'TableHeader.Product', 'ru', 'productName'),
    new TableDataHeader('productNameGe', 'TableHeader.Product', 'ge', 'productNameGe'),
    new TableDataHeader('creditAmount', 'TableHeader.Sum', 'string', 'creditAmount'),
    new TableDataHeader('dirCurrencyName', 'TableHeader.Currency', 'string', 'dirCurrencyName'),
    new TableDataHeader('stageName', 'TableHeader.Stage', 'ru', 'stageName'),
    new TableDataHeader('stageNameGe', 'TableHeader.Stage', 'ge', 'stageNameGe'),
    new TableDataHeader('statusName', 'TableHeader.Status', 'ru', 'statusName'),
    new TableDataHeader('statusNameGe', 'TableHeader.Status', 'ge', 'statusNameGe'),
    new TableDataHeader('creditManager', 'TableHeader.Manager', 'string', 'creditManager'),
    new TableDataHeader('videoBank', 'TableHeader.VideoBank', 'string', 'videoBank'),
    new TableDataHeader('dsa', 'TableHeader.DSA', 'string', 'dsa'),
    new TableDataHeader('callCenter', 'TableHeader.CallCenter', 'string', 'callCenter')
  ];

  changePage: Subject<number> = new Subject<number>();
  totalCount: number = 0;
  itemLimit: number = 15;

  params: PaginationAndSortingDto = {
    page: 0,
    size: this.itemLimit
  };

  searchInputValue: string;
  currentFilterValues: IFilteredParams;

  filterParams: IFilteredParams = {
    // decisionId: null,
    // statusId: null

    createdDate: '',
    productId: '',
    stageId: '',
    status: '',
    creditManagerId: '',
    videoBankId: '',
    callCenterId: '',
    verifierId: '',
    decisionMakerId: '',
    dsaId: ''
  };

  userId: string;
  dashboardFilter: IFilterField[] = [...DASHBOARD_FILTER];
  productCategories: ProductRes[] = [];

  private config$ = this._store.pipe(select(selectMyTasks));
  private selectUserData$ = this._store.pipe(select(selectUserData));
  private selectTasksFilterOptions$ = this._store.pipe(select(selectDashboardFilterOptions));
  private selectTasksSearchOptions$ = this._store.pipe(select(selectDashboardSearchParams));
  private productCategories$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productCategories))
  );

  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private applicationControllerService: ApplicationControllerService,
    private directoriesService: DirectoriesService,
    private userService: UserControllerService,
    private credentialsService: CredentialsService,
    private currentAppService: CurrentAppService
  ) {}

  ngOnInit() {
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isAdmin = this.credentialsService.isAdmin;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;

    this.getDirectories();
    this.createFilterParamsSubscription();
    this.createSearchParamsSubscription();
    this.fillDropdownFilter();
    this.setCurrentFilterParams();

    if (!this.currentFilterValues) {
      this.dispatchData();
    }

    if (this.searchInputValue) {
      this.onSearchEvent(this.searchInputValue);
    }
  }

  createFilterParamsSubscription() {
    return this.selectTasksFilterOptions$.pipe(untilDestroyed(this)).subscribe((options: IFilteredParams) => {
      /*if (options) {
        this.filterParams = options;
      }*/
    });
  }

  createSearchParamsSubscription() {
    return this.selectTasksSearchOptions$.pipe(untilDestroyed(this)).subscribe((options: SearchParams) => {
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
      this.dispatchSearchFilterData({ search: inputVal });
      this.params.param = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('param')) {
      delete this.params.param;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('param')) {
      this.dispatchSearchFilterData({ search: '' });

      delete this.params.param;
      this.changePage.next(1);
    }
  }

  selectItemEvent(item: ApplicationPagedInfoDto) {
    this.currentAppService.setAppStageId(item);
    this.currentAppService.setAppProductId(item);

    const cryptoHash = CryptoJS.PBKDF2(item.id.toString(), this.userId.toString()).toString();
    const path: string = item.productGroupId === ProductGroup.Retail ? 'stages' : 'mass-segment-stages';

    if (!!item && !!item.stageId) {
      if (item.stageId === StageType.BUSINESS_INSPECTION) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/${PathForStage.INSPECTION}`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

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

      if (item.stageId === StageType.FULL_FORM || item.stageId === StageType.FULL_FORM_RETURN) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/full-form`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

      if (item.stageId === StageType.VERIFICATION || item.stageId === StageType.VERIFICATION_RETURN) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/verification`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

      if (item.stageId === StageType.DECISION_MAKING) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/decision-making`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

      if (item.stageId === StageType.DECISION_FINAL || item.stageId === StageType.DECISION_FINAL_RETURN) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/decision-final`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

      if (item.stageId === StageType.PAPERWORK || item.stageId === StageType.PAPERWORK_RETURN) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/paperwork`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }

      if (item.stageId === StageType.ACCEPTANCE) {
        this.applicationControllerService.startTask(item.id.toString(), this.userId).subscribe(_ => {
          this.router.navigate([`${path}/acceptance`, item.id, cryptoHash], { relativeTo: this.route });
        });
      }
    }
  }

  selectedFilterFieldsEvent(options: { [key: string]: string }) {
    this.filterParams = options;

    this.dispatchTasksFilterData(options);
    this.dispatchData();
  }

  toggleValue(toggleVal: boolean) {
    this.params.isOnlyMyTasks = toggleVal;
    this.dispatchData();
  }

  refresh() {
    this.dispatchData();
  }

  ngOnDestroy(): void {}

  private dispatchData() {
    this._store.dispatch(
      DashboardSetMyTasksAction({ data: { ...this.params }, filter: { ...this.filterParams }, userId: this.userId })
    );
    this.config$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.dataSource = new TableData(this.objColNameProps, res);
      });
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
    combineLatest([this.selectUserData$, this.productCategories$])
      .pipe(untilDestroyed(this))
      .subscribe(([selectedUserData, productCategories]) => {
        this.productCategories = getOnlyActiveItems<ProductRes>(productCategories);
        this.updateDropdownFilter<ProductRes>('productId', this.productCategories);
        this.setCurrentUserId(selectedUserData);
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
      this.dashboardFilter.find(item => item.fcName === 'status').options = status;
    });

    this.userService.getUsersByRole(RoleAuthority.CREDIT_MANAGER).subscribe(creditManagerUser => {
      this.dashboardFilter.find(item => item.fcName === 'creditManagerId').options = creditManagerUser;
    });

    this.userService.getUsersByRole(RoleAuthority.VIDEO_BANK).subscribe(videoBankUser => {
      this.dashboardFilter.find(item => item.fcName === 'videoBankId').options = videoBankUser;
    });

    this.userService.getUsersByRole(RoleAuthority.CALL_CENTER).subscribe(callCenterUser => {
      this.dashboardFilter.find(item => item.fcName === 'callCenterId').options = callCenterUser;
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
}
