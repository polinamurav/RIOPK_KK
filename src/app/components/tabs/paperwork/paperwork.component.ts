import {
  AccountIssueGetDto,
  Application,
  ApplicationDto,
  BaseFormField,
  CommentDto,
  CreditInfo,
  PrintFormModalEmit,
  PrintingFormDto,
  TableData,
  UserDto,
  EInputType,
  ValueType,
  OptionListNames,
  DirAbsCode,
  Dir,
  PrintingFormDownloadRq
} from '@app/_models';
import { ApplicationControllerService, PrintingFormControllerService } from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, combineLatest, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';

import { AdditionalPrintFormService } from '@app/services/additional-print-form.service';
import { ChatCradminManagerControllerService } from '@app/api/chat-cradmin-manager-controller.service';
import { DeclineReasonModalComponent } from '@app/shared/modals/decline-reason-modal/decline-reason-modal.component';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { PrintFormModalComponent } from '@app/shared/modals/print-form-modal/print-form-modal.component';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import {
  PAPERWORK_ACCOUNT_NAME,
  PAPERWORK_ADDITIONAL_PARAMETERS,
  PAPERWORK_RESULT,
  PAPERWORK_TITLES,
  PaperworkGroupKeys
} from '@app/components/tabs/paperwork/constants/paperwork.config';
import { ProductToPaymentDay } from '@app/_models/api-models/product-to-payment-day';
import { FINAL_CREDIT_INFO_HEADERS } from '@app/components/tabs/paperwork/constants/paperwork.constants';
import { FormGroupService } from '@app/services/form-group.service';

type Options = DirAbsCode | Dir | ProductToPaymentDay;

@Component({
  selector: 'ng-paperwork',
  templateUrl: './paperwork.component.html',
  styleUrls: ['./paperwork.component.scss']
})
export class PaperworkComponent implements OnInit, OnDestroy {
  paperworkForm: FormGroup;
  footerConfigSource = 'common.paperwork';
  isLoading: boolean = false;

  titles: Record<string, string> = PAPERWORK_TITLES;
  PaperworkGroupKeys = PaperworkGroupKeys;
  additionalParametersConfig: BaseFormField[] = PAPERWORK_ADDITIONAL_PARAMETERS;
  accountNameConfig: BaseFormField[] = PAPERWORK_ACCOUNT_NAME;
  resultConfig: BaseFormField[] = PAPERWORK_RESULT;
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
    [OptionListNames.PaperworkDecisionList]: [],
    [OptionListNames.DeclineReasons]: []
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
  private paperworkDecisionList$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.paperworkDecisionList))
  );
  private declineReasons$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.declineReasons)));

  finalCreditInfoColTableData: TableData<any> = new TableData(FINAL_CREDIT_INFO_HEADERS, []);

  constructor(
    private router: Router,
    private toastService: ToastService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private appService: ApplicationControllerService,
    private chatCradminManagerService: ChatCradminManagerControllerService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private additionalPrintFormService: AdditionalPrintFormService,
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
    this.paperworkForm
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
      case 'print': {
        this.printForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'decline': {
        this.openDeclineReasonModal();
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
    if (this.paperworkForm.valid) {
      this.isLoading = true;

      this.appService
        .setPaperworkDecision(this.applicationData.id, this.paperworkForm.get('result.paperworkDecision').value)
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

  printForm() {
    this.additionalPrintFormService
      .getPrintFormsWithSigners(this.applicationData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: PrintingFormDto[]) => {
        if (res) {
          this.openPrintFormModal(res);
        }
      });
  }

  openPrintFormModal(modalData: PrintingFormDto[]) {
    const dialogRef = this.dialog.open(PrintFormModalComponent, {
      height: 'auto',
      width: '40vw',
      data: { modalData, language: this.language }
    });

    (dialogRef.componentInstance as PrintFormModalComponent).emitData
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PrintFormModalEmit) => {
        const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
          this.applicationData.id,
          data.form.id,
          null,
          this.applicationData.finalCreditInfo.product.id
        );
        this.isLoading = true;
        this.printingFormService
          .fillExternal(agreementFormParams)
          .pipe(
            catchError(err => {
              this.isLoading = false;
              return throwError(err);
            }),
            untilDestroyed(this)
          )
          .subscribe(res => {
            this.fileService.downloadFile(res, `${data.form.name}.pdf`);
            this.isLoading = false;
          });
      });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  openDeclineReasonModal() {
    const dialogRef = this.dialog.open(DeclineReasonModalComponent, {
      width: '40vw',
      maxWidth: '40vw',
      height: '30vh',
      data: { declineReasons: this.optionsList[OptionListNames.DeclineReasons], language: this.language }
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: string | number) => {
        if (result && typeof result !== 'string') {
          this.cancelApp(result);
        }
      });
  }

  cancelApp(dirManagerDeclineReasonId: number) {
    this.isLoading = true;

    const data: Partial<ApplicationDto> = { dirManagerDeclineReasonId };

    this.saveApplicationData(data)
      .pipe(
        switchMap(_ => this.appService.declineApp(this.applicationData.id.toString())),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Denied', 'success');
        this.navigateToDashboard();
      });
  }

  private onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
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

  private checkReadonly() {
    if (this.readonlyForm) {
      this.paperworkForm.disable();
    }
  }

  private createForm() {
    this.paperworkForm = this.formBuilder.group({});
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

    this.paperworkForm.addControl(PaperworkGroupKeys.AdditionalParameters, additionalParametersControls);
    this.paperworkForm.addControl(PaperworkGroupKeys.AccountName, accountNameControls);
    this.paperworkForm.addControl(PaperworkGroupKeys.Result, resultControls);
  }

  private getDirectories() {
    combineLatest([
      this.dirScheduleTypes$,
      this.dirScheduleFrequency$,
      this.dirEnsureType$,
      this.dirIssueType$,
      this.productToPaymentDay$,
      this.paperworkDecisionList$,
      this.selectUserData$,
      this.declineReasons$
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
          paperworkDecisionList,
          selectedUserData,
          declineReasons
        ]) => {
          this.optionsList[OptionListNames.ScheduleTypes] = getOnlyActiveItems<DirAbsCode>(scheduleTypes);
          this.optionsList[OptionListNames.ScheduleFrequencies] = getOnlyActiveItems<Dir>(scheduleFrequencies);
          this.optionsList[OptionListNames.EnsureTypes] = getOnlyActiveItems<Dir>(ensureTypes);
          this.optionsList[OptionListNames.IssueTypes] = getOnlyActiveItems<Dir>(issueTypes);
          this.optionsList[OptionListNames.ProductToPaymentDay] = productToPaymentDay || null;
          this.optionsList[OptionListNames.PaperworkDecisionList] = getOnlyActiveItems<Dir>(paperworkDecisionList);
          this.userData = selectedUserData || null;
          this.optionsList[OptionListNames.DeclineReasons] = getOnlyActiveItems<Dir>(declineReasons);
        }
      );
  }

  private saveApplicationData(data: Partial<ApplicationDto>): Observable<ApplicationDto> {
    const appData: ApplicationDto = new ApplicationDto(this.applicationData);
    return this.appService.update({
      ...appData,
      ...data
    });
  }
}
