import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BRMSResponse } from '@app/_models/api-models/brms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectedConditionReq } from '@app/_models/api-models/selected-condition';
import { DirPaymentCardControllerService } from '@app/api/dir-payment-card-controller.service';
import { DirectoryVal, DirBranch } from '@app/_models';
import { DirBranchControllerService } from '@app/api';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-selected-condition-modal',
  templateUrl: './selected-condition-modal.component.html',
  styleUrls: ['./selected-condition-modal.component.scss']
})
export class SelectedConditionModalComponent implements OnInit, OnDestroy {
  accounts = [{ id: 1, name: 'Новый счет' }, { id: 2, name: 'Существующий счет' }, { id: 3, name: 'Новая карта' }];
  urgency = [{ id: 'Срочный ', name: 'Срочный' }, { id: 'Обычный ', name: 'Обычный' }];

  paymentCards: DirectoryVal[] = [];
  branches: DirBranch[] = [];

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SelectedConditionReq>,
    @Inject(MAT_DIALOG_DATA) public data: BRMSResponse,
    private dirPaymentCardControllerService: DirPaymentCardControllerService,
    private dirBranchControllerService: DirBranchControllerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dirPaymentCardControllerService.getList().subscribe(paymentCards => {
      this.paymentCards = paymentCards;
    });

    this.dirBranchControllerService.getList().subscribe(branches => {
      this.branches = branches;
    });

    this.form = this.formBuilder.group({
      selectedCondition: this.formBuilder.group({
        active: [true],
        annualInterestRate: [this.data.rate],

        // applicantId: ['608'],

        applicationId: [this.data.applicationId],
        productId: [2],

        currency: [this.data.currency],
        period: ['', Validators.required],
        sum: ['', Validators.required],

        accountNumber: [null],

        contractNumber: [null],
        repaymentAmount: [null],
        unencumberedBalance: [null],

        codeword: [null],
        costCard: [null],
        urgencyCard: [null],
        termCard: [null],
        dirPaymentCardId: [null],
        nameOnCard: [null],
        dirBranchId: [null]
      }),
      account: ['', Validators.required]
    });

    this.form
      .get('account')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe((val: number) => {
        switch (val) {
          case 1:
            this.setСlearValidatorsToExistingAccount(false);
            this.setСlearValidatorsToNewCard(false);
            break;
          case 2:
            this.setСlearValidatorsToExistingAccount(true);
            this.setСlearValidatorsToNewCard(false);
            break;
          case 3:
            this.setСlearValidatorsToExistingAccount(false);
            this.setСlearValidatorsToNewCard(true);
            break;
          default:
            break;
        }
      });
  }

  ngOnDestroy(): void {}

  setСlearValidatorsToExistingAccount(setValidators: boolean) {
    const accountNumber = this.form.get('selectedCondition').get('accountNumber');

    if (setValidators) {
      accountNumber.setValidators(Validators.required);
    } else {
      accountNumber.reset();
      accountNumber.clearValidators();
    }

    accountNumber.updateValueAndValidity();
  }

  setСlearValidatorsToNewCard(setValidators: boolean) {
    const codeword = this.form.get('selectedCondition').get('codeword');
    const costCard = this.form.get('selectedCondition').get('costCard');
    const urgencyCard = this.form.get('selectedCondition').get('urgencyCard');
    const termCard = this.form.get('selectedCondition').get('termCard');
    const dirPaymentCardId = this.form.get('selectedCondition').get('dirPaymentCardId');
    const nameOnCard = this.form.get('selectedCondition').get('nameOnCard');
    const dirBranchId = this.form.get('selectedCondition').get('dirBranchId');

    if (setValidators) {
      codeword.setValidators(Validators.required);
      costCard.setValidators(Validators.required);
      urgencyCard.setValidators(Validators.required);
      termCard.setValidators(Validators.required);
      dirPaymentCardId.setValidators(Validators.required);
      nameOnCard.setValidators(Validators.required);
      dirBranchId.setValidators(Validators.required);
    } else {
      codeword.reset();
      codeword.clearValidators();
      costCard.reset();
      costCard.clearValidators();
      urgencyCard.reset();
      urgencyCard.clearValidators();
      termCard.reset();
      termCard.clearValidators();
      dirPaymentCardId.reset();
      dirPaymentCardId.clearValidators();
      nameOnCard.reset();
      nameOnCard.clearValidators();
      dirBranchId.reset();
      dirBranchId.clearValidators();
    }

    codeword.updateValueAndValidity();
    costCard.updateValueAndValidity();
    urgencyCard.updateValueAndValidity();
    termCard.updateValueAndValidity();
    dirPaymentCardId.updateValueAndValidity();
    nameOnCard.updateValueAndValidity();
    dirBranchId.updateValueAndValidity();
  }

  sendButtonClick() {
    this.dialogRef.close(this.form.get('selectedCondition').value);
  }
}
