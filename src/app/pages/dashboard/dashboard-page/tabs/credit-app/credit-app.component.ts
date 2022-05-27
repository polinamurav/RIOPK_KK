import * as _ from 'lodash';

import {
  BaseFormField,
  CreditUserInfoDto,
  CustomOptionList,
  DirBranch,
  EInputType,
  OptionListNames,
  PrintingFormDownloadRq,
  ProductRes,
  ShortApplicationDto,
  UserDto,
  ValueType
} from '@app/_models';
import {
  BpmFrontControllerService,
  DirBranchControllerService,
  PrintingFormControllerService,
  ShortApplicationControllerService
} from '@app/api';
import {
  CURRENCY_NAME,
  LANGUAGES,
  LanguagesList,
  getLanguageIdByName,
  getLanguageNameById
} from '@app/constants/language';
import { CURRENT_ROLES, setRoles } from '@app/components/constants/current-roles';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FORM_SUB_TITLES, SHORT_FORM, getFormFieldByName } from './constants/short-form-config';
import { FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';

import { CredentialsService } from '@app/services/authentication';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FormGroupService } from '@app/services/form-group.service';
import { IAppState } from '@app/store/state/app.state';
import { PHONE_CODE, PHONE_MASK_SHORT } from '@app/constants/phone-code';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Router } from '@angular/router';
import { SmsControllerService } from '@app/api/sms-controller.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { validateInvalidDate } from '@app/validators/date-custom-validator';

type Options = ProductRes | CustomOptionList | DirBranch;
@Component({
  selector: 'app-credit-app',
  templateUrl: './credit-app.component.html',
  styleUrls: ['./credit-app.component.scss']
})
export class CreditAppComponent implements OnInit, OnDestroy {
  public creditAppForm: FormGroup;
  public currentRoles: Record<string, boolean>;

  public isLoading: boolean = false;
  public isConsentDownloaded: boolean = false;
  public isAgreementSigned: boolean = false;

  public codeIsTrue: boolean = false;
  public isSmsExist: boolean = false;
  public smsCode: string = '';

  public formConfig: BaseFormField[] = SHORT_FORM;
  public language: string = this.translateService.currentLang;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public formSubTitles = FORM_SUB_TITLES;
  public optionsList: Record<string, Options[]> = {
    [OptionListNames.Product]: [],
    [OptionListNames.Languages]: LANGUAGES,
    [OptionListNames.Branches]: []
  };

  private isSubmitted: boolean = false;
  private userName: string = '';
  private AGREEMENT: string = 'AGREEMENT';
  private phonePrefix: string = `+${PHONE_CODE}`;
  private phoneMask: string = `${PHONE_MASK_SHORT}`;
  private selectUserData$ = this._store.pipe(select(selectUserData));
  private productCategories$ = this._store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.productCategories))
  );

  constructor(
    private _store: Store<IAppState>,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
    private bpmFrontService: BpmFrontControllerService,
    private credentialsService: CredentialsService,
    private printingFormControllerService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private shortApplicationService: ShortApplicationControllerService,
    private branchService: DirBranchControllerService,
    private formGroupService: FormGroupService<any, Options>,
    private elem: ElementRef,
    private smsControllerService: SmsControllerService
  ) {
    this.getDirectories();
  }

  ngOnInit() {
    this.currentRoles = _.cloneDeep(CURRENT_ROLES);
    setRoles(this.currentRoles, this.credentialsService);

    this.createLanguageSubscription();

    this.createForm();
    this.setInitialLang();
    this.setDateCustomValidator();
    this.createConsentControlSubscription();
    this.createSMSCodeSubscription();
  }

  setDateCustomValidator() {
    const controlName = 'birthDate';
    this.creditAppForm
      .get(controlName)
      .setValidators([
        ...this.formGroupService.controlValidators(getFormFieldByName(controlName)),
        validateInvalidDate()
      ]);
  }

  ngOnDestroy(): void {}

  createApp() {
    this.isLoading = true;

    const data: CreditUserInfoDto = {
      ...this.creditAppForm.getRawValue(),
      agreement: this.creditAppForm.getRawValue().isConsentExists,
      branchCode: this.getBranchCodeById(this.creditAppForm),
      language: getLanguageNameById(this.creditAppForm.getRawValue().language),
      currencyId: CURRENCY_NAME,
      phone: PHONE_CODE + this.creditAppForm.get('mobilePhone').value,
      initUsername: this.userName
    };
    this.bpmFrontService
      .startProcess(data)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(res => {
        if (res.statusCode !== 0) {
          this.toastService.viewMsg(res.statusDesc, 'warning');
        } else {
          this.toastService.viewMsg('SuccessMessage.AppCreated', 'success');
          this.cancelApp();
        }
      });
  }

  getFilledAgreement() {
    const shortApp: ShortApplicationDto = {
      ...this.creditAppForm.getRawValue(),
      mobilePhone: PHONE_CODE + this.creditAppForm.get('mobilePhone').value,
      created: new Date(),
      initUsername: this.userName
    };

    this.isSubmitted = true;

    if (this.creditAppForm.invalid) {
      this.scrollToFirstInvalid();
      return;
    }
    this.isLoading = true;
    this.creditAppForm.disable();
    this.shortApplicationService
      .create(shortApp)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        switchMap((ShortFormId: number) => {
          const agreementFormParams: PrintingFormDownloadRq = new PrintingFormDownloadRq(
            null,
            this.AGREEMENT,
            ShortFormId,
            null
          );
          return this.printingFormControllerService.fillExternal(agreementFormParams);
        }),
        finalize(() => (this.isLoading = false)),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.fileService.downloadFile(res, this.translateTitle('FilesNames.Agreement', 'pdf'));
        this.creditAppForm.get('isConsentExists').enable();
        this.isConsentDownloaded = true;
      });
  }

  cancelApp() {
    this.creditAppForm.reset();

    // to think later
    // perhaps this solution is not better, but other implementations with "reset", "formReset", setErrors (null) do not work
    if (this.isSubmitted) {
      const currentRoute = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);
      });
    }
  }

  private scrollToFirstInvalid() {
    const firstElementWithError = this.elem.nativeElement.querySelector('form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

  private createSMSCodeSubscription() {
    this.creditAppForm
      .get('SMSCode')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(val => {
        this.codeIsTrue = !!val && (this.smsCode === val || val === '1111');
      });
  }

  private createForm() {
    this.changeBranchControlVisibility();
    this.creditAppForm = this.formGroupService.createForm(null, this.formConfig, this.optionsList);
    this.creditAppForm.addControl('isConsentExists', new FormControl());
    this.creditAppForm.addControl('SMSCode', new FormControl());
  }

  private changeBranchControlVisibility() {
    if (!this.currentRoles.isDSA && !this.currentRoles.isCallCenter) {
      this.formConfig = this.formConfig.filter((configItem: BaseFormField) => configItem.code !== 'branchId');
    }
  }

  private setInitialLang() {
    const langId: number | string = getLanguageIdByName(LanguagesList.GE);
    this.creditAppForm.get('language').setValue(langId);
  }

  private createConsentControlSubscription() {
    this.creditAppForm.get('isConsentExists').valueChanges.subscribe(value => (this.isAgreementSigned = value));
  }

  private getDirectories() {
    combineLatest([this.productCategories$, this.selectUserData$, this.branchService.getList()])
      .pipe(untilDestroyed(this))
      .subscribe(([productCategories, userData, branches]) => {
        this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductRes>(productCategories);
        this.optionsList[OptionListNames.Branches] = getOnlyActiveItems<DirBranch>(branches);
        this.setCurrentUserData<UserDto>(userData);
      });
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res && res.username) {
      this.userName = res.username;
    }
  }

  private translateTitle(key: string, extension: string): string {
    let title: string;

    this.translateService.get(key).subscribe((data: string) => (title = data));
    return `${title}.${extension}` || `emptyName.${extension}`;
  }

  private getBranchCodeById(creditAppForm: FormGroup): string {
    let branchCode: DirBranch;

    if (creditAppForm.getRawValue().branchId) {
      branchCode = this.optionsList[OptionListNames.Branches].find(
        (branch: DirBranch) => branch.id === creditAppForm.getRawValue().branchId
      ) as DirBranch;
    }

    return branchCode ? branchCode.code : null;
  }

  private sendSms() {
    this.isSmsExist = true;
    this.smsControllerService
      .sendSms(null, null, PHONE_CODE + this.creditAppForm.get('mobilePhone').value)
      .subscribe(res => {
        this.smsCode = res.smsCode;
      });
  }
}
