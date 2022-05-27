import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Application, DirBusinessInspectionResult, Directory, EInputType, ValueType } from '@app/_models';
import { BusinessInspection, BusinessInspectionDto } from '@app/_models/api-models-mass-segment';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INSPECTION_FORM, InspectionFormConfig, InspectionFormField } from './constants/form-config';
import { Observable, combineLatest, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap } from 'rxjs/operators';

import { ApplicationControllerService } from '@app/api';
import { BusinessInspectionControllerService } from '@app/api/massegment-api';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { InspectionGroups } from './constants/groups';
import { MassSegmentDirectoriesNames } from '@app/_models/api-models/mass-segment-directories-names';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { RouterURLService } from '@app/services/routerURL.service';
import { TITLES } from './constants/titles';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectMassSegmentDirectory } from '@app/store/selectors/mass-segment-directories.selector';
import { untilDestroyed } from '@app/core';

type Options = Directory | DirBusinessInspectionResult;

@Component({
  selector: 'app-mass-segment-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit, OnDestroy {
  @Input() applicationData: Application;
  @Input() businessInspection: BusinessInspection;
  @Input() readonlyForm: boolean = false;
  @Input() language: string;

  public inspectionForm: FormGroup;

  public footerConfigSource = 'massSegment.inspection';
  public isLoading: boolean = false;
  public inspectionFormConfig: InspectionFormConfig = INSPECTION_FORM;
  public InspectionGroups = InspectionGroups;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public TITLES = TITLES;

  public optionsList: Record<string, Options[]> = {
    inspectionResult: [],
    companyActivityTypes: [],
    creditPurpose: []
  };

  private inspectionResult$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.inspectionResult))
  );
  private companyActivityTypes$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.companyActivityTypes))
  );
  private creditPurpose$ = this.store.pipe(
    select(selectMassSegmentDirectory(MassSegmentDirectoriesNames.creditPurpose))
  );

  constructor(
    private store: Store<IAppState>,
    private toastService: ToastService,
    private businessInspectionService: BusinessInspectionControllerService,
    private applicationControllerService: ApplicationControllerService,
    private routerURLService: RouterURLService
  ) {}

  ngOnInit(): void {
    this.createForm(this.businessInspection, this.inspectionFormConfig);

    this.getDirectories();

    if (this.readonlyForm) {
      this.inspectionForm.disable();
    }
  }

  ngOnDestroy(): void {}

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      default: {
        break;
      }
    }
  }

  submitForm() {
    if (this.inspectionForm.invalid) {
      this.toastService.viewMsg('Заполните обязательные поля', 'warning');
      return;
    }

    this.isLoading = true;
    this.saveData()
      .pipe(
        switchMap(_ => this.applicationControllerService.acceptApp(this.applicationData.id.toString(), this.language)),
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

  delayApp() {
    this.isLoading = true;
    this.saveData().subscribe(_ => {
      this.navigateToDashboard();
    });
  }

  navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }

  private prepareDataToSave(
    businessInspection: BusinessInspection,
    form: FormGroup,
    inspectionFormConfig: InspectionFormConfig
  ): BusinessInspection {
    let formControlsValues: BusinessInspection;

    Object.keys(inspectionFormConfig).forEach((groupName: string) => {
      formControlsValues = { ...formControlsValues, ...form.getRawValue()[groupName] };
    });

    return {
      ...businessInspection,
      ...formControlsValues,
      applicantId: this.applicationData.applicant.id,
      applicationId: this.applicationData.id,
      updated: new Date()
    };
  }

  private saveData(): Observable<number> {
    const data: BusinessInspection = this.prepareDataToSave(
      this.businessInspection,
      this.inspectionForm,
      this.inspectionFormConfig
    );

    const method: string = this.businessInspection.id ? 'update' : 'create';

    return this.businessInspectionService[method](new BusinessInspectionDto(data));
  }

  private getDirectories() {
    combineLatest([this.inspectionResult$, this.companyActivityTypes$, this.creditPurpose$])
      .pipe(untilDestroyed(this))
      .subscribe(([inspectionResult, activityTypes, creditPurpose]) => {
        this.optionsList.inspectionResult = getOnlyActiveItems<DirBusinessInspectionResult>(inspectionResult);
        this.optionsList.companyActivityTypes = getOnlyActiveItems<Directory>(activityTypes);
        this.optionsList.creditPurpose = getOnlyActiveItems<Directory>(creditPurpose);
      });
  }

  private createForm(dataObj: BusinessInspection, config: InspectionFormConfig) {
    this.inspectionForm = new FormGroup({});
    Object.keys(config).forEach((key: string) => {
      const innerControls = this.createFieldsFormControls(dataObj, config[key]);

      this.inspectionForm.addControl(key, new FormGroup(innerControls));
    });

    this.createInspectionResultSubscription();
    this.createThirdPartyInnSubscription();
  }

  private createFieldsFormControls(
    dataObj: BusinessInspection,
    inputConfig: InspectionFormField[]
  ): Record<string, FormControl> {
    return inputConfig.reduce((config: {}, item: InspectionFormField) => {
      config[item.code] = this.createControl(dataObj, item);

      return config;
    }, {});
  }

  private createControl(dataObj: BusinessInspection, item: InspectionFormField): FormControl {
    const value: string | number | boolean | Date = this.getValueForControl(dataObj, item);
    const control: FormControl = new FormControl({ value, disabled: item.disabled });

    this.setValidatorsToControl(item, control);
    return control;
  }

  private setValidatorsToControl(configFormField: InspectionFormField, control: AbstractControl) {
    const validators: ValidatorFn[] = [];

    if (configFormField.required) {
      validators.push(Validators.required);
    }

    if (configFormField.minLength) {
      validators.push(Validators.minLength(configFormField.minLength));
    }

    if (configFormField.pattern) {
      validators.push(Validators.pattern(configFormField.pattern));
    }

    if (configFormField.maxLength) {
      validators.push(Validators.maxLength(configFormField.maxLength));
    }

    control.setValidators(validators);
  }

  private getValueForControl(dataObj: BusinessInspection, item: InspectionFormField): string | number | boolean | Date {
    if (item.type === EInputType.Select && !item.selectEmittedValueType) {
      return this.getValueForSelect(dataObj, item);
    }

    if (item.type === EInputType.Date) {
      return dataObj[item.code] ? new Date(this.getValueForTextOrCheckbox(dataObj, item)) : '';
    }
    return this.getValueForTextOrCheckbox(dataObj, item);
  }

  private getValueForSelect(dataObj: BusinessInspection, item: InspectionFormField) {
    return dataObj[item.code] ? dataObj[item.code].id : null;
  }

  private getValueForTextOrCheckbox(dataObj: BusinessInspection, item: InspectionFormField) {
    return dataObj[item.code];
  }

  private createInspectionResultSubscription() {
    this.inspectionForm
      .get(InspectionGroups.ClientInfo)
      .get('dirBusinessInspectionResult')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((InspectionResultId: number) => {
        if (InspectionResultId) {
          this.changeVisibility(this.inspectionFormConfig, this.inspectionForm);
        }
      });
  }

  private createThirdPartyInnSubscription() {
    this.inspectionForm
      .get(InspectionGroups.ActivityInfo)
      .get('isThirdPartyLoan')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((thirdPartyLoan: boolean) => {
        const control: AbstractControl = this.inspectionForm.get(InspectionGroups.ActivityInfo).get('thirdPartyInn');

        thirdPartyLoan ? control.setValidators([Validators.required]) : control.clearValidators();
        control.updateValueAndValidity();
      });
  }

  private changeVisibility(config: InspectionFormConfig, form: FormGroup) {
    Object.keys(config).forEach((groupName: string) => {
      const innerFormGroup = form.get(groupName) as FormGroup;
      this.disableControls(innerFormGroup);
    });
  }

  private disableControls(innerFormGroup: FormGroup) {
    Object.keys(innerFormGroup.controls).forEach((controlName: string) => {
      if (controlName !== 'dirBusinessInspectionResult' && controlName !== 'resultComment') {
        innerFormGroup.get(controlName).disable();
      }
    });
  }
}
