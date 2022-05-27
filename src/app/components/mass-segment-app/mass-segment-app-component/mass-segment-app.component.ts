import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';

import {
  AcbHistoryResponse,
  ApplicantPhoto,
  Application,
  AsanEmploymentResponse,
  CreditHistoryDto,
  DirStage,
  ISidebarInfoBlock,
  PathForStage,
  ProgressBar,
  SidebarLink,
  StageType
} from '@app/_models';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApplicantPhotoControllerService, ApplicationControllerService, ProgressBarControllerService } from '@app/api';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import {
  INITIAL_TABS_STATE,
  LIST_PASSED_STAGES,
  TABS_STATE_FOR,
  TabsDataNames
} from '@app/components/constants/tabs-status-mass-segment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import {
  MassSegmentDirSetValueActions,
  MassSegmentDirectoriesActions
} from '@app/store/actions/mass-segment-directories.actions';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, filter, pairwise, skipWhile, switchMap } from 'rxjs/operators';

import { CredentialsService } from '@app/services/authentication';
import { CurrentAppService } from '@app/services/current-app.service';
import { CurrentTabService } from '@app/services/current-tab.service';
import { ELanguage } from '@app/constants/language';
import { GetTabsDataMassSegmentService } from '@app/components/mass-segment-app/services/get-tabs-data-mass-segment.service';
import { IAppState } from '@app/store/state/app.state';
import { MASS_SIDE_BAR_LINKS } from '@app/components/constants/side-bar-links';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { ProductGroup } from '@app/constants/product-group';
import { RouterURLService } from '@app/services/routerURL.service';
import { TABS_TITLES_MASS_SEGMENT } from '../../constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { TabsStatesList } from '@app/components/constants/tab-status-models';
import { ToastService } from '@app/services/toast.service';
import { UploadAttachmentListenerService } from '@app/services/upload-attachment-listener.service';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-mass-segment-component',
  templateUrl: './mass-segment-app.component.html',
  styleUrls: ['./mass-segment-app.component.scss'],
  providers: [GetTabsDataMassSegmentService]
})
export class MassSegmentAppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabGroup') matTabGroup: MatTabGroup;

  userId: string;
  applicationNumber: string;
  applicationData: Application;
  asanEmployment: AsanEmploymentResponse;
  innAcbHistoryResponse: AcbHistoryResponse;
  pinAcbHistoryResponse: AcbHistoryResponse;
  innCreditHistory: CreditHistoryDto;
  pinCreditHistory: CreditHistoryDto;

  listPassedStages: Record<string, boolean>;
  currentRoles: Record<string, boolean>;
  tabsData: Record<string, any>;
  getArrayOfFunctionsRes: { dataNameArr: string[]; functionArr: Observable<any>[] };

  isLoading: boolean;
  isProgressBarLoading: boolean;
  isAppFromQueues: boolean;
  isNeedRecalculateCredentials: boolean;
  isSideMenuVisible: boolean = false;

  cryptoHash: string = '';
  stage: DirStage;
  language: string = ELanguage.Ge;

  ELanguage = ELanguage;
  TabNames = TabNames;
  tabTitles = TABS_TITLES_MASS_SEGMENT;
  TabsDataNames = TabsDataNames;
  tabsState: TabsStatesList<TabsDataNames, MassSegmentDirectoriesNames>;
  sidebarLinkList: SidebarLink[] = MASS_SIDE_BAR_LINKS;
  progressStages: ProgressBar[] = [];
  infoBlock: ISidebarInfoBlock | {} = {};

  private isIncomeNeededBrms2: boolean;
  private isBrms4Exist: boolean;
  private isTabsDataLoading: boolean;
  private isDirectoriesLoading: boolean;
  private fullDirectoriesList: MassSegmentDirectoriesNames[] = [];

  private selectUserData$ = this._store.pipe(select(selectUserData));

  constructor(
    private _store: Store<IAppState>,
    private updates$: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private applicationControllerService: ApplicationControllerService,
    private credentialsService: CredentialsService,
    private progressBarService: ProgressBarControllerService,
    private toastService: ToastService,
    private currentTabService: CurrentTabService,
    private applicantPhotoService: ApplicantPhotoControllerService,
    private uploadAttachmentListener: UploadAttachmentListenerService,
    private getTabsDataMassSegmentService: GetTabsDataMassSegmentService,
    private currentAppService: CurrentAppService,
    private routerURLService: RouterURLService,
    private translateService: TranslateService
  ) {
    this.applicationNumber = this.activatedRoute.snapshot.params.id;
    this.cryptoHash = this.activatedRoute.snapshot.params.hash;
  }

  ngOnInit(): void {
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
    this.crateActionsSubscription();
    this.getUserData();
    this.checkCryptoHash();
    this.setTabsForCurrentStageType();

    this.changeTabsVisibility(this.applicationNumber);
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.findCurrentTab();
  }

  /* ----- INIT -----*/

  // If photo was updated in tab documents we get event here and call method to update
  createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

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
        untilDestroyed(this)
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
        ofType(MassSegmentDirectoriesActions.SetMassSegmentDirectoryValueSuccess),
        skipWhile((res: Record<'dirListName', 'type'>) => res.dirListName !== _.last(this.fullDirectoriesList)),
        untilDestroyed(this)
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
    } else if (this.router.url.indexOf(PathForStage.INSPECTION) !== -1) {
      this.updateTabsState(PathForStage.INSPECTION);
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

  /* ----- VISIBLE/READONLY RIGHTS LOGIC BY STAGE AND ROLE-----*/
  changeTabsVisibility(applicationNumber: number | string) {
    this.progressBarService
      .getProgressBarByApplicationId(applicationNumber)
      .pipe(
        untilDestroyed(this),
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
      if (elem.stage.id === StageType.BUSINESS_INSPECTION && !!elem.isPassed) {
        this.listPassedStages.wasBusinessInspection = true;
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

        if (tabName === TabNames.Decision || tabName === TabNames.FullForm || tabName === TabNames.Documents) {
          this.tabsState[tabName].isVisible = true;
        }

        if (tabName === TabNames.Inspection && this.listPassedStages.wasBusinessInspection) {
          this.tabsState[tabName].isVisible =
            this.currentRoles.isCreditManager ||
            this.currentRoles.isClientManager ||
            this.currentRoles.isAdmin ||
            this.currentRoles.isVerifier ||
            this.currentRoles.isVerifierBoss ||
            this.currentRoles.isAuditor;
        }

        if (
          tabName === TabNames.InternalInfo ||
          tabName === TabNames.AcbInfoInn ||
          tabName === TabNames.AcbInfoFin ||
          (tabName === TabNames.Verification && this.listPassedStages.wasVerification)
        ) {
          this.tabsState[tabName].isVisible =
            this.currentRoles.isAdmin ||
            this.currentRoles.isVerifier ||
            this.currentRoles.isDecisionMaker ||
            this.currentRoles.isVerifierBoss ||
            this.currentRoles.isDecisionMakerBoss ||
            this.currentRoles.isAuditor;
        }

        if (tabName === TabNames.InternalInfo && this.listPassedStages.wasVerification) {
          this.tabsState[tabName].isVisible = this.currentRoles.isClientManager;
        }

        if (
          // (tabName === TabNames.Aml && this.listPassedStages.wasDecisionFinal) ||
          tabName === TabNames.FinalDecision &&
          this.listPassedStages.wasDecisionFinal
          // (tabName === TabNames.Paperwork && this.listPassedStages.wasPaperwork) ||
          // (tabName === TabNames.Acceptance && this.listPassedStages.wasAcceptance)
        ) {
          this.tabsState[tabName].isVisible =
            this.currentRoles.isCreditManager ||
            this.currentRoles.isClientManager ||
            this.currentRoles.isCreditManagerBoss ||
            this.currentRoles.isCallCenter ||
            this.currentRoles.isAdmin ||
            this.currentRoles.isVerifier ||
            this.currentRoles.isDecisionMaker ||
            this.currentRoles.isVerifierBoss ||
            this.currentRoles.isDecisionMakerBoss ||
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

          this.getArrayOfFunctionsRes = this.getTabsDataMassSegmentService.getArrayOfFunctions(
            application,
            this.tabsState
          );

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
          // this.setEmployment(this.tabsData);
          this.setHistoryRes(this.tabsData);
        });

        // SOME VERIFICATION DATA LOGIC
        if (this.tabsState[TabNames.Verification] && !this.tabsState[TabNames.Verification].isVisible) {
          this.infoBlock = {
            ...this.infoBlock,
            verifier: '',
            decisionMaker: ''
          };
        }

        if (this.tabsState[TabNames.DecisionMaking] && !this.tabsState[TabNames.DecisionMaking].isVisible) {
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

  getDirectoriesForTabs(tabList: TabsStatesList<TabsDataNames, MassSegmentDirectoriesNames>) {
    Object.keys(tabList).forEach((tabName: string) => {
      if (
        tabList[tabName].isVisible &&
        tabList[tabName].tabDirectoriesNamesList &&
        !!tabList[tabName].tabDirectoriesNamesList.length
      ) {
        this.fullDirectoriesList = _.union(this.fullDirectoriesList, tabList[tabName].tabDirectoriesNamesList);
      }
    });

    this.setDirValueToStore(this.fullDirectoriesList, this.currentAppService.currentAppProductId);
  }

  setDirValueToStore(tabDirectoriesNamesList: MassSegmentDirectoriesNames[], productGroupId: ProductGroup) {
    tabDirectoriesNamesList.forEach((directoryListName: string) => {
      this._store.dispatch(
        MassSegmentDirSetValueActions({
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
  }

  setInfoBlock(application: Application): void {
    this.infoBlock = {
      applicationId: application.applicationId,
      date: application.created,
      applicant:
        application.applicant.lastName + ' ' + application.applicant.firstName + ' ' + application.applicant.middleName,
      sourceChannel: application.dirSalesChannel ? application.dirSalesChannel.nameRu : ''
    };
  }

  updateInfoBlock(tabsData: Record<string, any>) {
    if (tabsData) {
      this.infoBlock = {
        ...this.infoBlock,
        manager:
          tabsData[TabsDataNames.ManagerInfo] && tabsData[TabsDataNames.ManagerInfo].fio
            ? tabsData[TabsDataNames.ManagerInfo].fio
            : null,
        clientManager:
          tabsData[TabsDataNames.ClientManagerInfo] && tabsData[TabsDataNames.ClientManagerInfo].fio
            ? tabsData[TabsDataNames.ClientManagerInfo].fio
            : null,
        branch:
          tabsData[TabsDataNames.ManagerInfo] && tabsData[TabsDataNames.ManagerInfo].dirBranch
            ? tabsData[TabsDataNames.ManagerInfo].dirBranch
            : null,
        verifier:
          tabsData[TabsDataNames.VerifierInfo] && tabsData[TabsDataNames.VerifierInfo].fio
            ? tabsData[TabsDataNames.VerifierInfo].fio
            : null
      };
    }
  }

  // setEmployment(tabsData: Record<string, any>) {
  //   this.asanEmployment =
  //     tabsData &&
  //     tabsData[TabsDataNames.IntegrationInterface] &&
  //     tabsData[TabsDataNames.IntegrationInterface].asanEmploymentResponse
  //       ? tabsData[TabsDataNames.IntegrationInterface].asanEmploymentResponse
  //       : null;
  // }

  setHistoryRes(tabsData: Record<string, any>) {
    this.innAcbHistoryResponse =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].innAcbHistoryResponse
        ? tabsData[TabsDataNames.IntegrationInterface].innAcbHistoryResponse
        : null;
    this.pinAcbHistoryResponse =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].pinAcbHistoryResponse
        ? tabsData[TabsDataNames.IntegrationInterface].pinAcbHistoryResponse
        : null;

    this.innCreditHistory =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].innCountCreditHistoryDto
        ? tabsData[TabsDataNames.IntegrationInterface].innCountCreditHistoryDto
        : null;

    this.pinCreditHistory =
      tabsData &&
      tabsData[TabsDataNames.IntegrationInterface] &&
      tabsData[TabsDataNames.IntegrationInterface].pinCountCreditHistoryDto
        ? tabsData[TabsDataNames.IntegrationInterface].pinCountCreditHistoryDto
        : null;
  }

  /* ----- END GETTING DATA-----*/

  /* ----- END INIT ----- */

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
}
