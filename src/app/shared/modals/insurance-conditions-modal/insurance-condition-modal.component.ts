import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DirInsuranceType, InsuranceCompany, InsuranceCompanyDto, InsuranceCondition, ProductRes } from '@app/_models';
import { TranslateService } from '@ngx-translate/core';

export interface InsuranceConditionModalData {
  conditionInfo: InsuranceCompanyDto;
  title: string;
  showSaveButton: boolean;
  showCreateButton: boolean;
}

@Component({
  selector: 'app-insurance-condition-modal',
  templateUrl: './insurance-condition-modal.component.html',
  styleUrls: ['./insurance-condition-modal.component.scss', '../close-modal-btn.scss']
})
export class InsuranceConditionModalComponent implements OnInit {
  addConditionForm: FormGroup;

  title: string;

  showEditButton: boolean = true;

  showSendButton: boolean = false;

  products: ProductRes[];

  companies: InsuranceCompany[];

  types: DirInsuranceType[];

  emitData: EventEmitter<any> = new EventEmitter();

  language: string = this.translateService.currentLang;

  private disabledFields: boolean = true;

  private conditionControls: { [key: string]: AbstractControl };

  private conditionData: InsuranceCondition;

  private companyId;
  private productId;
  private typeId;

  constructor(
    private dialogRef: MatDialogRef<InsuranceConditionModalComponent>,
    private fb: FormBuilder,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data: InsuranceConditionModalComponent
  ) {
    if (!!this.data) {
      this.title = this.data.title || '';
      this.showSendButton = this.data.showSendButton || false;
      this.disabledFields = this.data.disabledFields || false;
    }

    if (!!this.data && !!this.data.products) {
      this.products = this.data.products;
    }

    if (!!this.data && !!this.data.types) {
      this.types = this.data.types;
    }

    if (!!this.data && !!this.data.companies) {
      this.companies = this.data.companies;
    }

    if (!!this.data && !!this.data.conditionData) {
      this.conditionData = this.data.conditionData;
      this.typeId = this.findTypeByName(this.conditionData.insuranceType.nameRu);
      this.companyId = this.conditionData.insuranceCompany
        ? this.findCompanyByName(this.conditionData.insuranceCompany.name)
        : null;
      this.productId = this.conditionData.product ? this.findProductByName(this.conditionData.product.nameRu) : null;
    }
  }

  ngOnInit() {
    this.createdForm();
  }

  sendButtonClick() {
    if (this.addConditionForm.invalid) {
      return;
    }

    this.emitData.emit(this.addConditionForm.getRawValue());
    this.addConditionForm.reset();
    this.dialogRef.close();
  }

  editButtonClick() {
    this.showEditButton = false;
    this.disabledFields = false;
    this.disableFields();
  }

  cancelButtonClick() {
    this.showEditButton = true;

    if (this.disabledFields) {
      return;
    }

    this.disabledFields = true;
    this.disableFields();
    this.setInitialFormValues();
  }

  saveButtonClick() {
    if (!this.addConditionForm.valid) {
      return;
    }

    this.showEditButton = true;
    this.disabledFields = true;
    this.disableFields();
    this.emitData.emit(this.addConditionForm.getRawValue());
  }

  private disableFields() {
    if (!this.disabledFields) {
      this.addConditionForm.enable();
    } else {
      this.addConditionForm.disable();
    }
  }

  private findTypeByName(name: string) {
    return this.types.find(item => item.nameRu === name).id;
  }

  private findProductByName(name: string) {
    return this.products.find(item => item.nameRu === name).id;
  }

  private findCompanyByName(name: string) {
    return this.companies.find(item => item.name === name).id;
  }

  private setInitialFormValues() {
    for (const control in this.conditionControls) {
      if (!!control) {
        if (control === 'productId' && !!this.conditionData.product) {
          this.conditionControls[control].setValue(this.conditionData.product.id);
        } else if (control === 'insuranceCompanyId' && !!this.conditionData.insuranceCompany) {
          this.conditionControls[control].setValue(this.conditionData.insuranceCompany.id);
        } else if (control === 'insuranceTypeId' && !!this.conditionData.insuranceType) {
          this.conditionControls[control].setValue(this.conditionData.insuranceType.id);
        } else if (!!this.conditionData[control]) {
          this.conditionControls[control].setValue(this.conditionData[control]);
        }
      }
    }

    this.conditionControls.updated.setValue(new Date());
  }

  private createdForm() {
    this.addConditionForm = this.fb.group({
      productId: { value: this.productId ? this.conditionData.product.id : '', disabled: this.disabledFields },
      insuranceCompanyId: {
        value: this.companyId ? this.conditionData.insuranceCompany.id : '',
        disabled: this.disabledFields
      },
      insuranceTypeId: [
        { value: this.typeId ? this.conditionData.insuranceType.id : '', disabled: this.disabledFields },
        Validators.required
      ],
      minTerm: [
        { value: this.conditionData ? this.conditionData.minTerm : '', disabled: this.disabledFields },
        Validators.required
      ],
      maxTerm: [
        { value: this.conditionData ? this.conditionData.maxTerm : '', disabled: this.disabledFields },
        Validators.required
      ],
      minAmount: [
        { value: this.conditionData ? this.conditionData.minAmount : '', disabled: this.disabledFields },
        Validators.required
      ],
      rate: [
        { value: this.conditionData ? this.conditionData.rate : '', disabled: this.disabledFields },
        Validators.required
      ],
      active: [
        { value: this.conditionData ? this.conditionData.active : false, disabled: this.disabledFields },
        Validators.required
      ],
      updated: [new Date()],
      created: [this.conditionData ? this.conditionData.created : new Date()]
    });

    this.conditionControls = this.addConditionForm.controls;
  }
}
