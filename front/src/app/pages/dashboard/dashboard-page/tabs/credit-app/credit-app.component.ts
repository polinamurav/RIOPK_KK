import * as _ from 'lodash';
import {
  AbsSearchClientDto,
  BaseFormField,
  CreditUserInfoDto,
  CustomOptionList,
  Dir,
  DirAbsCode,
  EInputType,
  FileUploadDto,
  IdentityCardType,
  OptionListNames,
  PaginationAndSortingDto,
  PreApprovedOfferDto,
  PreapprovedOfferParams,
  ProductDto,
  ShortFormParallelAppsResponse,
  UserDto,
  ValueType
} from '@app/_models';
import {
  BpmFrontControllerService,
  DirectoriesService,
  PrintingFormControllerService,
  ShortApplicationControllerService
} from '@app/api';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  applicationTypesEnum,
  CONTROL_NAMES,
  FORM_SUB_TITLES,
  SHORT_FORM,
  ApplicationTypeMap
} from './constants/short-form-config';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { catchError, debounceTime, finalize, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { CredentialsService } from '@app/services/authentication';
import { FormGroupService } from '@app/services/form-group.service';
import { IAppState } from '@app/store/state/app.state';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { untilDestroyed } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { CreditAppTableModalComponent } from './credit-app-modal/credit-app-table-modal.component';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { PHONE_CODE, PHONE_MASK, PHONE_PREFIX } from '@app/constants/phone-code';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { InputErrorKeys } from '@app/constants/validators-errors';
import { AbsSearchClientControllerService } from '@app/api/abs-search-client-controller.service';
import { DashboardPageService } from '@app/pages/dashboard/dashboard-page/dashboard-page.service';
import { PrintingFormAgreementDto, PrintingFormEsignDto } from '@app/_models/api-models/printing-form-agreement-dto';
import { FileDownloaderEmitConfig } from '@app/shared/components/file-downloader/file-downloader.component';
import { AttachmentControllerService } from '@app/api/attachment-controller.service';
import { MimeTypes } from '@app/components/constants/mime-types';
import { AppDuplicatesModalComponent } from '@app/components/modals/app-duplicates-modal/app-duplicates-modal.component';
import {
  IInfoModalConfig,
  InfoModalComponent,
  InfoModalResult
} from '@app/components/modals/info-modal/info-modal.component';
import {
  BiometricModalComponent,
  IBiometricModalConfig
} from '@app/pages/dashboard/dashboard-page/tabs/credit-app/biometric-modal/biometric-modal.component';
import { OtpType } from '@app/components/otp/otp-data.service';
import { ELanguage } from '@app/constants/language';

type Options = ProductDto | CustomOptionList | DirAbsCode | Dir;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

enum PrintConsentEnum {
  PrintRefusalConsentToEsign = 'PrintRefusalConsentToEsign',
  PrintConsentToEsign = 'PrintConsentToEsign',
  PrintConsent = 'PrintConsent'
}

enum ABSStatusName {
  OK = 'OK',
  ERROR = 'ERROR'
}

// Краткая анкета
@Component({
  selector: 'app-credit-app',
  templateUrl: './credit-app.component.html',
  styleUrls: ['./credit-app.component.scss']
})
export class CreditAppComponent implements OnInit, OnDestroy {
  // ! TODO Romanovski: changed all
  public fileName: string;
  public fileAgreementData: FileUploadDto;
  fileAgreementError: string;
  fileAgreementFormatError: boolean;
  public returnString: boolean = true;
  //

  @ViewChild('formDirective') private formDirective: NgForm;

  acceptAgreement = [
    MimeTypes.PDF,
    MimeTypes.PNG,
    MimeTypes.DOC,
    MimeTypes.DOCX,
    MimeTypes.XLS,
    MimeTypes.XLSX,
    MimeTypes.JPG
  ];

  biometricPassed: boolean;
  biometricDisabled: boolean;

  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };
  public readonly phonePrefix: string = PHONE_PREFIX;
  public readonly phoneMask: string = PHONE_MASK;
  public isVisibleSubmitButton: boolean = false;
  public isUploadFileAgreement: boolean = false;
  public preapprovedOfferSelected: boolean = false;
  public isDownload: boolean = false;
  public userData: UserDto;

  public creditAppForm: FormGroup;
  public currentRoles: Record<string, boolean>;

  public blockOtpEmit: boolean = true;
  public isLoading: boolean = false;
  public isConsentDownloaded: boolean = true;
  public isAgreementSigned: boolean = false;
  public isShowCreateButton: boolean = false;
  public isClientMilitary: boolean = false;
  public isClientVip: boolean = false;
  public isABSAlreadyBeen: boolean = false;
  public loadingABSInfo: boolean = false;

  public formConfig: BaseFormField[] = SHORT_FORM;
  public language: string = this.translateService.currentLang;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public formSubTitles = FORM_SUB_TITLES;
  public controlNames = CONTROL_NAMES;
  public optionsList: Record<string, Options[]> = {
    [OptionListNames.Product]: [],
    [OptionListNames.IdentityCardType]: [],
    [OptionListNames.SocialCardType]: [],
    [OptionListNames.Currencies]: [],
    [OptionListNames.ApplicationType]: []
  };
  public preApprovedOfferId: number;
  public consentExistsTrue: boolean;
  public isESignTriggered: boolean;
  public consentExistsFalse: boolean;
  public isAgreement: boolean;
  public noClientAbs = false;
  public otpValidationValid = false;

  public applicationId: number;

  private isSubmitted: boolean = false;
  private phoneValidationCod: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private selectUserData$ = this._store.pipe(select(selectUserData));
  private productCategories$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productCategories))
  );

  private isGetPreApprovedCreditClicked = false;

  private absError: boolean;
  private showInfoBiometricOpened: boolean;
  private otpType: string;

  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private toastService: ToastService,
    private translateService: TranslateService,
    private bpmFrontService: BpmFrontControllerService,
    private credentialsService: CredentialsService,
    private formGroupService: FormGroupService<any, Options>,
    private directoriesService: DirectoriesService,
    private printingFormService: PrintingFormControllerService,
    private shortApplicationService: ShortApplicationControllerService,
    private absSearchClientService: AbsSearchClientControllerService,
    private readonly dashboardPageService: DashboardPageService,
    private readonly attachmentControllerService: AttachmentControllerService
  ) {
    this.getDirectories();
  }

  get isCanCreateApp() {
    if (this.isPreliminaryRequest) {
      return (this.creditAppForm.valid && this.isVisibleSubmitButton);
    }
    return (this.isOtpSMSType && this.creditAppForm.valid && this.otpValidationValid && this.isVisibleSubmitButton) ||
      (this.isOtpPrintingType && this.creditAppForm.valid && this.otpValidationValid && this.isVisibleSubmitButton && this.getIsAgreementSigned && !this.isFileAgreementEmpty);
  }

  public get getIsConsentExists() {
    if (this.creditAppForm.controls.isConsentExists) {
      return this.creditAppForm.controls.isConsentExists.value as FormControl;
    }
  }

  public getIsValidPrintingValidation() {
    return this.isOtpPrintingType && this.getIsAgreementSigned;
  }

  public get getIsAgreementSigned(): boolean {
    if (this.creditAppForm.controls.agreement) {
      return !!this.creditAppForm.controls.agreement.value;
    }
  }

  get isOtpSMSType() {
    return this.otpType === OtpType.SMS;
  }

  get isOtpPrintingType() {
    return this.otpType === OtpType.PRINTING_FORM;
  }

  get isFileAgreementEmpty() {
    return this.isOtpPrintingType && !this.fileAgreementData;
  }

  get enableESignAgreement() {
    const checkingControls = ['firstName', 'lastName', 'productId'];
    const controlsValid = checkingControls.some(
      name => !this.creditAppForm.controls[name].value || this.creditAppForm.controls[name].invalid
    );

    // for prod

    return false; // !controlsValid && (this.consentExistsTrue || this.isESignTriggered);
  }

  public ngOnInit() {
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);
    this.createLanguageSubscription();
    this.createForm();
    this.subscribeToValueChangeForm();
    // this.createConsentControlSubscription();
  }

  onSocCardInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  phoneCodes() {
    this.directoriesService.getPhoneCodes().subscribe(data => {
      this.phoneValidationCod = `^((?:${data.join('|')}))`;
      this.creditAppForm
        .get('phone')
        .setValidators([
          Validators.required,
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
        ]);
      this.creditAppForm.get('phone').updateValueAndValidity();
    });
  }

  public ngOnDestroy(): void {
    this.resetForm();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  otpValidationEvent(event: any) {
    this.otpValidationValid = !!event.valid;
    if (event.valid && event.email) {
      this.creditAppForm.get('email').setValue(event.email);
    }
  }

  get isPreliminaryRequest(): boolean {
    const applicationType = this.creditAppForm.get('applicationType').value;
    return this.getIsPreliminaryRequest(applicationType);
  }

  private getIsPreliminaryRequest(applicationType: any): boolean {
    let typeCode: string;

    if (!applicationType) {
      typeCode = applicationTypesEnum.LOAN_APPLICATION;
    } else if (typeof applicationType === 'object') {
      typeCode = applicationType.code;
    } else if (typeof applicationType === 'string') {
      typeCode = applicationType;
    }

    return typeCode === applicationTypesEnum.PRELIMINARY_REQUEST;
  }

  get isSearchButtonDisabled(): boolean {
    // console.log(this.creditAppForm);
    if (this.isPreliminaryRequest) {
      return this.isLoading || !this.creditAppForm.valid;
    } else {
      return this.isLoading || !this.otpValidationValid;
    }
  }

  emailSendEvent(event: boolean) {
  }

  smsSendEvent(event: boolean) {
    event ? this.creditAppForm.get('phone').disable() : this.creditAppForm.get('phone').enable();
  }

  public getPreApprovedCredit() {
    // if (this.isGetPreApprovedCreditClicked) {
    //   return;
    // }

    if (this.isPreliminaryRequest) {
      this.getShortApplicationId();

      const visibilityConfig = {
        'isClientVip': this.isPreliminaryRequest,
        'isClientMilitary': this.isPreliminaryRequest,
        'ignoreIncome': this.isPreliminaryRequest
      };

      this.disableFormFields(['isClientMilitary']);

      this.formConfig = this.formConfig.map(field => {
        if (visibilityConfig.hasOwnProperty(field.code)) {
          return {
            ...field,
            isVisible: visibilityConfig[field.code]
          };
        }
        return field;
      });

      this.cd.markForCheck();
    }

    if (!this.checkIdentityCardValue()) {
      this.isGetPreApprovedCreditClicked = false;
      return;
    }


    // this.isGetPreApprovedCreditClicked = true

    if (!this.isPreliminaryRequest) {
      this.showAppDuplicates(this.applicationId);
    }
  }

  public uploadFile(event: FileDownloaderEmitConfig) {
    this.fileAgreementError = null;
    this.fileAgreementFormatError = null;
    if (event && event.file) {
      const nameArr = event.file.name.split('.');
      const extension = nameArr[nameArr.length - 1];
      this.fileAgreementData = {
        file: event.file,
        name: event.file.name,
        extension,
        size: event.file.size,
        content: event.base64,
        type: 'AGREEMENT'
      };
    } else {
      if (event && event.error) {
        this.fileAgreementFormatError = true;
      }
      this.fileAgreementData = null;
    }
  }

  public getFilledAgreement(isEsign?: boolean) {
    // if (isEsign) {
    //   this.creditAppForm.get('createdApp').setValue(true);
    //   this.creditAppForm.get('createdApp').updateValueAndValidity();
    //   this.printAgreement(true);
    // } else {
    //   this.creditAppForm.get('isAgreementButton').setValue(true);
    //   this.creditAppForm.get('isAgreementButton').updateValueAndValidity();
    //   this.creditAppForm.get('agreement').enable();
    //
    //
    // }
    this.creditAppForm.get('agreement').enable();
    this.printAgreement();
    //  this.setRequiredValidator(['firstName', 'lastName'], true);
  }

  showInfoBiometric() {
    if (this.showInfoBiometricOpened || this.biometricPassed || this.isPreliminaryRequest) {
      this.createApp();
    } else {
      const config: IInfoModalConfig = {
        title: 'ShortForm.PassBiometry',
        textContent: 'ShortForm.BiometryFasterProcessing',
        btnConfirmName: 'ShortForm.Yes',
        btnCancelName: 'ShortForm.No',
        showClose: false
      };
      const dialog = this.dialog
        .open(InfoModalComponent, {
          data: config,
          width: '40%'
        })
        .afterClosed()
        .pipe(
          tap(result => {
            if (result === InfoModalResult.CONFIRM) {
              this.openBiometricModal();
            } else {
              this.createApp();
            }
          })
        )
        .subscribe();
    }
  }

  openBiometricModal() {
    this.showInfoBiometricOpened = true;
    const config: IBiometricModalConfig = {
      title: 'ShortForm.PassBiometry',
      shortApplicationId: this.applicationId
    };
    const dialog = this.dialog
      .open(BiometricModalComponent, {
        data: config,
        width: '35%'
      })
      .afterClosed()
      .pipe(
        tap(result => {

          if (result.result) {
            this.biometricDisabled = true;
          }

          if (result.passed) {
            this.biometricPassed = result.passed;
          }

        })
      )
      .subscribe();
  }

  otpTypeEvent(e: any) {
    if (e) {
      this.otpType = e;
    }
  }

  public createApp() {
    if (this.otpType === OtpType.PRINTING_FORM) {
      if (!this.validateAttachmentAgreement()) {
        return;
      }

      // if (this.creditAppForm.get('createdApp').invalid) {
      //   this.toastService.viewMsg('“Печать Согласия/Отказа Esign” обязательна', 'error');
      //   console.log('Печать Согласия/Отказа Esign” обязательна');
      //   return;
      // }
    }

    // this.prepareFormToSubmit();

    // if (
    //   !this.isAgreement &&
    //   this.creditAppForm.get('isAgreementButton') &&
    //   this.creditAppForm.get('isAgreementButton').invalid
    // ) {
    //   if (!this.creditAppForm.get('isAgreementButton').value) {
    //     console.log('Печать Согласия” обязательна');
    //     this.toastService.viewMsg('“Печать Согласия” обязательна', 'error');
    //     return;
    //   }
    // }

    // if (this.creditAppForm.get('agreement').value) {
    //   this.creditAppForm.get('isAgreementButton').setValue(true);
    //   this.creditAppForm.get('isAgreementButton').updateValueAndValidity();
    // }

    if (this.creditAppForm.invalid) {
      return;
    }

    // const isPreApprovedControl = this.creditAppForm.get('isPreApproved');
    // const isConsentExistsControl = this.creditAppForm.get('isConsentExists');

    // if (isPreApprovedControl.value) {
    //   this.creditAppForm.addControl('preApprovedOfferId', new FormControl());
    //   this.creditAppForm.get('preApprovedOfferId').setValue(this.preApprovedOfferId ? this.preApprovedOfferId : null);
    // }

    // this.creditAppForm.addControl('esignAgreement', new FormControl());
    // this.creditAppForm.get('esignAgreement').setValue(!!isConsentExistsControl.value);
    const phone = this.creditAppForm.get('phone').value;
    const email = this.creditAppForm.get('email').value;

    const data: CreditUserInfoDto = {
      ...this.creditAppForm.getRawValue(),
      agreementFile: this.fileAgreementData,
      initUsername: this.userData.username,
      shortApplicationId: this.applicationId,
      email: !!email ? email : null,
      isSms: this.isPreliminaryRequest ? false : this.otpType === OtpType.SMS,
      isClientMilitary: this.creditAppForm.get('isClientMilitary').value
        ? this.creditAppForm.get('isClientMilitary').value
        : this.isClientMilitary,
      isClientVip: this.creditAppForm.get('isClientVip').value
        ? this.creditAppForm.get('isClientVip').value
        : this.isClientVip,
      phone: !!phone ? PHONE_CODE + phone : null
    };

    if (this.isPreliminaryRequest && this.creditAppForm.get('socCardPin').value) {
      data.socCardTypeId = 5;
      data.socCardPin = this.creditAppForm.get('socCardPin').value
    }

    this.isLoading = true;
    this.saveData(data);
  }

  public cancelApp(updateTable: boolean = true) {
    this.fileAgreementError = null;
    this.resetForm();
    this.creditAppForm.updateValueAndValidity();
    this.creditAppForm.updateValueAndValidity({ emitEvent: false });
    this.isVisibleSubmitButton = false;
    this.enableFormFields(['applicationType', 'socCardPin', 'identityCardTypeId', 'identityCardPin']);
    this.clearValidators(['applicationType', 'socCardPin', 'identityCardTypeId', 'identityCardPin']);
    this.setRequiredValidator(['applicationType', 'socCardPin', 'identityCardTypeId', 'identityCardPin']);
    this.isABSAlreadyBeen = false;
    this.isShowCreateButton = false;
    if (updateTable) {
      this.updateFormAndTable();
    }
  }

  private validateAttachmentAgreement = (): boolean => {
    if (!this.isAgreement) {
      this.fileAgreementError = null;
      if (!this.fileAgreementData) {
        this.fileAgreementError = 'ShortForm.AttachAgreementFileError';
        return false;
      }
    } else {
      if (this.fileAgreementFormatError) {
        return false;
      }
    }
    return true;
  };

  private callEkengGosRegistr() {
    const socCardPin = this.creditAppForm.get('socCardPin').value;

    const clientParams = {
      identityCardPin: this.creditAppForm.get('identityCardPin').value,
      identityCardTypeId: this.creditAppForm.get('identityCardTypeId').value,
      shortApplicationId: this.applicationId,
      ...(this.isPreliminaryRequest && socCardPin && {
        socCardPin: socCardPin,
        socCardTypeId: 5
      })
    };
    const phone = this.creditAppForm.get('phone').value;
    this.bpmFrontService
      .callEkengGosRegistr({
        ...clientParams,
        phone: !!phone ? PHONE_CODE + phone : null
      })
      .pipe(
        tap(res => {
          if (res.success) {
            this.creditAppForm.get('shortApplicationId').setValue(this.applicationId);

            if (!this.isPreliminaryRequest) {
              this.callABS();
            } else {
              this.continueAfterABS();
            }
            this.blockOtpEmit = false;
          } else {
            this.blockOtpEmit = true;
            this.toastService.viewMsg(this.language === 'ru' ? res.errorMessageRu : res.errorMessageAm, 'error');
          }
          this.loadingABSInfo = false;
        })
      )
      .subscribe();
  }

  private showAppDuplicates = (applicationId: number): void => {
    const socCardPin = this.creditAppForm.get('socCardPin').value;

    const clientParams = {
      identityCardPin: this.creditAppForm.get('identityCardPin').value,
      identityCardTypeId: this.creditAppForm.get('identityCardTypeId').value,
      shortApplicationId: applicationId,
      ...(this.isPreliminaryRequest && socCardPin && {
        socCardPin: socCardPin,
        socCardTypeId: 5
      })
    };

    this.isLoading = true;
    this.absSearchClientService
      .getAppDuplicates(clientParams)
      .pipe(
        tap(data => {
          if (data.apps.length) {
            this.appDuplicatesModal(data);
          }
          if (data.createPossible && !data.apps.length) {
            this.showPreApproveModal();
          }
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  };

  private showPreApproveModal = (): void => {
    this.showPreApprovedModal();

    // if (!this.isABSAlreadyBeen) {
    // this.absError = false;
    // this.absSearchClientService
    //   .getABSClient(clientParams)
    //   .pipe(
    //     tap(this.showAbsErrorMessage),
    //     tap(this.setAbsInfoData),
    //     finalize(() => {
    //       this.isGetPreApprovedCreditClicked = false;
    //       if (!this.absError) {
    //         this.creditAppForm.addControl('createdApp', new FormControl());
    //         this.creditAppForm.addControl('isAgreementButton', new FormControl());
    //         this.creditAppForm.get('isAgreementButton').setValidators([Validators.required]);
    //         this.creditAppForm.get('isAgreementButton').updateValueAndValidity();
    //         this.creditAppForm
    //           .get('isConsentExists')
    //           .valueChanges.pipe(tap(this.validateEsign))
    //           .subscribe();
    //         this.showPreApprovedModal();
    //       }
    //     }),
    //     catchError(er => {
    //       this.setNoClientAbs();
    //       return EMPTY;
    //     }),
    //     untilDestroyed(this)
    //   )
    //   .subscribe();
    // }
  };

  private callABS() {
    const socCardPin = this.creditAppForm.get('socCardPin').value;

    const clientParams = {
      identityCardPin: this.creditAppForm.get('identityCardPin').value,
      identityCardTypeId: this.creditAppForm.get('identityCardTypeId').value,
      shortApplicationId: this.applicationId,
      ...(this.isPreliminaryRequest && socCardPin && {
        socCardPin: socCardPin,
        socCardTypeId: 5
      })
    };

    this.absSearchClientService
      .getABSClient(clientParams)
      .pipe(
        tap(this.showAbsErrorMessage),
        tap(this.setAbsInfoData),
        untilDestroyed(this)
      ).subscribe({
      next: (absResponse: any) => {
        if (this.isPreliminaryRequest) {
          const isClientFound = absResponse.statusCode === 0 &&
            !absResponse.errorMessageAm &&
            !absResponse.errorMessageRu;
          const hasMonitoring = absResponse.monitoring === 1;

          if (isClientFound && hasMonitoring) {
            this.callEkengGosRegistr();
          } else {
            if (!hasMonitoring && !this.absError) {
              this.blockPreliminaryRequest();
            } else {
              this.continueAfterABS();
            }
          }
        } else {
          this.continueAfterABS();
        }
      },
      error: (er) => {
        this.setNoClientAbs();
      }
    });
  }

  private blockPreliminaryRequest(): void {
    this.toastService.viewMsg('ErrorMessage.ApplicationCanSubmittedInStandard', 'error');
    this.loadingABSInfo = false;
    this.cancelApp();
  }

  private continueAfterABS() {
    if (!this.absError) {
      this.isGetPreApprovedCreditClicked = false;
      if (this.isPreliminaryRequest) {
        this.showAppDuplicates(this.applicationId);
      }
    } else {
      this.loadingABSInfo = false;
      this.cancelApp();
    }
    // if (!this.absError) {
    // this.creditAppForm.addControl('createdApp', new FormControl());
    // this.creditAppForm.addControl('isAgreementButton', new FormControl());
    // this.creditAppForm.get('isAgreementButton').setValidators([Validators.required]);
    // this.creditAppForm.get('isAgreementButton').updateValueAndValidity();
    // this.creditAppForm
    //   .get('isConsentExists')
    //   .valueChanges.pipe(tap(this.validateEsign))
    //   .subscribe();
    // this.showPreApprovedModal();
    // }
  }

  private getShortApplicationId() {
    this.loadingABSInfo = true;
    this.shortApplicationService
      .getApplicationId()
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe((res: number) => {
        this.applicationId = res;

        if (this.isPreliminaryRequest) {
          this.callABS();
        } else {
          this.callEkengGosRegistr();
        }
      });
  }

  private showPreApprovedModal() {
    const params: PreapprovedOfferParams = {
      identityCardPin: this.creditAppForm.get('identityCardPin').value,
      identityCardTypeId: this.creditAppForm.get('identityCardTypeId').value,
      shortApplicationId: this.applicationId
    };

    this.showDialog(
      {
        title: 'Modals.Title.PreApprovedOffers',
        offerParams: params,
        containerClass: 'grid-two-cols'
      },
      (data: PreApprovedOfferDto) => {
        this.disableFormFields(['identityCardTypeId', 'identityCardPin']);
        this.showAllFormFields();
        this.isVisibleSubmitButton = true;
        this.isShowCreateButton = true;
        if (data) {
          this.saveDataWithPreApproved(data);
        }
        this.isUploadFileAgreement = true;
      },
      (data: any) => {
        this.isVisibleSubmitButton = true;
        this.disableFormFields(['identityCardTypeId', 'identityCardPin']);
        this.isShowCreateButton = true;
      },
      () => {
        // this.cancelApp();
        this.updateFormAndTable();
      }
    );
  }

  private appDuplicatesModal = (data: ShortFormParallelAppsResponse): void => {
    const dialogRef = this.dialog
      .open(AppDuplicatesModalComponent, {
        width: '60%',
        height: '48%',
        panelClass: 'custom-panel-cls',
        data
      })
      .afterClosed()
      .pipe(
        tap(res => {
          if (!res || res === 'close') {
            this.cancelApp(false);
            this.updateFormAndTable();
          } else if (res === 'CREATE_NEW') {
            this.showPreApproveModal();
          }
          this.isGetPreApprovedCreditClicked = false;
        })
      )
      .subscribe();
  };

  private printAgreement(isEsing?: boolean) {
    // if (isEsing) {
    //   const printData = this.getDataForPrinting(isEsing);
    //   const isConsentExists = !!this.getIsConsentExists;
    //   this.printingFormService.getFilledAgreementEsign(printData, isConsentExists);
    // } else {
    const printData = this.getDataForPrinting();
    this.printingFormService.getFilledAgreement(printData);
    // }
  }

  private getDataForPrinting = (forEsign?: boolean): PrintingFormAgreementDto | PrintingFormEsignDto => {
    if (!forEsign) {
      return {
        phone: this.creditAppForm.get('phone').value,
        pin: this.creditAppForm.get('identityCardPin').value,
        shortApplicationId: this.applicationId
      };
    } else {
      return {
        pin: this.creditAppForm.get('identityCardPin').value,
        identityCardTypeId: this.creditAppForm.get('identityCardTypeId').value
      };
    }
  };

  private setAbsInfoData = (clientInfo?: AbsSearchClientDto): void => {
    if (!this.absError && clientInfo) {
      this.noClientAbs = false;

      this.isAgreement = false; // !!clientInfo.agreement;
      this.consentExistsTrue = !!clientInfo.agreement_esign;

      const agreementControl = this.creditAppForm.get('agreement');
      const consentExistsControl = this.creditAppForm.get('isConsentExists');
      const firstNameControl = this.creditAppForm.get('firstName');
      const lastNameControl = this.creditAppForm.get('lastName');

      if (agreementControl) {
        if (this.isAgreement) {
          agreementControl.setValue(this.isAgreement);
        } else {
          agreementControl.disable();
        }
      }

      if (consentExistsControl) {
        consentExistsControl.setValue(this.consentExistsTrue);
      }

      if (firstNameControl) {
        firstNameControl.setValue(clientInfo.firstName || '');
      }

      if (lastNameControl) {
        lastNameControl.setValue(clientInfo.lastName || '');
      }

      this.isABSAlreadyBeen = true;
      this.cd.detectChanges();
    } else {
      this.setNoClientAbs();
    }
  };

  private showAbsErrorMessage = (clientInfo?: AbsSearchClientDto): void => {
    if (clientInfo.errorCode && [1, 3, 4, 5, 6].includes(+clientInfo.errorCode)) {
      this.absError = true;
      this.toastService.viewMsgWithClose(this.language === ELanguage.Am ? clientInfo.errorMessageAm : clientInfo.errorMessageRu, 'error');
    }
  };

  private validateEsign = (currentValue: boolean): void => {
    const option = { emitEvent: false };
    if (currentValue === !!this.consentExistsTrue) {
      this.isESignTriggered = false;
      this.creditAppForm.get('createdApp').clearValidators();
      this.creditAppForm.get('createdApp').updateValueAndValidity(option);
    } else {
      this.isESignTriggered = true;
      this.creditAppForm.get('createdApp').setValidators([Validators.required]);
      this.creditAppForm.get('createdApp').updateValueAndValidity(option);
    }
  };

  private setNoClientAbs = (): void => {
    if (!this.absError) {
      this.noClientAbs = true;
      this.creditAppForm.get('agreement').disable();
      this.creditAppForm.get('agreement').setValue(false);
      this.creditAppForm.get('agreement').updateValueAndValidity();
      this.isABSAlreadyBeen = true;

      if (this.isPreliminaryRequest) {
        this.blockPreliminaryRequest();
      }
    }
  };

  private prepareFormToSubmit() {
    this.creditAppForm.get('agreement').setValidators([Validators.requiredTrue]);
    this.creditAppForm.get('phone').setValidators(null);
    this.creditAppForm
      .get('phone')
      .setValidators([
        Validators.required,
        Validators.minLength(8),
        validateByPattern(this.phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
      ]);

    this.creditAppForm.get('phone').updateValueAndValidity();
    this.creditAppForm.get('agreement').updateValueAndValidity();
  }

  private updateFormAndTable() {
    // to think later
    // perhaps this solution is not better, but other implementations with "reset", "formReset", setErrors (null) do not work
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/pages/queues', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  private createForm() {
    this.creditAppForm = this.formGroupService.createForm(null, this.formConfig, this.optionsList);
    this.phoneCodes();
    this.creditAppForm.get('applicationType').valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe((applicationType: any) => {
        this.updateFieldPreApp(applicationType);
      });

    this.creditAppForm.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => {
          if (!this.isPreliminaryRequest) {
            if (
              this.creditAppForm.get('phone').valid &&
              this.creditAppForm.get('identityCardTypeId').valid &&
              this.creditAppForm.get('identityCardPin').valid &&
              !this.applicationId
            ) {
              this.getShortApplicationId();
            }
          }
        })
      )
      .subscribe();
  }

  private updateFieldPreApp(applicationType: any): void {
    const isPreliminaryRequest = this.getIsPreliminaryRequest(applicationType);

    this.resetSpecificFields();

    const phoneControl = this.creditAppForm.get('phone');
    if (phoneControl) {
      if (isPreliminaryRequest) {
        const patternValidators = [
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
        ];

        phoneControl.setValidators(patternValidators);
      } else {
        phoneControl.setValidators([
          Validators.required,
          validateByPattern('^[0-9]{8}$', InputErrorKeys.IncorrectData8),
          validateByPattern(this.phoneValidationCod, InputErrorKeys.PhoneCodeFormat)
        ]);
      }
      phoneControl.updateValueAndValidity();
    }

    const agreementControl = this.creditAppForm.get('agreement');
    if (agreementControl) {
      if (isPreliminaryRequest) {
        agreementControl.clearValidators();
      } else {
        agreementControl.setValidators([Validators.requiredTrue]);
      }
      agreementControl.updateValueAndValidity();
    }

    const shortApplicationId = this.creditAppForm.get('shortApplicationId');
    if (shortApplicationId) {
      if (isPreliminaryRequest) {
        shortApplicationId.clearValidators();
      } else {
        shortApplicationId.setValidators([Validators.required]);
      }
      shortApplicationId.updateValueAndValidity();
    }

    this.formConfig = this.formConfig.map(field => {
      if (field.code === 'phone' || field.code === 'agreement' || field.code === 'shortApplicationId') {
        return {
          ...field,
          required: !isPreliminaryRequest
        };
      }
      return field;
    });

    this.updateFieldVisibility(applicationType);
    this.cd.markForCheck();
  }

  private resetSpecificFields(): void {
    const fieldsToReset = [
      'isConsentExists', 'shortApplicationId',
      'email', 'isClientMilitary', 'isClientVip', 'ignoreIncome',
      'socCardPin', 'identityCardTypeId', 'identityCardPin', 'phone'
    ];

    fieldsToReset.forEach(field => {
      if (this.creditAppForm.get(field)) {
        this.creditAppForm.get(field).reset();
      }
    });
  }

  private updateFieldVisibility(applicationType: any): void {
    const isPreliminaryRequest = this.getIsPreliminaryRequest(applicationType);

    const visibilityConfig = {
      'socCardPin': isPreliminaryRequest
    };

    this.formConfig = this.formConfig.map(field => {
      if (visibilityConfig.hasOwnProperty(field.code)) {
        return {
          ...field,
          isVisible: visibilityConfig[field.code]
        };
      }
      return field;
    });

    this.cd.markForCheck();
  }

  private subscribeToValueChangeForm() {
    const identityCardTypeControl = this.creditAppForm.get('identityCardTypeId');
    const identityCardPinControl = this.creditAppForm.get('identityCardPin');
    const phoneCode = this.creditAppForm.get('phone');

    const identityCardType$ = identityCardTypeControl.valueChanges;
    const identityCardPin$ = identityCardPinControl.valueChanges;
    const phoneCode$ = phoneCode.valueChanges;

    identityCardType$.pipe(untilDestroyed(this)).subscribe(value => {
      if (value) {
        this.formConfig.forEach(res => {
          if (res.code === 'identityCardPin') {
            identityCardPinControl.setValidators(null);

            if (value === 3) {
              res.minLength = null;
              res.maxLength = null;
              identityCardPinControl.clearValidators();
              identityCardPinControl.setValidators([Validators.required]);
            }

            if (value === 2) {
              res.minLength = 9;
              res.maxLength = 9;
              identityCardPinControl.setValidators([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9),
                validateByPattern('^[A-Z]{2}[0-9]{7}$', InputErrorKeys.IncorrectPassData)
              ]);
              identityCardPinControl.updateValueAndValidity();
            } else if (value === 1) {
              res.minLength = 9;
              res.maxLength = 9;
              identityCardPinControl.setValidators([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9),
                validateByPattern('^[0-9]{9}$', InputErrorKeys.IncorrectData9)
              ]);
              identityCardPinControl.updateValueAndValidity();
            } else if (value === 4) {
              res.maxLength = 30;
              identityCardPinControl.setValidators(Validators.required);
              identityCardPinControl.updateValueAndValidity();
            }
          }
        });
      }
    });

    identityCardPin$.pipe(untilDestroyed(this)).subscribe(value => {
    });

    phoneCode$.pipe(untilDestroyed(this)).subscribe(value => {
    });
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

  private changeBranchControlVisibility() {
    if (!this.currentRoles.isDSA && !this.currentRoles.isCallCenter) {
      this.formConfig = this.formConfig.filter((configItem: BaseFormField) => configItem.code !== 'branchId');
    }
  }

  private getDirectories() {
    combineLatest([
      this.productCategories$,
      this.directoriesService.getIdentityCardTypeList(),
      this.directoriesService.getApplicationsType(),
      this.directoriesService.getCurrencies(),
      this.selectUserData$
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([productCategories, passportType, applicationTypes, currencies, user]) => {
        passportType.map(res => {
          res.nameRu = res.nameRu === '' ? 'Очистить поле' : res.nameRu;
        });
        this.setCurrentUserData<UserDto>(user);
        this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductDto>(productCategories);
        this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
        this.optionsList[OptionListNames.IdentityCardType] = getOnlyActiveItems<IdentityCardType>(
          this.passportTypefilter(passportType, false)
        );
        this.optionsList[OptionListNames.SocialCardType] = getOnlyActiveItems<IdentityCardType>(
          this.passportTypefilter(passportType, true)
        );
        this.optionsList[OptionListNames.ApplicationType] = this.transformApplicationTypes(applicationTypes);
      });
  }

  private transformApplicationTypes(types: string[]): any[] {
    return types.map((type, index) => {
      const mapping = ApplicationTypeMap[type as keyof typeof ApplicationTypeMap];
      return {
        id: type,
        code: type,
        nameRu: mapping.nameRu || type,
        nameAm: mapping.nameAm || type
      };
    });
  }

  private passportTypefilter(passportType: IdentityCardType[], isSocial: boolean) {
    return passportType.filter(el => el.isSoc === isSocial);
  }

  private showDialog(
    data: any,
    callback: (data: any) => void,
    noDataCallback: (data: any) => void,
    closeModalCallback: () => void
  ) {
    // TODO Romanovski: исправить any
    const dialogRef = this.dialog.open(CreditAppTableModalComponent, {
      width: '60%',
      height: '45%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(take(1), tap(callback)).subscribe();
    dialogRef.componentInstance.emitNoData.pipe(take(1), tap(callback)).subscribe(noDataCallback);
    dialogRef.componentInstance.closeModal.pipe(take(1), tap(callback)).subscribe(closeModalCallback);
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.userData = res;
    }
  }

  private showAllFormFields() {
    for (const control in this.controlNames) {
      this.formConfig.find(res => {
        if (res.code === control) {
          res.isVisible = true;
        }
      });
    }
  }

  private hideAllFormFields() {
    this.formConfig.forEach(res => {
      if (res.code !== 'identityCardTypeId' && res.code !== 'identityCardPin' && res.code !== 'phone' && res.code !== 'applicationType') {
        res.isVisible = false;
      }
    });
  }

  private disableFormFields(controlName: string[]) {
    controlName.forEach(control => {
      this.creditAppForm.controls[control].disable();
    });
  }

  private enableFormFields(controlName: string[]) {
    controlName.forEach(control => {
      this.creditAppForm.controls[control].enable({ emitEvent: false });
    });
  }

  private clearValidators(controlName: string[]) {
    controlName.forEach(control => {
      this.creditAppForm.controls[control].setValidators(null);
      this.creditAppForm.controls[control].updateValueAndValidity({ emitEvent: false });
    });
  }

  private setRequiredValidator(controlName: string[], pattern?: boolean) {
    const validators = [Validators.required, pattern ? Validators.pattern(/^([Ա-Ֆա-ֆև\-\s]+|\s*)$/i) : null];
    controlName.forEach(control => {
      this.creditAppForm.controls[control].setValidators(validators.filter(el => !!el));
      this.creditAppForm.controls[control].updateValueAndValidity();
    });
  }

  private checkIdentityCardValue() {
    return this.creditAppForm.get('identityCardTypeId').valid && this.creditAppForm.get('identityCardPin').valid;
  }

  private resetForm() {
    this.creditAppForm.reset();
    this.clearValidators(['phone']);
    this.hideAllFormFields();
    this.creditAppForm.markAsPristine();
    this.creditAppForm.markAsUntouched();
  }

  private saveDataWithPreApproved = (data: PreApprovedOfferDto): void => {
    this.isVisibleSubmitButton = true;
    const phone = this.creditAppForm.get('phone').value;

    const savedData: CreditUserInfoDto = {
      ...this.creditAppForm.getRawValue(),
      ...data,
      isPreApproved: true,
      initUsername: this.userData.username,
      shortApplicationId: this.applicationId,
      isClientMilitary: this.creditAppForm.get('isClientMilitary').value
        ? this.creditAppForm.get('isClientMilitary').value
        : this.isClientMilitary,
      isClientVip: this.creditAppForm.get('isClientVip').value
        ? this.creditAppForm.get('isClientVip').value
        : this.isClientVip,
      phone: !!phone ? PHONE_CODE + phone : null,
      preApprovedOfferId: data.id,
      applicationType: this.creditAppForm.get('applicationType').value
    };

    this.saveData(savedData);
  };

  private saveData(data: CreditUserInfoDto): void {
    this.isLoading = true;
    this.createAppRequest(data);
  }

  private attachAgreementFileForSave(data: CreditUserInfoDto): Observable<any> {
    let formData = new FormData();
    if (data.agreementFile) {
      formData.append('file', data.agreementFile.file, data.agreementFile.file.name);
    } else {
      formData = null;
    }

    return this.attachmentControllerService.uploadAttachment(
      null,
      null,
      'AGREEMENT',
      formData,
      null,
      data.shortApplicationId
    );
  }

  private createAppRequest = (data: CreditUserInfoDto): void => {
    this.isLoading = true;

    this.bpmFrontService
      .startProcess(data)
      .pipe(finalize(() => this.updateFormAndTable()))
      .subscribe(res => {
        if (res.statusCode !== 0) {
          this.toastService.viewMsg(res.statusDesc, 'warning');
        } else {
          this.toastService.viewMsg('SuccessMessage.AppCreated', 'success');
        }
        setTimeout(() => {
          this.dashboardPageService.updateDashboardTable();
          this.isLoading = false;
        }, 1000);
      });
  };
}
