import { AML_FORM, EAmlControlsKeys, IAmlFormField } from './constants/aml-form';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ApplicantDirOperationTypeGetDto,
  ApplicantDirOperationTypePostDto,
  ApplicantFatcaDtoGet,
  ApplicantFatcaDtoPost,
  ApplicantOperationFreqTypeGetDto,
  ApplicantOperationFreqTypePostDto,
  Application,
  EInputType,
  ValueType
} from '@app/_models';
import { Applicant, ApplicantDto } from '@app/_models/api-models/applicant';
import {
  ApplicantFatcaControllerService,
  ApplicantOperationFreqTypeControllerService,
  ApplicantOperationTypeControllerService
} from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { ToastService } from '@app/services/toast.service';
import { ValidateTabsStateService } from '@app/services/validate-tabs-state.service';
import { FormGroupService } from '@app/services/form-group.service';

type ApplicantInfo = ApplicantFatcaDtoGet | ApplicantDirOperationTypeGetDto | ApplicantOperationFreqTypeGetDto;

@Component({
  selector: 'ng-aml',
  templateUrl: './aml.component.html',
  styleUrls: ['./aml.component.scss']
})
export class AmlComponent implements OnInit, OnDestroy {
  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;
  @Input() applicantOperationInfo: ApplicantDirOperationTypeGetDto[];
  @Input() applicantOperationFreqInfo: ApplicantOperationFreqTypeGetDto[];
  @Input() applicantFatcaInfo: ApplicantFatcaDtoGet[];
  @Input() language: string;

  amlForm: FormGroup;
  footerConfigSource = 'common.aml';
  amlFormConfig: IAmlFormField[] = AML_FORM;
  EAmlControlsKeys = EAmlControlsKeys;
  EInputType = EInputType;
  ValueType = ValueType;
  TabTitles = TABS_TITLES;
  isAmlNeeded: boolean;
  isLoading = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private operationTypeService: ApplicantOperationTypeControllerService,
    private applicantFatcaService: ApplicantFatcaControllerService,
    private applicantControllerService: ApplicantControllerService,
    private applicantOperationFreqService: ApplicantOperationFreqTypeControllerService,
    private validateTabsStateService: ValidateTabsStateService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private formGroupService: FormGroupService<Applicant, null>
  ) {}

  ngOnInit() {
    this.setIsAmlNeeded();

    this.validateTabsStateService.changeTabState(this.TabTitles[TabNames.Aml], false);
    this.applicantOperationInfo = this.sort(this.applicantOperationInfo, 'dirOperationType');
    this.applicantOperationFreqInfo = this.sort(this.applicantOperationFreqInfo, 'dirOperationFreqType');
    this.applicantFatcaInfo = this.sort(this.applicantFatcaInfo, 'dirFatca');

    this.createForm();
    this.addControlsFromInfo(EAmlControlsKeys.FATCASelfCertification, this.applicantFatcaInfo, false);
    this.addControlsFromInfo(EAmlControlsKeys.BankBusinessRelationshipPurpose, this.applicantOperationInfo, true);
    this.addControlsFromInfo(EAmlControlsKeys.ExpectedOperations, this.applicantOperationFreqInfo, true);
    this.setDefaultToggleValues();

    if (this.readonlyForm) {
      this.amlForm.disable();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.saveForm();
        break;
      }
      default: {
        break;
      }
    }
  }

  saveToggleValue<T extends ApplicantInfo>(item, controlName: string) {
    const postData = {
      [EAmlControlsKeys.FATCASelfCertification]: () => new ApplicantFatcaDtoPost(item),
      [EAmlControlsKeys.BankBusinessRelationshipPurpose]: () => new ApplicantDirOperationTypePostDto(item),
      [EAmlControlsKeys.ExpectedOperations]: () => new ApplicantOperationFreqTypePostDto(item)
    };

    this.getService(controlName)
      .update(postData[controlName]())
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private saveForm(): void {
    this.isLoading = true;

    this.saveApplicant()
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isLoading = false;
        this.toastService.viewMsg('SuccessMessage.Added', 'success');
        this.validateTabsStateService.changeTabState(this.TabTitles[TabNames.Aml], true);
      });
  }

  private saveApplicant(): Observable<number> {
    const applicantDto = new ApplicantDto(this.appDto.applicant);

    const applicantDtoPost: ApplicantDto = {
      ...applicantDto,
      isUsaResident: this.amlForm.getRawValue()[EAmlControlsKeys.IsUsaResident],
      isIpdl: this.amlForm.getRawValue()[EAmlControlsKeys.IsIpdl]
    };

    return this.applicantControllerService.update(applicantDtoPost);
  }

  private setDefaultToggleValues(): void {
    const defaultToggleStatus: Record<string, boolean> = {
      [EAmlControlsKeys.IsUsaResident]: !!this.appDto.applicant.isUsaResident,
      [EAmlControlsKeys.IsIpdl]: !!this.appDto.applicant.isIpdl
    };

    Object.keys(defaultToggleStatus).forEach((controlName: string) => {
      this.amlForm.controls[controlName].setValue(defaultToggleStatus[controlName]);
    });
  }

  private getService(controlName: string) {
    const obj: { [key: string]: () => any } = {
      [EAmlControlsKeys.FATCASelfCertification]: () => this.applicantFatcaService,
      [EAmlControlsKeys.BankBusinessRelationshipPurpose]: () => this.operationTypeService,
      [EAmlControlsKeys.ExpectedOperations]: () => this.applicantOperationFreqService
    };

    return obj[controlName]();
  }

  private setIsAmlNeeded(): void {
    this.isAmlNeeded = this.appDto.applicant.isAmlNeeded;
  }

  private createForm() {
    this.amlForm = this.formGroupService.createForm(this.appDto.applicant, this.amlFormConfig, null);
  }

  private addControlsFromInfo<T extends ApplicantInfo>(controlName: string, info: T[], defaultValue: boolean): void {
    const controls = this.createControls(info, defaultValue);
    this.amlForm.addControl(controlName, new FormGroup(controls));
  }

  private createControls<T extends ApplicantInfo>(info: T[], defaultValue: boolean): Record<string, FormControl> {
    return info.reduce((config: {}, item: T) => {
      config[item.id] = new FormControl({ value: item.result !== null ? item.result : defaultValue, disabled: false });

      return config;
    }, {});
  }

  private sort<T>(array: Array<T>, dirName: string): Array<T> {
    return array.sort((a: T, b: T): number => {
      return a[dirName].id - b[dirName].id;
    });
  }
}
