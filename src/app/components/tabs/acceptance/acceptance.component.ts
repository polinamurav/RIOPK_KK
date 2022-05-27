import {
  AccountIssueGetDto,
  Application,
  BaseFormField,
  CommentDto,
  CreditInfo,
  TableData,
  UserDto,
  EInputType,
  OptionListNames,
  Dir,
  DirAbsCode,
  ValueType
} from '@app/_models';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, combineLatest, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { ApplicationControllerService } from '@app/api';
import { ChatCradminManagerControllerService } from '@app/api/chat-cradmin-manager-controller.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { FINAL_CREDIT_INFO_HEADERS } from '@app/components/tabs/acceptance/constants/acceptance.constants';
import {
  ACCEPTANCE_ACCOUNT_NAME,
  ACCEPTANCE_ADDITIONAL_PARAMETERS,
  ACCEPTANCE_RESULT,
  ACCEPTANCE_TITLES,
  AcceptanceGroupKeys
} from '@app/components/tabs/acceptance/constants/acceptance.config';
import { FormGroupService } from '@app/services/form-group.service';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';

type Options = DirAbsCode | Dir | ProductToPaymentDay;

@Component({
  selector: 'ng-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.scss']
})
export class AcceptanceComponent implements OnInit, OnDestroy {
  acceptanceForm: FormGroup;
  isLoading: boolean = false;
  footerConfigSource = 'common.acceptance';

  titles: Record<string, string> = ACCEPTANCE_TITLES;
  AcceptanceGroupKeys = AcceptanceGroupKeys;
  additionalParametersConfig: BaseFormField[] = ACCEPTANCE_ADDITIONAL_PARAMETERS;
  accountNameConfig: BaseFormField[] = ACCEPTANCE_ACCOUNT_NAME;
  resultConfig: BaseFormField[] = ACCEPTANCE_RESULT;
  EInputType = EInputType;
  ValueType = ValueType;

  isVisiblePaymentDay: boolean;
  isVisibleSecondPaymentDay: boolean;
  isVisibleCalculationDay: boolean;

  isNewMessageExists: boolean = false;
  userData: UserDto;
  chatCradminManagerList: CommentDto[];

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.ScheduleTypes]: [],
    [OptionListNames.ScheduleFrequencies]: [],
    [OptionListNames.EnsureTypes]: [],
    [OptionListNames.IssueTypes]: [],
    [OptionListNames.ProductToPaymentDay]: [],
    [OptionListNames.AccepterDecisionList]: []
  };

  @Input() applicationData: Application;
  @Input() accountIssue: AccountIssueGetDto;
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private dirScheduleTypes$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleTypes)));
  private dirScheduleFrequency$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.dirScheduleFrequency))
  );
  private dirEnsureType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirEnsureType)));
  private dirIssueType$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.dirIssueType)));
  private productToPaymentDay$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productToPaymentDay))
  );
  private accepterDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.accepterDecisionList))
  );

  finalCreditInfoColTableData: TableData<any> = new TableData(FINAL_CREDIT_INFO_HEADERS, []);

  constructor(
    private router: Router,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private appService: ApplicationControllerService,
    private chatCradminManagerService: ChatCradminManagerControllerService,
    private routerURLService: RouterURLService,
    private formGroupService: FormGroupService<any, any>,
    private applicationControllerService: ApplicationControllerService
  ) {}

  ngOnInit() {
    this.getDirectories();
    this.createForm();
    this.checkVisibilitySelect();
    this.checkReadonly();
    this.setChatInfo();

    if (this.applicationData.finalCreditInfo) {
      this.finalCreditInfoColTableData = new TableData(FINAL_CREDIT_INFO_HEADERS, [
        this.applicationData.finalCreditInfo
      ]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkVisibilitySelect() {
    this.acceptanceForm
      .get('additionalParameters.dirScheduleFrequencyId')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(value => {
        if (value === 2) {
          this.isVisibleSecondPaymentDay = true;
        } else {
          this.isVisibleSecondPaymentDay = false;
        }
      });
    if (this.applicationData.finalCreditInfo && this.applicationData.finalCreditInfo.product) {
      if (
        this.applicationData.finalCreditInfo.product.isOverdraft === false &&
        this.applicationData.finalCreditInfo.product.forCard === false
      ) {
        this.isVisiblePaymentDay = true;
        this.isVisibleCalculationDay = false;
      }
      if (
        this.applicationData.finalCreditInfo.product.isOverdraft === true ||
        this.applicationData.finalCreditInfo.product.forCard === true
      ) {
        this.isVisiblePaymentDay = false;
        this.isVisibleCalculationDay = true;
      }
    }
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'openComments': {
        this.onCommentClick();
        break;
      }
      case 'loadToSopiok': {
        this.loadCommentToSopiokChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  submitForm() {
    if (this.acceptanceForm.valid) {
      this.isLoading = true;

      this.appService
        .setAccepterDecision(this.applicationData.id, this.acceptanceForm.get('result.accepterDecision').value)
        .pipe(
          switchMap(_ => this.appService.acceptApp(this.applicationData.id.toString(), this.language)),
          catchError(err => {
            this.isLoading = false;
            return throwError(err);
          })
        )
        .subscribe((res: any) => {
          if (!res) {
            this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
            this.navigateToDashboard();
          } else {
            this.isLoading = false;
            this.toastService.viewMsg(res.message, 'warning');
          }
        });
    }
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  private onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  private loadCommentToSopiokChat(comment: string) {
    this.chatCradminManagerService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .subscribe();
  }

  private setChatInfo() {
    this.chatCradminManagerService
      .getAllByApplicationId(this.applicationData.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        res.sort(function(a, b) {
          // @ts-ignore
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.chatCradminManagerList = res;
      });

    this.isNewMessageExists = this.applicationData.newMessageCradmMngrChat;
  }

  private checkReadonly() {
    if (this.readonlyForm) {
      this.acceptanceForm.disable();
    }
  }

  private createForm() {
    this.acceptanceForm = this.formBuilder.group({});
    const additionalParametersControls: FormGroup = this.formGroupService.createForm(
      this.applicationData.finalCreditInfo,
      this.additionalParametersConfig,
      this.optionsList
    );
    const accountNameControls: FormGroup = this.formGroupService.createForm(
      this.accountIssue,
      this.accountNameConfig,
      null
    );
    const resultControls: FormGroup = this.formGroupService.createForm(
      this.applicationData,
      this.resultConfig,
      this.optionsList
    );

    this.acceptanceForm.addControl(AcceptanceGroupKeys.AdditionalParameters, additionalParametersControls);
    this.acceptanceForm.addControl(AcceptanceGroupKeys.AccountName, accountNameControls);
    this.acceptanceForm.addControl(AcceptanceGroupKeys.Result, resultControls);
  }

  private getDirectories() {
    combineLatest([
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.productToPaymentDay$,
      this.accepterDecisionList$,
      this.selectUserData$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          scheduleTypes,
          scheduleFrequencies,
          ensureTypes,
          issueTypes,
          productToPaymentDay,
          accepterDecisionList,
          selectedUserData
        ]) => {
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.ProductToPaymentDay] = productToPaymentDay || null;
          this.optionsList[OptionListNames.AccepterDecisionList] = getOnlyActiveItems<Dir>(accepterDecisionList);
          this.userData = selectedUserData || null;
        }
      );
  }
}
