import {
  AML_FORM,
  EAmlControlsKeys,
  IAmlFormField,
  USA_FACT_ADDRESS,
  USA_RESIDENT_INFO_FORM
} from './constants/aml-form';
import { FormGroup } from '@angular/forms';
import {
  ApplicantDirOperationTypeGetDto,
  ApplicantFatcaDtoGet,
  ApplicantOperationFreqTypeGetDto,
  Application,
  BaseFormField,
  Dir,
  DirFatca,
  DirFatcaStatus,
  EInputType,
  OptionListNames,
  ValueType
} from '@app/_models';
import {
  ApplicantFatcaControllerService,
  ApplicantOperationFreqTypeControllerService,
  ApplicantOperationTypeControllerService
} from '@app/api';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';

import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TabNames } from '@app/components/constants/tab-names';
import { ToastService } from '@app/services/toast.service';
import { ValidateTabsStateService } from '@app/services/validate-tabs-state.service';
import { FormGroupService } from '@app/services/form-group.service';
import { PHONE_MASK_USA } from '@app/constants/phone-code';
import { ApplicantFatcaAdditionalDto, ApplicantFatcaDto } from '@app/_models/api-models/applicant-fatca-additional-dto';
import { DirFatcaControllerService } from '@app/api/dir-fatca-controller.service';
import { DirFatcaStatusControllerService } from '@app/api/dir-fatca-status-controller.service';
import { DirAttributeFatcaControllerService } from '@app/api/dir-attribute-fatca-controller.service';
import { select, Store } from '@ngrx/store';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { IAppState } from '@app/store/state/app.state';
// @ts-ignore
import moment from 'moment';
import { ELanguageType } from '@app/constants/language';
import { DirRegionControllerService } from '@app/api/dir-region-controller.service';

type ApplicantInfo = ApplicantFatcaDtoGet | ApplicantDirOperationTypeGetDto | ApplicantOperationFreqTypeGetDto;
type Options = Dir | DirFatca | DirFatcaStatus | any;

@Component({
  selector: 'ng-aml',
  templateUrl: './aml.component.html',
  styleUrls: ['./aml.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmlComponent implements OnInit, OnDestroy {
  @Input() appDto: Application;
  @Input() readonlyForm: boolean = false;
  @Input() applicantOperationInfo: ApplicantDirOperationTypeGetDto[];
  @Input() applicantOperationFreqInfo: ApplicantOperationFreqTypeGetDto[];
  @Input() applicantFatcaInfo: ApplicantFatcaAdditionalDto;
  @Input() language: string;

  amlForm: FormGroup;
  footerConfigSource = 'common.aml';
  amlFormConfig: IAmlFormField[] = AML_FORM;
  usaResidentFormConfig: BaseFormField[] = USA_RESIDENT_INFO_FORM;
  usaFactAddressFormConfig: BaseFormField[] = USA_FACT_ADDRESS;

  EAmlControlsKeys = EAmlControlsKeys;
  EInputType = EInputType;
  ValueType = ValueType;
  TabTitles = TABS_TITLES;
  isAmlNeeded: boolean;
  isLoading = false;
  isStartSwitchCase = false;
  countSelect: number = 0;
  changeToggleArray: any[] = [];
  destroy$: Subject<void> = new Subject<void>();
  availableIds = [];

  public readonly phoneMask: string = PHONE_MASK_USA;

  optionsList: Record<string, Options[]> = {
    [OptionListNames.Fatca]: [],
    [OptionListNames.FatcaStatus]: [],
    [OptionListNames.AttributeFatca]: [],
    [OptionListNames.Countries]: [],
    [OptionListNames.Regions]: []
  };

  applicantFatcaAdditionalDto: ApplicantFatcaAdditionalDto = new ApplicantFatcaAdditionalDto();

  private countries$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.countries)));

  // private regions$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.regions)));

  constructor(
    private _store: Store<IAppState>,
    private operationTypeService: ApplicantOperationTypeControllerService,
    private applicantFatcaService: ApplicantFatcaControllerService,
    private applicantControllerService: ApplicantControllerService,
    private applicantOperationFreqService: ApplicantOperationFreqTypeControllerService,
    private validateTabsStateService: ValidateTabsStateService,
    private dirRegionControllerService: DirRegionControllerService,
    private dirFatcaControllerService: DirFatcaControllerService,
    private dirFatcaStatusControllerService: DirFatcaStatusControllerService,
    private dirAttributeFatcaControllerService: DirAttributeFatcaControllerService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private formGroupService: FormGroupService<ApplicantFatcaAdditionalDto, null>
  ) {}

  get isResidentFormVisible(): boolean {
    if (this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
      const item = this.applicantFatcaAdditionalDto.applicantFatcaList.find(el => +el.dirFatca.id === 15);
      return item ? item.result : false;
    }
  }

  get isFactAddressVisible(): boolean {
    if (this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
      const item = this.applicantFatcaAdditionalDto.applicantFatcaList.find(el => +el.dirFatca.id === 17);
      return item ? item.result : false;
    }
  }

  get certificateOfRenunciationVisible(): boolean {
    if (this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
      const item = this.applicantFatcaAdditionalDto.applicantFatcaList.find(el => +el.dirFatca.id === 16);
      return item ? item.result : false;
    }
  }

  get isUsaPhoneVisible(): boolean {
    if (this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
      const item = this.applicantFatcaAdditionalDto.applicantFatcaList.find(el => +el.dirFatca.id === 18);
      return item ? item.result : false;
    }
  }

  ngOnInit() {
    this.getDirections();
    this.createForm();
    this.setIsAmlNeeded();
    // this.applicantOperationFreqInfo = this.sort(this.applicantOperationFreqInfo, 'dirOperationFreqType');
    // this.applicantOperationInfo = this.sort(this.applicantOperationInfo, 'dirOperationType');
    // this.addControlsFromInfo(EAmlControlsKeys.FATCASelfCertification, this.applicantFatcaInfo, false);
    // this.addControlsFromInfo(EAmlControlsKeys.BankBusinessRelationshipPurpose, this.applicantOperationInfo, true);
    // this.addControlsFromInfo(EAmlControlsKeys.ExpectedOperations, this.applicantOperationFreqInfo, true);

    // this.setDefaultToggleValues();
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

  getNameFatca(fatca: DirFatca): string {
    return fatca[ELanguageType[this.language]];
  }

  fatcaLengthArray(fatca: any[]) {
    this.availableIds = []; // Массив Id-селектов. Статус FATCA
    fatca.forEach((el, index) => {
      this.availableIds.push(index + 1);
    });
  }

  uniqueIdArray = (data: any[]) => {
    return data.reduce((acc, el) => {
      const existingElement = acc.find(val => val.id === el.id);
      if (!existingElement) {
        acc.push(el);
      } else {
        existingElement.isChecked = el.isChecked; // Обновляем значение isChecked, если элемент с таким id уже существует (Уникальный Массив)
      }
      return acc;
    }, []);
  };

  availabilityOfValuesForFatca(itemResult: any[]) {
    this.countSelect++; // Задает первоначальное значение селекту до выбора чекбоксов. (Число переменной == длинне массива availableIds)
    this.amlForm.get('fatcaStatus').reset();
    if (!this.isStartSwitchCase && this.countSelect >= 5) {
      this.availableIds.splice(0, 1, 2); // Американское лицо,
      this.availableIds.splice(1, 0); // Не американское лицо
      this.availableIds.splice(3, 1, 0); // Лицо, отказавшееся от сотрудничества с признаками связи с США
      this.availableIds.splice(4, 1, 5); // Лицо, отказавшееся от сотрудничества без признака связи с США
      this.availableIds.splice(5, 1, 0); // Лицо, отказавшееся от сотрудничества налоговый резидент США
      this.isStartSwitchCase = true; // Переключает на работу от чекбоксов switchCase work.
    } else {
      // Американское лицо
      const condition1 = [15].every(id => this.getIsCheckedItem(itemResult, id));

      // Не американское лицо
      const condition2 = [15].every(id => !this.getIsCheckedItem(itemResult, id));

      // Лицо, отказавшееся от сотрудничества с признаками связи с США
      const condition3 =
        [16, 17, 18, 19, 20].every(id => this.getIsCheckedItem(itemResult, id)) &&
        !itemResult.find(item => [15, 21].includes(item.id) && item.isChecked);

      // Лицо, отказавшееся от сотрудничества с признаками связи с США
      const condition4 = [15, 16, 17, 18, 19, 20, 21].every(id => !this.getIsCheckedItem(itemResult, id));

      // Лицо, отказавшееся от сотрудничества с признаками связи с США
      const condition5 = itemResult.every(item => !item.isChecked);

      // Лицо, отказавшееся от сотрудничества налоговый резидент США
      const condition6 =
        [15].every(id => this.getIsCheckedItem(itemResult, id)) &&
        !itemResult.find(item => [21].includes(item.id) && item.isChecked);

      // Проверяем условия и выполняем соответствующий код

      if (condition1) {
        this.availableIds.splice(0, 1, 1); // Американское лицо,
        this.availableIds.splice(1, 1, 0); // Не американское лицо
        this.availableIds.splice(5, 1, 6); // Лицо, отказавшееся от сотрудничества налоговый резидент США
      }
      if (condition2) {
        this.availableIds.splice(1, 1, 2); // Не американское лицо
        this.availableIds.splice(0, 1, 0); // Американское лицо,
        this.availableIds.splice(5, 1, 0); // Лицо, отказавшееся от сотрудничества налоговый резидент США
      }
      if (condition3) {
        this.availableIds.splice(3, 1, 4); // Лицо, отказавшееся от сотрудничества с признаками связи с США
      } else {
        this.availableIds.splice(3, 1, 0); // Лицо, отказавшееся от сотрудничества с признаками связи с США
      }
      if (condition4) {
        this.availableIds.splice(4, 1, 5); // Лицо, отказавшееся от сотрудничества без признака связи с США
      }
      if (!condition5) {
        this.availableIds.splice(4, 1, 0); // Лицо, отказавшееся от сотрудничества без признака связи с США
      }
      if (condition6) {
        this.availableIds.splice(5, 1, 6); // Лицо, отказавшееся от сотрудничества налоговый резидент США
      } else {
        this.availableIds.splice(5, 1, 0); // Лицо, отказавшееся от сотрудничества налоговый резидент США
      }
    }
  }

  onChangeToogle(toggle: any, item?: any) {
    this.changeToggleArray.push({ id: item, isChecked: toggle });
    this.availabilityOfValuesForFatca(this.uniqueIdArray(this.changeToggleArray));

    if (item === 21 && this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
      this.applicantFatcaAdditionalDto.applicantFatcaList[6].result = toggle;
    }

    if (!this.isFactAddressVisible) {
      this.amlForm.get(EAmlControlsKeys.UsaFactAddress).reset();
      this.amlForm.get(EAmlControlsKeys.UsaFactAddress).disable();
    } else {
      if (!this.readonlyForm) {
        this.amlForm.get(EAmlControlsKeys.UsaFactAddress).enable();
      }
    }
    if (!this.isUsaPhoneVisible && !this.readonlyForm) {
      this.amlForm.get('phoneNumber').reset();
    }

    if (!this.certificateOfRenunciationVisible) {
      this.applicantFatcaAdditionalDto.certificateOfRenunciation = false;
    }

    if (!this.isResidentFormVisible) {
      this.amlForm.get(EAmlControlsKeys.UsaResidentInfo).reset();
      this.amlForm.get(EAmlControlsKeys.UsaResidentInfo).disable();
    } else {
      if (!this.readonlyForm) {
        this.amlForm.get(EAmlControlsKeys.UsaResidentInfo).enable();
      }
    }
  }

  // saveToggleValue<T extends ApplicantInfo>(item, controlName: string) {
  //   const postData = {
  //     [EAmlControlsKeys.FATCASelfCertification]: () => new ApplicantFatcaDtoPost(item)
  //     // [EAmlControlsKeys.BankBusinessRelationshipPurpose]: () => new ApplicantDirOperationTypePostDto(item),
  //     // [EAmlControlsKeys.ExpectedOperations]: () => new ApplicantOperationFreqTypePostDto(item)
  //   };
  //
  //   this.getService(controlName)
  //     .update(postData[controlName]())
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe();
  // }

  private getIsCheckedItem = (itemResult: any[], id: number): boolean => {
    const res = itemResult.find(item => item.id === id);
    return !!res ? res.isChecked : null;
  };

  private saveForm(): void {
    const form = this.amlForm.getRawValue();

    this.applicantFatcaAdditionalDto.addressFactFatca = this.isFactAddressVisible
      ? {
          ...this.applicantFatcaAdditionalDto.addressFactFatca,
          ...form.addressFactFatca
          // dirFatcaRegion : { ...this.optionsList.regions.find(item => item.id === form.addressFactFatca.region) }
        }
      : null;
    this.applicantFatcaAdditionalDto.addressTaxResFatca = this.isResidentFormVisible
      ? {
          ...this.applicantFatcaAdditionalDto.addressTaxResFatca,
          ...form.addressTaxResFatca
          //dirFatcaRegion : this.optionsList.regions.find(item => item.id === form.addressTaxResFatca.region)
        }
      : null;
    this.applicantFatcaAdditionalDto.tin = this.isResidentFormVisible ? form.addressTaxResFatca.tin : null;

    this.applicantFatcaAdditionalDto.phoneNumber = this.isUsaPhoneVisible ? form.phoneNumber : null;
    this.applicantFatcaAdditionalDto.fatcaStatus = form.fatcaStatus;
    this.applicantFatcaAdditionalDto.selfcertificationDate = moment(new Date()).format('YYYY-MM-DD');
    this.amlForm.get('selfcertificationDate').setValue(this.applicantFatcaAdditionalDto.selfcertificationDate);
    this.applicantFatcaAdditionalDto.firstName = this.isResidentFormVisible ? form.addressTaxResFatca.firstName : null;
    this.applicantFatcaAdditionalDto.lastName = this.isResidentFormVisible ? form.addressTaxResFatca.lastName : null;
    this.applicantFatcaAdditionalDto.middleName = this.isResidentFormVisible
      ? form.addressTaxResFatca.middleName
      : null;
    this.applicantFatcaAdditionalDto.attributeFatca = this.isResidentFormVisible
      ? form.addressTaxResFatca.attributeFatca
      : null;

    if (this.amlForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.applicantFatcaService
      .create(this.applicantFatcaAdditionalDto)
      .pipe(
        tap(data => {
          this.isLoading = false;
          this.applicantFatcaAdditionalDto = {
            ...data,
            fatcaStatus: this.applicantFatcaAdditionalDto.fatcaStatus,
            applicantFatcaList: data.applicantFatcaList
          };
          this.toastService.viewMsg('SuccessMessage.Added', 'success');
          this.validateTabsStateService.changeTabState(this.TabTitles[TabNames.Aml], true);
          // this.cd.markForCheck(); Не показывал value полю fatcaStatus при сохранении формы  ===> после теста можно удалить !!deprecate!!
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();

    // this.isLoading = true;
    //
    // this.saveApplicant()
    //   .pipe(
    //     catchError(err => {
    //       this.isLoading = false;
    //       return throwError(err);
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(() => {
    //     this.isLoading = false;
    //     this.toastService.viewMsg('SuccessMessage.Added', 'success');
    //     this.validateTabsStateService.changeTabState(this.TabTitles[TabNames.Aml], true);
    //   });
  }

  private getDirections() {
    combineLatest([
      this.dirFatcaControllerService.getList(),
      this.dirFatcaStatusControllerService.getList(),
      this.dirAttributeFatcaControllerService.getList(),
      this.countries$,
      this.dirRegionControllerService.getFatcaRegionList()
    ])
      .pipe(
        take(2),
        tap(([fatca, fatcaStatus, attributeFatca, countries, regions]) => {
          this.optionsList = {};
          this.optionsList[OptionListNames.Fatca] = fatca;
          this.optionsList[OptionListNames.FatcaStatus] = fatcaStatus;
          this.optionsList[OptionListNames.AttributeFatca] = attributeFatca;
          this.optionsList[OptionListNames.Countries] = countries;
          this.optionsList[OptionListNames.Regions] = regions;
          this.fatcaLengthArray(fatca);
          if (!this.applicantFatcaAdditionalDto.applicantFatcaList.length) {
            fatca.forEach(el => {
              this.applicantFatcaAdditionalDto.applicantFatcaList.push(new ApplicantFatcaDto(el));
            });
          }
          this.applicantFatcaAdditionalDto.fatcaStatus =
            this.applicantFatcaAdditionalDto.fatcaStatus || this.appDto.applicant.dirFatcaStatus;

          this.setFatcaStatus();
          this.cd.detectChanges();
        })
      )
      .subscribe();
  }

  // private saveApplicant(): Observable<number> {
  //   const applicantDto = new ApplicantDto(this.appDto.applicant);
  //
  //   const applicantDtoPost: ApplicantDto = {
  //     ...applicantDto,
  //     isUsaResident: this.amlForm.getRawValue()[EAmlControlsKeys.IsUsaResident],
  //     isIpdl: this.amlForm.getRawValue()[EAmlControlsKeys.IsIpdl]
  //   };
  //
  //   return this.applicantControllerService.update(applicantDtoPost);
  // }

  // private setDefaultToggleValues(): void {
  //   const defaultToggleStatus: Record<string, boolean> = {
  //     [EAmlControlsKeys.IsUsaResident]: !!this.appDto.applicant.isUsaResident,
  //     [EAmlControlsKeys.IsIpdl]: !!this.appDto.applicant.isIpdl
  //   };
  //
  //   Object.keys(defaultToggleStatus).forEach((controlName: string) => {
  //     this.amlForm.controls[controlName].setValue(defaultToggleStatus[controlName]);
  //   });
  // }

  // private getService(controlName: string) {
  //   const obj: { [key: string]: () => any } = {
  //     [EAmlControlsKeys.FATCASelfCertification]: () => this.applicantFatcaService,
  //     [EAmlControlsKeys.BankBusinessRelationshipPurpose]: () => this.operationTypeService,
  //     [EAmlControlsKeys.ExpectedOperations]: () => this.applicantOperationFreqService
  //   };
  //
  //   return obj[controlName]();
  // }

  private setIsAmlNeeded(): void {
    const availableCodes = ['001', '002'];
    const fatcaCode = this.appDto.applicant.dirFatcaStatus ? this.appDto.applicant.dirFatcaStatus.code : null;
    this.isAmlNeeded =
      !this.appDto.applicant.codeAbs ||
      (this.appDto.applicant.codeAbs && !fatcaCode) ||
      (this.appDto.applicant.codeAbs && !availableCodes.includes(fatcaCode));
    this.amlForm.get(EAmlControlsKeys.IsAmlNeeded).setValue(this.isAmlNeeded);

    if (!this.isAmlNeeded) {
      this.readonlyForm = true;
    }

    if (this.readonlyForm) {
      this.amlForm.disable();
    }
    this.validateTabsStateService.changeTabState(this.TabTitles[TabNames.Aml], this.readonlyForm);

    this.applicantFatcaAdditionalDto.applicantId = this.appDto.applicant.id;
    this.applicantFatcaAdditionalDto.applicationId = this.appDto.id;
    if (this.applicantFatcaInfo) {
      this.applicantFatcaAdditionalDto = {
        ...this.applicantFatcaAdditionalDto,
        ...this.applicantFatcaInfo
      };
    }

    this.setFatcaStatus();
  }

  private setFatcaStatus = (): void => {
    const fStatus = this.applicantFatcaAdditionalDto.fatcaStatus || this.appDto.applicant.dirFatcaStatus;
    setTimeout(() => {
      this.amlForm.get('fatcaStatus').setValue(fStatus, { emitEvent: false });
    });
    this.cd.markForCheck();
  };

  private createForm() {
    // this.applicantFatcaInfo.addressTaxResFatca.region = +this.applicantFatcaInfo.addressTaxResFatca.region;

    this.amlForm = this.formGroupService.createForm(this.applicantFatcaInfo, this.amlFormConfig, null);
    const usaResidentForm = this.formGroupService.createForm(
      this.applicantFatcaInfo,
      this.usaResidentFormConfig,
      this.optionsList
    );
    const usaFactAddressForm = this.formGroupService.createForm(
      this.applicantFatcaInfo,
      this.usaFactAddressFormConfig,
      this.optionsList
    );
    usaResidentForm.updateValueAndValidity();
    this.amlForm.addControl(EAmlControlsKeys.UsaResidentInfo, usaResidentForm);
    this.amlForm.addControl(EAmlControlsKeys.UsaFactAddress, usaFactAddressForm);

    this.amlForm.get('selfcertificationDate').reset();

    this.cd.markForCheck();
  }

  // private addControlsFromInfo<T extends ApplicantInfo>(controlName: string, info: T[], defaultValue: boolean): void {
  //   const controls = this.createControls(info, defaultValue);
  //   this.amlForm.addControl(controlName, new FormGroup(controls));
  // }

  // private createControls<T extends ApplicantInfo>(info: T[], defaultValue: boolean): Record<string, FormControl> {
  //   return info.reduce((config: {}, item: T) => {
  //     config[item.id] = new FormControl({ value: item.result !== null ? item.result : defaultValue, disabled: false });
  //
  //     return config;
  //   }, {});
  // }

  // private sort<T>(array: Array<T>, dirName: string): Array<T> {
  //   if (array) {
  //     return array.sort((a: T, b: T): number => {
  //       return a[dirName].id - b[dirName].id;
  //     });
  //   }
  //   return array;
  // }
}
