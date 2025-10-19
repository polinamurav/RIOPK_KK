import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ApplicationPagedInfoDto,
  CustomOptionList,
  Dir,
  DirAbsCode,
  EInputType,
  IdentityCardType,
  OptionListNames,
  ProductDto,
  ValueType
} from '@app/_models';
import { ENTER_PERS_DATA_FORM } from '@app/components/enter-pers-data-modal/inter-pers-data-const';
import { ToastService } from '@app/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroupService } from '@app/services/form-group.service';
import { FormGroup, Validators } from '@angular/forms';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { ApplicationControllerService, DirectoriesService, GenderController } from '@app/api';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ApplicantControllerService } from '@app/api/applicant-controller.service';
import { combineLatest, forkJoin } from 'rxjs';
import { ApplicantLiteDto, ApplicantPersDataDto } from '@app/_models/api-models/applicant';
import { validateByPattern } from '@app/validators/validation-by-pattern';
import { InputErrorKeys } from '@app/constants/validators-errors';

type Options = ProductDto | CustomOptionList | DirAbsCode | Dir;

export interface EnterPersDataModalConfig {
  data: ApplicationPagedInfoDto;
  readonly?: boolean;
}

@Component({
  selector: 'app-enter-pers-data-modal',
  templateUrl: './enter-pers-data-modal.component.html',
  styleUrls: ['./enter-pers-data-modal.component.scss']
})
export class EnterPersDataModalComponent implements OnInit {
  public enterPersDataConfig = ENTER_PERS_DATA_FORM;
  public language: string = this.translateService.currentLang;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public enterPersDataForm: FormGroup;

  public applicantInfoLite: ApplicantLiteDto;
  public loading: boolean;

  public optionsList: Record<string, Options[]> = {
    [OptionListNames.IdentityCardType]: [],
    [OptionListNames.SocialCardType]: [],
    [OptionListNames.Gender]: []
  };

  constructor(
    private genderController: GenderController,
    private toastService: ToastService,
    private translateService: TranslateService,
    private applicantControllerService: ApplicantControllerService,
    private applicationControllerService: ApplicationControllerService,
    private directoriesService: DirectoriesService,
    private dialogRef: MatDialogRef<EnterPersDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public config: EnterPersDataModalConfig,
    private formGroupService: FormGroupService<any, Options>
  ) {}

  get clientName(): string {
    return this.applicantInfoLite
      ? `${this.applicantInfoLite.lastName || ''} ${this.applicantInfoLite.firstName || ''} ${this.applicantInfoLite
          .middleName || ''}`
      : null;
  }

  ngOnInit(): void {
    this.getDirectories();
    this.buildForm();
    this.subscribeToValueChangeForm();
  }

  submitForm() {
    if (this.enterPersDataForm.valid) {
      const formValue = this.enterPersDataForm.getRawValue();
      const data: ApplicantPersDataDto = {
        ...this.enterPersDataForm.getRawValue(),
        identityCardPin: formValue.pin,
        id: this.config.data.applicantId
      } as any;

      this.loading = true;

      forkJoin([this.applicantControllerService.updatePersData(data)])
        .pipe(
          switchMap(() => {
            return this.applicationControllerService.acceptApp(
              this.applicantInfoLite.applicationId.toString(),
              this.language
            );
          }),
          finalize(() => {
            this.loading = false;
            this.dialogRef.close();
          })
        )
        .subscribe();
    }
  }

  private buildForm() {
    this.enterPersDataForm = this.formGroupService.createForm(
      this.applicantInfoLite,
      this.enterPersDataConfig,
      this.optionsList
    );
  }

  private disableFieldWithValue(form: FormGroup) {
    for (const controlsKey in form.controls) {
      if (form.get(controlsKey).value !== null) {
        form.get(controlsKey).disable();
      }
    }
  }

  private getDirectories() {
    this.loading = true;
    combineLatest([
      this.applicantControllerService.getApplicantLite(this.config.data.applicantId),
      this.directoriesService.getIdentityCardTypeList(),
      this.genderController.getAll()
    ])
      .pipe(
        tap(([applicantInfoLite, identityCardTypes, gender]) => {
          this.applicantInfoLite = applicantInfoLite;
          console.log(this.applicantInfoLite);

          this.optionsList = {};
          this.optionsList[OptionListNames.IdentityCardType] = getOnlyActiveItems<IdentityCardType>(
            this.passportTypefilter(identityCardTypes, false)
          );
          this.optionsList[OptionListNames.SocialCardType] = getOnlyActiveItems<IdentityCardType>(
            this.passportTypefilter(identityCardTypes, true)
          );
          this.optionsList[OptionListNames.Gender] = gender;

          this.applicantInfoLite.birthDate = this.applicantInfoLite.birthDate
            ? (new Date(this.applicantInfoLite.birthDate) as any)
            : null;
          this.enterPersDataForm.patchValue(this.applicantInfoLite as any);
        }),
        finalize(() => {
          this.disableFieldWithValue(this.enterPersDataForm);

          this.loading = false;
        })
      )
      .subscribe();
  }

  private passportTypefilter(passportType: IdentityCardType[], isSocial: boolean) {
    return passportType.filter(el => el.isSoc === isSocial);
  }

  private subscribeToValueChangeForm() {
    const identityCardTypeControl = this.enterPersDataForm.get('identityCardTypeId');
    const identityCardPinControl = this.enterPersDataForm.get('pin');
    const socCardTypeControl = this.enterPersDataForm.get('socCardTypeId');
    const socCardPinControl = this.enterPersDataForm.get('socCardPin');

    const identityCardType$ = identityCardTypeControl.valueChanges;
    const identityCardPin$ = identityCardPinControl.valueChanges;
    const socCardType$ = socCardTypeControl.valueChanges;
    const socCardPin$ = socCardPinControl.valueChanges;

    identityCardType$.subscribe(value => {
      if (value) {
        this.enterPersDataConfig.forEach(res => {
          if (!socCardPinControl.value) {
            if (['socCardTypeId', 'socCardPin'].includes(res.code)) {
              res.required = value === 1 || value === 2;
            }

            if (value === 3 || value === 4) {
              socCardTypeControl.clearValidators();
              socCardTypeControl.updateValueAndValidity({ emitEvent: false });
            }
          } else {
            if (res.code === 'socCardTypeId') {
              res.required = true;
              socCardTypeControl.setValidators(null);
              socCardTypeControl.setValidators(validateByPattern('^[5-6]{1}$', InputErrorKeys.InvalidDate));
            }
          }

          if (res.code === 'pin') {
            identityCardPinControl.setValidators(null);

            if (value === 2 || value === 3) {
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

    identityCardPin$.pipe().subscribe(value => {});

    socCardType$.pipe().subscribe(value => {
      if (value) {
        this.enterPersDataConfig.find(res => {
          if (res.code === 'socCardPin') {
            socCardPinControl.setValidators(null);

            switch (value) {
              case 5: {
                res.required = true;
                res.minLength = 10;
                res.maxLength = 10;
                socCardPinControl.setValidators([
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(10),
                  validateByPattern('^[0-9]{10}$', InputErrorKeys.IncorrectData10)
                ]);
                socCardPinControl.updateValueAndValidity({ emitEvent: false });
                break;
              }
              case 6: {
                res.required = true;
                res.minLength = 10;
                res.maxLength = 10;
                socCardPinControl.setValidators([
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(10),
                  validateByPattern('^[S]{1}[0-9]{3}[A]{1}[0-9]{5}$', InputErrorKeys.IncorrectSocData)
                ]);
                socCardPinControl.updateValueAndValidity({ emitEvent: false });
                break;
              }
              case 7: {
                if (identityCardTypeControl.value === 1 || identityCardTypeControl.value === 2) {
                  socCardPinControl.setValidators([Validators.required]);
                  socCardTypeControl.setValidators([Validators.required]);
                }
                res.required = false;
                socCardPinControl.value ? socCardPinControl.setValue(null) : null;
                break;
              }
              default: {
                res.required = false;
              }
            }
          }
        });
        // socCardPinControl.updateValueAndValidity({ emitEvent: false });
      } else {
        if (
          !identityCardTypeControl.value ||
          (identityCardTypeControl.value && ![1, 2].includes(identityCardTypeControl.value))
        ) {
          if (!socCardPinControl.value) {
            socCardPinControl.clearValidators();
          } else {
            socCardTypeControl.setValidators([Validators.required]);
          }
        }
      }
      socCardPinControl.updateValueAndValidity({ emitEvent: false });
    });

    socCardPin$.pipe().subscribe(value => {
      if (value) {
        if (!socCardTypeControl.value) {
          this.enterPersDataConfig.find(res => {
            if (res.code === 'socCardTypeId') {
              res.required = true;
              socCardTypeControl.setValidators([Validators.required]);
            }
          });
        } else if (socCardTypeControl.value === 7) {
          socCardTypeControl.setValidators(validateByPattern('^[5-6]{1}$', InputErrorKeys.InvalidDate));
        }
        socCardTypeControl.updateValueAndValidity({ emitEvent: false });
      } else {
        this.enterPersDataConfig.find(res => {
          if (res.code === 'socCardTypeId') {
            if (identityCardTypeControl.value === 1 || identityCardTypeControl.value === 2) {
              res.required = true;
              socCardTypeControl.setValidators([Validators.required]);
              socCardTypeControl.updateValueAndValidity();
            } else {
              res.required = false;
              socCardTypeControl.setValidators(null);
              if (!socCardPinControl.value && socCardTypeControl.value === 7) {
                socCardTypeControl.updateValueAndValidity({ emitEvent: false });
              } else {
                socCardTypeControl.updateValueAndValidity();
              }
            }
          }
        });
      }
    });
  }
}
