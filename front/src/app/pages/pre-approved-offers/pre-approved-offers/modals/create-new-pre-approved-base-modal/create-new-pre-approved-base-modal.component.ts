import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dir, EInputType, IdentityCardType, OptionListNames, ProductDto, UserDto, ValueType } from '@app/_models';
import { FormControl, FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { PREAPPROVE_BASE_FORM } from '@app/pages/pre-approved-offers/pre-approved-offers/modals/create-new-pre-approved-base-modal/preapprove-base-form-config';
import { untilDestroyed } from '@app/core';
import { combineLatest } from 'rxjs';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { DirectoriesService } from '@app/api';
import { PreApprovedBasesListDataService } from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/pre-approved-bases-list-data.service';
import { PreapproveBaseDto } from '@app/_models/api-models/preapprove-base-dto';
import moment from 'moment';

export interface CreateNewPreApprovedBaseModal {
  baseName?: string;
  isCreateNew?: boolean;
}

@Component({
  selector: 'ngx-create-new-pre-approved-base-modal',
  templateUrl: './create-new-pre-approved-base-modal.component.html',
  styleUrls: ['./create-new-pre-approved-base-modal.component.scss']
})
export class CreateNewPreApprovedBaseModalComponent implements OnInit, OnDestroy {
  title = 'Новая база предодобренного предложения';

  formConfig = PREAPPROVE_BASE_FORM;

  form = new FormGroup({
    details: new FormControl(),
    activateDate: new FormControl(),
    endDate: new FormControl()
  });
  language: string = this.translateService.currentLang;
  EInputType = EInputType;
  ValueType = ValueType;

  disabledSave: boolean;

  optionsList: Record<string, ProductDto[]> = {
    [OptionListNames.Product]: []
  };

  constructor(
    private readonly translateService: TranslateService,
    private readonly directoriesService: DirectoriesService,
    private readonly preApprovedBasesListDataService: PreApprovedBasesListDataService,
    private readonly dialogRef: MatDialogRef<CreateNewPreApprovedBaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public config: CreateNewPreApprovedBaseModal
  ) {}

  ngOnInit(): void {
    this.init();
    this.getDirectories();
    this.createLanguageSubscription();
  }

  ngOnDestroy() {}

  init() {
    console.log('this.config', this.config);

    if (this.config) {
      this.title = this.config.isCreateNew
        ? 'Новая база предодобренного предложения'
        : `Предодобренное предложение "${this.config.baseName}"`;
      const visibleFields = this.config.isCreateNew ? ['details'] : ['activateDate', 'endDate'];
      this.formConfig = this.formConfig.map(el => {
        return {
          ...el,
          isVisible: visibleFields.includes(el.code),
          disabled: !visibleFields.includes(el.code)
        };
      });
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.disabledSave = true;

      const formValue = this.form.getRawValue();
      const data: PreapproveBaseDto = {
        ...formValue,
        activateDate: moment(formValue.activateDate).format('YYYY-MM-DD'),
        endDate: moment(formValue.endDate).format('YYYY-MM-DD')
      };

      this.config.isCreateNew
        ? this.preApprovedBasesListDataService.createNewBase({ details: data.details }, () => {
            this.disabledSave = false;
            this.dialogRef.close();
          })
        : this.preApprovedBasesListDataService.activateBase(data, () => {
            this.disabledSave = false;
            this.dialogRef.close();
          });
    }
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

  private getDirectories() {
    combineLatest([this.directoriesService.getProductsList()])
      .pipe(untilDestroyed(this))
      .subscribe(([productCategories]) => {
        this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductDto>(productCategories).filter(
          el => el.isPreapprove
        );
      });
  }
}
