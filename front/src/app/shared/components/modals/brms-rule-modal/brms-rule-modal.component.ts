import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RuleData } from '@app/pages/administration/administration-page/brms-rules/rules-page/rules-page.component';
import { BRMSRule, BRMSRuleDTO } from '@app/_models';
import { DirProductGroup } from '@app/_models/api-models-mass-segment/product-group';
import { BRMSRuleGroupDto } from '@app/_models/api-models-mass-segment/rule-group';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brms-rule-modal',
  templateUrl: './brms-rule-modal.component.html',
  styleUrls: ['./brms-rule-modal.component.scss', '../close-modal-btn.scss']
})
export class RuleModalComponent implements OnInit {
  ruleForm: FormGroup;

  title: string;

  showEditButton: boolean = true;

  showSendButton: boolean = false;

  emitData: EventEmitter<BRMSRuleDTO> = new EventEmitter();

  productGroupList: DirProductGroup[] = [];
  ruleGroupList: BRMSRuleGroupDto[] = [];

  private disabledFields: boolean = true;

  private ruleControls: { [key: string]: AbstractControl };

  private ruleData: BRMSRule;

  constructor(
    private dialogRef: MatDialogRef<RuleModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: RuleData
  ) {
    if (!!this.data) {
      this.title = this.data.title || '';
      this.productGroupList = this.data.dirProductGroup;
      this.ruleGroupList = this.data.dirRuleGroupList;
      this.showSendButton = this.data.showSendButton || false;
      this.disabledFields = this.data.disabledFields || false;
    }

    if (!!this.data && !!this.data.ruleData) {
      this.ruleData = this.data.ruleData;
    }
  }

  ngOnInit() {
    this.createForm();
  }

  sendButtonClick() {
    if (this.ruleForm.invalid) {
      return;
    }

    this.emitData.emit(this.ruleForm.getRawValue());
    this.ruleForm.reset();
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
    if (!this.ruleForm.valid) {
      return;
    }

    this.showEditButton = true;
    this.disabledFields = true;
    this.disableFields();

    this.emitData.emit({ ...new BRMSRuleDTO(this.data.ruleData), ...this.ruleForm.getRawValue() });

    this.dialogRef.close();
  }

  private disableFields() {
    if (!this.disabledFields) {
      this.ruleForm.enable();
      this.setFieldDisabled();
    } else {
      this.ruleForm.disable();
    }
  }

  private setFieldDisabled() {
    if (!this.showSendButton) {
      this.ruleForm.get('id').disable();
      this.ruleForm.get('brmsRuleTypeId').disable();
      this.ruleForm.get('nameRu').disable();
    }
  }

  private setInitialFormValues() {
    for (const control in this.ruleControls) {
      if (!!control) {
        if (control === 'brmsRuleTypeId') {
          this.ruleControls[control].setValue(this.ruleData.brmsRuleType.id);
        } else {
          this.ruleControls[control].setValue(this.ruleData[control]);
        }
      }
    }
    this.ruleControls.updated.setValue(new Date());
  }

  private createForm() {
    this.ruleForm = this.fb.group({
      id: [{ value: this.ruleData ? this.ruleData.id : '', disabled: this.disabledFields }, Validators.required],
      nameRu: [
        { value: this.ruleData ? this.ruleData.nameRu : '', disabled: this.disabledFields },
        Validators.required
      ],
      brmsRuleTypeId: [
        {
          value: this.ruleData && !!this.ruleData.brmsRuleType ? this.ruleData.brmsRuleType.id : '',
          disabled: this.disabledFields
        },
        Validators.required
      ],
      active: [
        { value: this.ruleData ? this.ruleData.active : false, disabled: this.disabledFields },
        Validators.required
      ],
      isVisibleForManager: [
        { value: this.ruleData ? this.ruleData.isVisibleForManager : false, disabled: this.disabledFields }
        // Validators.required
      ],
      productGroupId: [
        { value: this.ruleData ? this.ruleData.productGroupId : '', disabled: this.disabledFields }
        // Validators.required
      ],
      brmsRuleGroupId: [
        {
          value: this.ruleData && this.ruleData.brmsRuleGroup ? this.ruleData.brmsRuleGroup.id : '',
          disabled: this.disabledFields
        }
        // Validators.required
      ],
      updated: [new Date()],
      created: [this.ruleData ? this.ruleData.created : new Date()]
    });

    this.ruleControls = this.ruleForm.controls;
  }
}
