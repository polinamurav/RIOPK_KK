import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';

import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  INITIAL_TABS_STATE_CLIENTS,
  TABS_STATE_CLIENTS_FOR,
  TabsDataNames
} from '@app/components/constants/tab-status-clients';
import { ISidebarInfoBlockClients, PathForStage } from '@app/_models';
import { Observable, forkJoin, throwError } from 'rxjs';
import { RetailDirSetValueActions, RetailDirectoriesActions } from '@app/store/actions/retail-directories.actions';
import { Store, select } from '@ngrx/store';
import { catchError, skipWhile, switchMap } from 'rxjs/operators';

import { Client } from '@app/_models/api-models/client';
import { ClientControllerService } from '@app/api';
import { CredentialsService } from '@app/services/authentication';
import { GetTabsDataClientsService } from '../services/get-tabs-data-clients.service';
import { IAppState } from '@app/store/state/app.state';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { ProductGroup } from '@app/constants/product-group';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { RouterURLService } from '@app/services/routerURL.service';
import { TABS_TITLES_CLIENT } from '@app/components/constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { TabsStatesList } from '@app/components/constants/tab-status-models';
import { ToastService } from '@app/services/toast.service';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clientData: Client;
  public userId: string;
  public clientId: string;
  public isLoading: boolean;
  public infoBlock: ISidebarInfoBlockClients | {} = {};
  public currentRoles: Record<string, boolean>;
  public tabsState: TabsStatesList<TabsDataNames, RetailDirectoriesNames>;
  public getArrayOfFunctionsRes: { dataNameArr: string[]; functionArr: Observable<any>[] };
  public tabsData: Record<string, any>;

  public isSideMenuVisible = true;
  public title: string = '';
  public cryptoHash: string = '';
  public tabTitles = TABS_TITLES_CLIENT;
  public TabNames = TabNames;
  public TabsDataNames = TabsDataNames;
  public selectUserData$ = this._store.pipe(select(selectUserData));

  private isTabsDataLoading: boolean;
  private isDirectoriesLoading: boolean;

  private fullDirectoriesList: RetailDirectoriesNames[] = [];

  constructor(
    private _store: Store<IAppState>,
    private updates$: Actions,
    private activatedRoute: ActivatedRoute,
    private routerURLService: RouterURLService,
    private router: Router,
    private credentialsService: CredentialsService,
    private getTabsDataService: GetTabsDataClientsService,
    private clientService: ClientControllerService,
    private toastService: ToastService
  ) {
    this.clientId = this.activatedRoute.snapshot.params.id;
    this.cryptoHash = this.activatedRoute.snapshot.params.hash;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isDirectoriesLoading = true;
    this.isTabsDataLoading = true;
    this.tabsState = _.cloneDeep(INITIAL_TABS_STATE_CLIENTS);
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);

    setRoles(this.currentRoles, this.credentialsService);

    this.crateActionsSubscription();
    this.getUserData();
    this.checkCryptoHash();
    this.setTabsForCurrentStageType();

    this.changeTabsVisibility();
  }

  ngOnDestroy(): void {}

  private crateActionsSubscription() {
    this.updates$
      .pipe(
        ofType(RetailDirectoriesActions.SetRetailDirectoryValueSuccess),
        skipWhile((res: Record<'dirListName', 'type'>) => res.dirListName !== _.last(this.fullDirectoriesList)),
        untilDestroyed(this)
      )
      .subscribe((res: Record<'dirListName', 'type'>) => {
        this.isDirectoriesLoading = false;
        this.changeIsLoading(this.isTabsDataLoading, this.isDirectoriesLoading);
      });
  }

  private getUserData(): void {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (res && res.id) {
        this.userId = res.id.toString();
      }
    });
  }

  private checkCryptoHash(): void {
    const cryptoHash = CryptoJS.PBKDF2(this.clientId.toString(), this.userId.toString()).toString();

    if (this.cryptoHash !== cryptoHash && !this.currentRoles.isAdmin) {
      this.toastService.viewMsg('Заявка недоступна', 'warning');
      this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Clients);
    }
  }

  private setTabsForCurrentStageType(): void {
    this.updateTabsState(PathForStage.VIEW);
  }

  private changeTabsVisibility() {
    this.changeTabsVisibilityByRoleAndStage();
    this.getAppData();
    this.getDirectoriesForTabs(this.tabsState);
  }

  private updateTabsState(path: PathForStage): void {
    Object.keys(TABS_STATE_CLIENTS_FOR[path]).forEach((tabName: string) => {
      this.tabsState[tabName] = { ...this.tabsState[tabName], ...TABS_STATE_CLIENTS_FOR[path][tabName] };
    });
  }

  private changeIsLoading(isTabsDataLoading: boolean, isDirectoriesLoading: boolean) {
    if (isTabsDataLoading || isDirectoriesLoading) {
      return;
    }
    this.isLoading = false;
  }

  private changeTabsVisibilityByRoleAndStage(): void {
    if (this.router.url.indexOf(PathForStage.VIEW) !== -1) {
      Object.keys(this.tabsState).forEach((tabName: string) => {
        this.tabsState[tabName].isVisible = true;
        this.tabsState[tabName].isReadonly = true;

        if (tabName === TabNames.FullForm || tabName === TabNames.Documents) {
          this.tabsState[tabName].isReadonly = !(this.currentRoles.isCreditManager || this.currentRoles.isAdmin);
        }
      });
    }
  }

  private getAppData() {
    this.clientService
      .getById(this.clientId)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        switchMap(client => {
          this.setClientData(client);
          this.setTitle(client);
          this.setInfoBlock(client);

          this.getArrayOfFunctionsRes = this.getTabsDataService.getArrayOfFunctions(client, this.tabsState);

          return forkJoin(this.getArrayOfFunctionsRes.functionArr);
        }),
        untilDestroyed(this)
      )
      .subscribe(forkJoinDataList => {
        forkJoinDataList.forEach((data, index: number) => {
          if (typeof forkJoinDataList[index] !== 'string') {
            const tabData = { [this.getArrayOfFunctionsRes.dataNameArr[index]]: data };
            this.tabsData = { ...this.tabsData, ...tabData };
          }
          this.updateInfoBlock(this.tabsData);
        });

        this.isTabsDataLoading = false;
        this.changeIsLoading(this.isTabsDataLoading, this.isDirectoriesLoading);
      });
  }

  private getDirectoriesForTabs(tabList: TabsStatesList<TabsDataNames, RetailDirectoriesNames>) {
    Object.keys(tabList).forEach((tabName: string) => {
      if (
        tabList[tabName].isVisible &&
        tabList[tabName].tabDirectoriesNamesList &&
        !!tabList[tabName].tabDirectoriesNamesList.length
      ) {
        this.fullDirectoriesList = _.union(this.fullDirectoriesList, tabList[tabName].tabDirectoriesNamesList);
      }
    });

    this.setDirValueToStore(this.fullDirectoriesList, ProductGroup.Retail);
  }

  private setDirValueToStore(tabDirectoriesNamesList: RetailDirectoriesNames[], productGroupId: ProductGroup) {
    tabDirectoriesNamesList.forEach((directoryListName: string) => {
      this._store.dispatch(
        RetailDirSetValueActions({
          propertyName: directoryListName,
          productGroupId
        })
      );
    });
  }

  private setInfoBlock(client: Client): void {
    this.infoBlock = {
      fio: `${client.lastName} ${client.firstName} ${client.middleName}`,
      requestDate: client.created,
      clientManager: '',
      branch: ''
    };
  }

  private setTitle(client: Client): void {
    this.title = !!client && !!client.clientStatus ? client.clientStatus.nameRu : '';
  }

  private setClientData(client: Client): void {
    this.clientData = client;
  }

  private updateInfoBlock(tabsData: Record<string, any>) {
    if (tabsData) {
      this.infoBlock = {
        ...this.infoBlock,
        clientManager:
          tabsData[TabsDataNames.ManagerInfo] && tabsData[TabsDataNames.ManagerInfo].fio
            ? tabsData[TabsDataNames.ManagerInfo].fio
            : null,
        branch:
          tabsData[TabsDataNames.ManagerInfo] && tabsData[TabsDataNames.ManagerInfo].dirBranch
            ? tabsData[TabsDataNames.ManagerInfo].dirBranch
            : null
      };
    }
  }
}
