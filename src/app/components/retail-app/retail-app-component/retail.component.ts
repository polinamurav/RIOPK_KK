import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';

import {
  AcbHistoryResponse,
  ApplicantPhoto,
  Application,
  CreditHistoryDto,
  DirHash,
  DirStage,
  DirStatus,
  ISidebarInfoBlock,
  PathForStage,
  ProgressBar,
  RevenueServiceEmploymentDto,
  SidebarLink,
  StageType
} from '@app/_models';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ApplicantPhotoControllerService,
  ApplicationControllerService,
  DirHashControllerService,
  ProgressBarControllerService
} from '@app/api';
import { CURRENT_ROLES, setRoles } from '../../constants/current-roles';
import { INITIAL_TABS_STATE, LIST_PASSED_STAGES, TABS_STATE_FOR, TabsDataNames } from '../../constants/tabs-status';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { Observable, Subject, forkJoin, of, throwError } from 'rxjs';
import { RetailDirSetValueActions, RetailDirectoriesActions } from '@app/store/actions/retail-directories.actions';
import { Store, select } from '@ngrx/store';
import { catchError, filter, pairwise, skipWhile, switchMap, takeUntil } from 'rxjs/operators';

import { CredentialsService } from '@app/services/authentication';
import { CurrentAppService } from '@app/services/current-app.service';
import { CurrentTabService } from '@app/services/current-tab.service';
import { DirHashSetAction } from '@app/store/actions/dir-hash.actions';
import { ELanguage } from '@app/constants/language';
import { GetTabsDataService } from '../services/get-tabs-data.service';
import { IAppState } from '@app/store/state/app.state';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { ProductGroup } from '@app/constants/product-group';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { RouterURLService } from '@app/services/routerURL.service';
import { SIDE_BAR_LINKS } from '../../constants/side-bar-links';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TabNames } from '../../constants/tab-names';
import { TabsStatesList } from '@app/components/constants/tab-status-models';
import { ToastService } from '@app/services/toast.service';
import { UploadAttachmentListenerService } from '@app/services/upload-attachment-listener.service';
import { selectDirHash } from '@app/store/selectors/dir-hash.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-retail-component',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.scss'],
  providers: [GetTabsDataService]
})
export class RetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabGroup') matTabGroup: MatTabGroup;

  applicationNumber: string = '';
  applicationData: Application;

  revenue: RevenueServiceEmploymentDto[];
  historyRes: AcbHistoryResponse;
  creditHistory: CreditHistoryDto;

  isLoading: boolean;
  isProgressBarLoading: boolean;
  isAppFromQueues: boolean;
  isNeedRecalculateCredentials: boolean;
  isSideMenuVisible: boolean = false;

  stage: DirStage;
  status: DirStatus;
  activeStatus = 'Полная анкета';
  infoBlock: ISidebarInfoBlock | {} = {};
  language: string = this.translateService.currentLang;

  ELanguage = ELanguage;
  TabNames = TabNames;
  TabsDataNames = TabsDataNames;
  tabTitles = TABS_TITLES;
  tabsState: TabsStatesList<TabsDataNames, RetailDirectoriesNames>;
  listPassedStages: Record<string, boolean>;
  sidebarLinkList: SidebarLink[] = SIDE_BAR_LINKS;
  currentRoles: Record<string, boolean>;
  progressStages: ProgressBar[] = [];
  getArrayOfFunctionsRes: { dataNameArr: string[]; functionArr: Observable<any>[] };
  tabsData: Record<string, any>;

  userId: string;
  cryptoHash: string = '';
  selectUserData$ = this._store.pipe(select(selectUserData));
  destroy$: Subject<void> = new Subject<void>();
  selectDirHash$ = this._store.pipe(select(selectDirHash));
  oldDirHashes: DirHash[] = [];
  newDirHashes: DirHash[] = [];
  foundOldDirHash: DirHash;
  foundNewDirHash: DirHash;
  hasAnyDirToUpdate: boolean = false;
  isArchivist: boolean = false;

  private isIncomeNeededBrms2: boolean;
  private isBrms4Exist: boolean;
  private isTabsDataLoading: boolean;
  private isDirectoriesLoading: boolean;
  private fullDirectoriesList: RetailDirectoriesNames[] = [];
  private remainingDirectoriesList: string[] = [];

  constructor(
    private _store: Store<IAppState>,
    private updates$: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationControllerService: ApplicationControllerService,
    private credentialsService: CredentialsService,
    private progressBarService: ProgressBarControllerService,
    private dirHashService: DirHashControllerService,
    private toastService: ToastService,
    private currentTabService: CurrentTabService,
    private applicantPhotoService: ApplicantPhotoControllerService,
    private uploadAttachmentListener: UploadAttachmentListenerService,
    private getTabsDataService: GetTabsDataService,
    private currentAppService: CurrentAppService,
    private routerURLService: RouterURLService,
    private translateService: TranslateService
  ) {
    this.applicationNumber = this.activatedRoute.snapshot.params.id;
    this.cryptoHash = this.activatedRoute.snapshot.params.hash;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isProgressBarLoading = true;
    this.isDirectoriesLoading = true;
    this.isTabsDataLoading = true;
    this.tabsState = _.cloneDeep(INITIAL_TABS_STATE);
    this.listPassedStages = _.cloneDeep(LIST_PASSED_STAGES);
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);

    setRoles(this.currentRoles, this.credentialsService);
    this.createLanguageSubscription();
    this.createUploadPhotoEventSubscription();
    this.createRouterEventsSubscription();
    // this.crateActionsSubscription();
    this.getUserData();
    this.checkCryptoHash();
    this.setTabsForCurrentStageType();
    // this.refreshDirHashes();

    this.changeTabsVisibility(this.applicationNumber);
  }

  /* ----- INIT -----*/

  createLanguageSubscription() {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }
  // If photo was updated in tab documents we get event here and call method to update
  createUploadPhotoEventSubscription() {
    this.uploadAttachmentListener.uploadPhotoEvent$
      .pipe(
        catchError(err => {
          this.uploadAttachmentListener.setAttachmentLoadingStatus(false);
          return throwError(err);
        }),
        switchMap(res =>
          this.applicantPhotoService.getByApplicantIdAndApplicationId(
            this.applicationData.applicant.id.toString(),
            this.applicationData.id.toString()
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((applicantPhotoRes: ApplicantPhoto) => {
        this.uploadAttachmentListener.setAttachmentLoadingStatus(false);
        if (applicantPhotoRes) {
          this.tabsData[TabsDataNames.ApplicantPhotoInfo] = applicantPhotoRes;
        }
      });
  }

  crateActionsSubscription() {
    this.updates$
      .pipe(
        ofType(RetailDirectoriesActions.SetRetailDirectoryValueSuccess),
        skipWhile((res: Record<'dirListName', 'type'>) => res.dirListName !== _.last(this.remainingDirectoriesList)),
        takeUntil(this.destroy$)
      )
      .subscribe((res: Record<'dirListName', 'type'>) => {
        this.isDirectoriesLoading = false;
        this.changeIsLoading(this.isTabsDataLoading, this.isDirectoriesLoading);
      });
  }

  getUserData(): void {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (res && res.id) {
        this.userId = res.id.toString();
      }
    });
  }

  checkCryptoHash(): void {
    const cryptoHash = CryptoJS.PBKDF2(this.applicationNumber.toString(), this.userId.toString()).toString();

    if (this.cryptoHash !== cryptoHash && !this.currentRoles.isAdmin) {
      this.toastService.viewMsg('Заявка недоступна', 'warning');
      this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
    }
  }

  /* -----  DETERMINE THE VISIBILITY OF THE TAB AND ONLY FOR READING TAB BY PATH-----*/
  setTabsForCurrentStageType(): void {
    this.isAppFromQueues = false;

    if (this.router.url.indexOf(PathForStage.FULL_FORM) !== -1) {
      this.updateTabsState(PathForStage.FULL_FORM);
      this.isSideMenuVisible = true;
    } else if (this.router.url.indexOf(PathForStage.VERIFICATION) !== -1) {
      this.updateTabsState(PathForStage.VERIFICATION);
    } else if (this.router.url.indexOf(PathForStage.DECISION_MAKING) !== -1) {
      this.updateTabsState(PathForStage.DECISION_MAKING);
    } else if (this.router.url.indexOf(PathForStage.DECISION_FINAL) !== -1) {
      this.updateTabsState(PathForStage.DECISION_FINAL);
    } else if (this.router.url.indexOf(PathForStage.PAPERWORK) !== -1) {
      this.updateTabsState(PathForStage.PAPERWORK);
    } else if (this.router.url.indexOf(PathForStage.ACCEPTANCE) !== -1) {
      this.updateTabsState(PathForStage.ACCEPTANCE);
    }
  }

  updateTabsState(path: PathForStage): void {
    Object.keys(TABS_STATE_FOR[path]).forEach((tabName: string) => {
      this.tabsState[tabName] = { ...this.tabsState[tabName], ...TABS_STATE_FOR[path][tabName] };
    });
  }
  /* ----- END DETERMINE THE VISIBILITY OF THE TAB AND ONLY FOR READING TAB BY PATH-----*/

  /* -----  REFRESH DIR HASHES-----*/
  refreshDirHashes(): void {
    this.dirHashService
      .getDirHash()
      .pipe(takeUntil(this.destroy$))
      .subscribe((hashes: DirHash[]) => {
        this.newDirHashes = hashes;
      });
    this.selectDirHash$.pipe(untilDestroyed(this)).subscribe(res => {
      if (!!res && !!res.hashes.length) {
        this.oldDirHashes = res.hashes;
      }
    });
  }
  /* ----- END REFRESH DIR HASHES-----*/

  /* ----- VISIBLE/READONLY RIGHTS LOGIC BY STAGE AND ROLE-----*/
  changeTabsVisibility(applicationNumber: number | string) {
    this.progressBarService
      .getProgressBarByApplicationId(applicationNumber)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((progressBars: ProgressBar[]) => {
          this.progressStages = progressBars;

          this.setValueToListPassedStages(progressBars);
          this.changeTabsVisibilityByRoleAndStage();

          this.isProgressBarLoading = false;
          return of(true);
        })
      )
      .subscribe(() => {
        // this implementation needs to be improved
        this.getAppData();
        this.getDirectoriesForTabs(this.tabsState);
      });
  }

  setValueToListPassedStages(progressBars: ProgressBar[]): void {
    progressBars.forEach((elem: ProgressBar) => {
      if (elem.stage.id === StageType.VERIFICATION && !!elem.isPassed) {
        this.listPassedStages.wasVerification = true;
      }
      if (elem.stage.id === StageType.DECISION_MAKING && !!elem.isPassed) {
        this.listPassedStages.wasDecisionMaking = true;
      }
      if (elem.stage.id === StageType.DECISION_FINAL && !!elem.isPassed) {
        this.listPassedStages.wasDecisionFinal = true;
      }
      if (elem.stage.id === StageType.PAPERWORK && !!elem.isPassed) {
        this.listPassedStages.wasPaperwork = true;
      }
      if (elem.stage.id === StageType.ACCEPTANCE && !!elem.isPassed) {
        this.listPassedStages.wasAcceptance = true;
      }
    });
  }

  changeTabsVisibilityByRoleAndStage(): void {
    if (this.router.url.indexOf(PathForStage.VIEW) !== -1) {
      this.isAppFromQueues = true;

      Object.keys(this.tabsState).forEach((tabName: string) => {
        this.tabsState[tabName].isVisible = false;
        this.tabsState[tabName].isReadonly = true;
        this.isArchivist = this.currentRoles.isArchivist;

        if (
          tabName === TabNames.Decision ||
          tabName === TabNames.Employment ||
          tabName === TabNames.FullForm ||
          tabName === TabNames.Documents ||
          tabName === TabNames.InternalInfo ||
          tabName === TabNames.AcbInfo ||
          (tabName === TabNames.DecisionMaking && this.listPassedStages.wasDecisionMaking)
        ) {
          this.tabsState[tabName].isVisible = true;
        }

        if (tabName === TabNames.Verification && this.listPassedStages.wasVerification) {
          this.tabsState[tabName].isVisible =
            this.currentRoles.isAdmin ||
            this.currentRoles.isVerifier ||
            this.currentRoles.isDecisionMaker ||
            this.currentRoles.isVerifierBoss ||
            this.currentRoles.isDecisionMakerBoss ||
            this.currentRoles.isAuditor;
        }

        if (
          (tabName === TabNames.Aml && this.listPassedStages.wasDecisionFinal) ||
          (tabName === TabNames.FinalDecision && this.listPassedStages.wasDecisionFinal) ||
          (tabName === TabNames.Paperwork && this.listPassedStages.wasPaperwork) ||
          (tabName === TabNames.Acceptance && this.listPassedStages.wasAcceptance)
        ) {
          this.tabsState[tabName].isVisible =
            this.currentRoles.isCreditManager ||
            this.currentRoles.isCreditManagerBoss ||
            this.currentRoles.isVideoBank ||
            this.currentRoles.isCallCenter ||
            this.currentRoles.isCallCenterBoss ||
            this.currentRoles.isAdmin ||
            this.currentRoles.isVerifier ||
            this.currentRoles.isDecisionMaker ||
            this.currentRoles.isVerifierBoss ||
            this.currentRoles.isDecisionMakerBoss ||
            this.currentRoles.isDsa ||
            this.currentRoles.isDsaBoss ||
            this.currentRoles.isAuditor ||
            this.currentRoles.isAccepter;
        }
      });
    }
  }

  createRouterEventsSubscription(): void {
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((e: any) => {
        localStorage.setItem('previousRoute', e[0].urlAfterRedirects);
      });
  }
  /* ----- END VISIBLE/READONLY RIGHTS LOGIC BY STAGE AND ROLE-----*/

  /* ----- GETTING DATA-----*/
  getAppData() {
    this.applicationControllerService
      .getById(this.applicationNumber)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        switchMap(application => {
          this.setApplicationData(application);
          this.setIsIncomeNeededBrms2(application);
          this.setIsBrms4Exist(application);
          this.setIsNeedRecalculateCredentials();
          this.setTitle(application);
          this.setInfoBlock(application);
          this.setActiveStatus(application);

          this.getArrayOfFunctionsRes = this.getTabsDataService.getArrayOfFunctions(application, this.tabsState);

          return forkJoin(this.getArrayOfFunctionsRes.functionArr);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(forkJoinDataList => {
        forkJoinDataList.forEach((data, index: number) => {
          if (typeof forkJoinDataList[index] !== 'string') {
            const tabData = { [this.getArrayOfFunctionsRes.dataNameArr[index]]: data };
            this.tabsData = { ...this.tabsData, ...tabData };
          }
        });

        this.updateInfoBlock(this.tabsData);
        this.setEmployment(this.tabsData);
        this.setHistoryRes(this.tabsData);

        // SOME VERIFICATION DATA LOGIC
        if (!this.tabsState[TabNames.Verification].isVisible) {
          this.infoBlock = {
            ...this.infoBlock,
            verifier: '',
            decisionMaker: ''
          };
        }

        if (!this.tabsState[TabNames.DecisionMaking].isVisible) {
          this.infoBlock = {
            ...this.infoBlock,
            decisionMaker: ''
          };
        }

        this.isTabsDataLoading = false;
        this.changeIsLoading(this.isTabsDataLoading, this.isDirectoriesLoading);
      });
  }

  changeIsLoading(isTabsDataLoading: boolean, isDirectoriesLoading: boolean) {
    if (isTabsDataLoading || isDirectoriesLoading) {
      return;
    }
    this.isLoading = false;
  }

  getDirectoriesForTabs(tabList: TabsStatesList<TabsDataNames, RetailDirectoriesNames>) {
    Object.keys(tabList).forEach((tabName: string) => {
      if (
        tabList[tabName].isVisible &&
        tabList[tabName].tabDirectoriesNamesList &&
        !!tabList[tabName].tabDirectoriesNamesList.length
      ) {
        this.fullDirectoriesList = _.union(this.fullDirectoriesList, tabList[tabName].tabDirectoriesNamesList);
      }
    });

    this.setDirValueToStore2(this.fullDirectoriesList, this.currentAppService.currentAppProductId);
  }

  setDirValueToStore2(tabDirectoriesNamesList: RetailDirectoriesNames[], productGroupId: ProductGroup) {
    tabDirectoriesNamesList.forEach((directoryListName: string) => {
      this.foundOldDirHash = this.oldDirHashes.find(x => x.dirName == directoryListName);
      this.foundNewDirHash = this.newDirHashes.find(x => x.dirName == directoryListName);
      if (
        !!!this.foundOldDirHash ||
        !!!this.foundNewDirHash ||
        this.foundOldDirHash.hash !== this.foundNewDirHash.hash
      ) {
        this.hasAnyDirToUpdate = true;
        this.remainingDirectoriesList.push(directoryListName);
      }
    });

    this._store.dispatch(DirHashSetAction({ data: this.newDirHashes }));

    if (!this.hasAnyDirToUpdate) {
      this.isDirectoriesLoading = false;
      this.changeIsLoading(this.isTabsDataLoading, this.isDirectoriesLoading);
    } else {
      this.crateActionsSubscription();
      this.remainingDirectoriesList.forEach((directoryListName: string) => {
        this._store.dispatch(
          RetailDirSetValueActions({
            propertyName: directoryListName,
            productGroupId
          })
        );
      });
    }
  }

  setDirValueToStore(tabDirectoriesNamesList: RetailDirectoriesNames[], productGroupId: ProductGroup) {
    tabDirectoriesNamesList.forEach((directoryListName: string) => {
      this._store.dispatch(
        RetailDirSetValueActions({
          propertyName: directoryListName,
          productGroupId
        })
      );
    });
  }

  setApplicationData(application: Application): void {
    this.applicationData = application;
  }

  setIsIncomeNeededBrms2(application: Application): void {
    this.isIncomeNeededBrms2 =
      !!application && !!application.brms2Response && !!application.brms2Response.isIncomeConfirmationNeeded;
  }

  setIsNeedRecalculateCredentials(): void {
    this.isNeedRecalculateCredentials = !!this.isIncomeNeededBrms2 && !this.isBrms4Exist;
  }

  setIsBrms4Exist(application: Application): void {
    this.isBrms4Exist = !!application && !!application.brms4DMResponse && !!application.brms4DMResponse.id;
  }

  setTitle(application: Application): void {
    this.stage = !!application && !!application.stage ? application.stage : null;
    this.status = !!application && !!application.status ? application.status : null;
  }

  setInfoBlock(application: Application): void {
    this.infoBlock = {
      applicationId: application.applicationId,
      mainApplication: application.mainApplication,
      date: application.created,
      applicant:
        application.applicant.lastName + ' ' + application.applicant.firstName + ' ' + application.applicant.middleName,
      sourceChannel: application.dirSalesChannel ? application.dirSalesChannel : null
    };
  }

  updateInfoBlock(tabsData: Record<string, any>) {
    if (tabsData) {
      this.infoBlock = {
        ...this.infoBlock,
        manager:
          tabsData.managerInfo && tabsData.managerInfo.fio
            ? `${tabsData.managerInfo.firstName} ${tabsData.managerInfo.lastName}`
            : null,
        videoBank: tabsData.videoBankInfo && tabsData.videoBankInfo.fio ? tabsData.videoBankInfo.fio : null,
        dsa: tabsData.dsaInfo && tabsData.dsaInfo.fio ? tabsData.dsaInfo.fio : null,
        callCenter: tabsData.callCenterInfo && tabsData.callCenterInfo.fio ? tabsData.callCenterInfo.fio : null,
        branch: tabsData.managerInfo && tabsData.managerInfo.dirBranch ? tabsData.managerInfo.dirBranch : null,
        verifier: tabsData.verifierInfo && tabsData.verifierInfo.fio ? tabsData.verifierInfo.fio : null,
        decisionMaker: tabsData.decisionMaker && tabsData.decisionMaker.fio ? tabsData.decisionMaker.fio : null
      };
    }
  }

  setActiveStatus(application: Application): void {
    this.activeStatus = application.stage ? application.stage.nameRu : '';
  }

  setEmployment(tabsData: Record<string, any>) {
    this.revenue =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].revenueServiceEmploymentResponseDto &&
      tabsData[TabsDataNames.IntegrationInterface].revenueServiceEmploymentResponseDto.revenueServiceEmployments &&
      tabsData[TabsDataNames.IntegrationInterface].revenueServiceEmploymentResponseDto.revenueServiceEmployments.length
        ? tabsData[TabsDataNames.IntegrationInterface].revenueServiceEmploymentResponseDto.revenueServiceEmployments
        : null;
  }

  setHistoryRes(tabsData: Record<string, any>) {
    this.historyRes =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].pinAcbHistoryResponse
        ? tabsData[TabsDataNames.IntegrationInterface].pinAcbHistoryResponse
        : null;

    this.creditHistory =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].pinCountCreditHistoryDto
        ? tabsData[TabsDataNames.IntegrationInterface].pinCountCreditHistoryDto
        : null;
  }

  /* ----- END GETTING DATA-----*/

  /* ----- END INIT ----- */

  ngAfterViewInit(): void {
    this.findCurrentTab();
  }

  findCurrentTab(): void {
    setTimeout(() => {
      let activeMatTab: MatTab;

      if (this.matTabGroup) {
        activeMatTab = this.matTabGroup._tabs.find(t => t.isActive);
      }
      if (activeMatTab) {
        this.setCurrentTabName(activeMatTab.textLabel);
      }
    }, 0);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.changeSideMenuVisibility(tabChangeEvent.tab.textLabel);
    this.setCurrentTabName(tabChangeEvent.tab.textLabel);
  }

  changeSideMenuVisibility(textLabel: string) {
    this.isSideMenuVisible = textLabel === this.tabTitles[TabNames.FullForm];
  }

  setCurrentTabName(textLabel: string): void {
    this.currentTabService.setCurrentTabName(textLabel);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
