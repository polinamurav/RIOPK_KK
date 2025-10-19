import { Injectable } from '@angular/core';
import { BRMSMatrixDto } from '@app/_models/api-models/brms';
import { ApplicantLoanDto, BaseFormField, Dir } from '@app/_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@app/services/toast.service';
import { maxLimitSumValidator } from '@app/components/tabs/data-form/data-form.component';
import { FullFormGroupKeys } from '@app/components/tabs/data-form/constants/data-form-config';


export enum MatrixProductType {
  TOPUP = 'CL001',
  REFINANCING_MIX = 'CL002',
  REFINANCING = 'CL003',
  LOAN_BUYOUT = 'CL004'
}


export enum MatrixControlNames {
  MAIN_CREDIT_SUM_CONTROL = 'preapproveCalcCreditSum',
  REF_LOAN_CONTROL = 'creditSum',
  TOP_UP_CONTROL = 'creditSumTopUp',
  TOP_UP_TERM = 'preapproveCalcCreditTerm',
}

export enum MatrixProductIdsEnum {
  REF = 1,
  LOAN = 2,
  TOP_UP = 3,
}


@Injectable()
export class MatrixProcessDataService {

  private _chosenMatrix: BRMSMatrixDto;
  private _recalculatedMatrix: BRMSMatrixDto;
  private _matrixCreditLimit: number;

  private _currentFilteredList: ApplicantLoanDto[] = [];

  constructor(private toastService: ToastService) {
  }

  get chosenMatrix(): BRMSMatrixDto {
    return this._chosenMatrix;
  }

  get isLoanByuOut() {
    return this.chosenMatrix && this.chosenMatrix.product.code === MatrixProductType.LOAN_BUYOUT;
  }

  get isRef() {
    return this.chosenMatrix && this.chosenMatrix.product.code === MatrixProductType.REFINANCING;
  }

  get isRefMix() {
    return this.chosenMatrix && this.chosenMatrix.product.code === MatrixProductType.REFINANCING_MIX;
  }

  get isTopUp() {
    return (this.chosenMatrix &&
      this.chosenMatrix.product.code === MatrixProductType.TOPUP &&
      !!this.chosenMatrix.topUps.length);
  }

  onChooseMatrix(matrix: BRMSMatrixDto) {
    this._chosenMatrix = matrix;
    this._recalculatedMatrix = null;
    this._matrixCreditLimit = this.isRefMix ? matrix.maxLimitForRefRepay : matrix.maxLimit;
  }

  filterSuspensiveConditionsList = (list: ApplicantLoanDto[]): ApplicantLoanDto[] => {
    if (this.isRefMix || this.isRef) {
      this._currentFilteredList = list.filter(el => el.isRefinancing);
    } else if (this.isLoanByuOut) {
      this._currentFilteredList = list.filter(el => el.isRepayment);
    } else if (this.isTopUp) {
      this._currentFilteredList = list.filter(el => el.isTopup);
    } else {
      this._currentFilteredList = [];
    }
    return this._currentFilteredList;
  };

  filterOptionsByType = (list: Dir[]): Dir[] => {
    const id = this.isRefMix || this.isRef ? 1 : this.isLoanByuOut ? 2 : this.isTopUp ? 3 : null;

    return list.filter(
      el => el.id === id
    );
  };

  setVisibleByType = (config: BaseFormField[]): void => {
    const controlRefMix = config.find(el => el.code === MatrixControlNames.REF_LOAN_CONTROL);
    const controlTopUp = config.find(el => el.code === MatrixControlNames.TOP_UP_CONTROL);
    controlRefMix.isVisible = this.isRefMix || this.isLoanByuOut;
    controlRefMix.placeholder = this.isLoanByuOut ? 'Сумма на выкуп' : 'Сумма на рефинансирование';
    controlTopUp.isVisible = this.isTopUp;
  };

  setRecalculatedMatrix = (matrix: BRMSMatrixDto, form?: FormGroup): void => {
    if(!!matrix && !!form) {
      if(this.isLoanByuOut) {
        this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl, true);

        let newLimit = 0;
        if (matrix.maxLimit >= matrix.maxCreditSum) {
          newLimit = Math.ceil(matrix.maxCreditSum) - Math.ceil( matrix.maxLimitForRefRepay);
        } else {
          newLimit = Math.ceil(matrix.maxLimit) - Math.ceil( matrix.maxLimitForRefRepay);
        }

        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(newLimit);
        form.get(MatrixControlNames.REF_LOAN_CONTROL).setValue(Math.ceil(matrix.maxLimitForRefRepay));

        this.setMaxLimitValidator(form, newLimit)
      }

      if(this.isRefMix) {
        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue( Math.ceil(matrix.maxLimitCL) );
        this.setMaxLimitValidator(form, this.chosenMatrix.maxLimitCL)
      }

      if(this.isTopUp) {
        const sCondition = this._currentFilteredList.find(el => !!el.typeId);
        const topUp = matrix.topUps.find(el => el.applicantLoanId === sCondition.id);
        matrix.maxLimit = topUp.maxLimit;
        matrix.singleFeeLoanIssueSum = topUp.singleFeeLoanIssueSum;
        matrix.monthlyFeeLoanAccSum = topUp.monthlyFeeLoanAccSum;
        matrix.monthlyFeeLoanAccAddSum = topUp.monthlyFeeLoanAccAddSum;
      }
    } else {
      this.resetCalculator(form, ['creditSum', 'creditSumTopUp']);
    }

    this._recalculatedMatrix = matrix;
  }

  onChangeProduct = (form: FormGroup): void => {
    if (this.isRef || this.isRefMix) {
      if (this.isRef) {
        this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl);
        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).reset(0);
      } else {
        const mLimit = Math.ceil(this.chosenMatrix.maxLimitCL);
        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).enable();
        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(mLimit);

        this.setMaxLimitValidator(form, mLimit);
      }
    } else if (this.isLoanByuOut) {
      this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl);
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(this.chosenMatrix.maxLimit);
    } else if (this.isTopUp) {
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(this.chosenMatrix.maxLimit);
      form.get(MatrixControlNames.TOP_UP_CONTROL).reset(0);
      this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl, true);
    } else {
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(this.chosenMatrix.maxLimit);
      this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl, true);
    }
    form.get(MatrixControlNames.REF_LOAN_CONTROL).reset(0);

  };

  onErrorProcess = (item: Partial<ApplicantLoanDto>): void => {
    item.typeId = null;
    this.toastService.viewMsg('ErrorMessage.NotEdited', 'error');
  };

  addNewSuspensiveType = (form: FormGroup, item: Partial<ApplicantLoanDto>, callBack: () => void): void => {
    if (this.isRef || this.isRefMix) {
      this.refProcess(form, item, callBack);
    } else if (this.isLoanByuOut) {
      this.loanByuOutProcess(form, item, callBack);
    } else if (this.isTopUp) {
      this.topUpProcess(form, item , callBack);
    } else {
      callBack();
    }
  };

  getMatrixForRequest = (formValue: any): BRMSMatrixDto => {
    const topUpLimit = +formValue.preapproveCalcCreditSum + +formValue.creditSumTopUp;
    const loanOrRefLimit = +formValue.preapproveCalcCreditSum + +formValue.creditSum;
    const maxLimit = this.isRefMix || this.isLoanByuOut ? loanOrRefLimit : this.isTopUp ? topUpLimit : +formValue.preapproveCalcCreditSum;

    return {
      ...this.chosenMatrix,
      maxLimit,
      topUpRemainAmount: this.isTopUp ? +formValue.preapproveCalcCreditSum : null,
      maxLimitForRefRepay: this.isRefMix || this.isLoanByuOut ? +formValue.creditSum : null,
      creditTerm: formValue.preapproveCalcCreditTerm,
      isInsuranceAccident: formValue.isInsuranceAccident
    };
  };

  resetCalculator = (form: FormGroup, arr: string[]): void => {
    // ['preapproveCalcCreditSum', 'creditSum', 'creditSumTopUp'];
    arr.forEach(ctrl => {
      if (form) {
        form.get(ctrl).reset();
      }
    });
  };

  calculateMaxCreditSum = (type: number, list: ApplicantLoanDto[]): number => {
    const applicantLoanFiltered = this.filterSuspensiveListByType(type, list);
    return applicantLoanFiltered.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.isCreditLine ? currentValue.amount : currentValue.remainder);
    }, 0);
  };

  validateMaxLimit = (maxLimit: number, sum: number, type: MatrixProductIdsEnum | number): boolean => {
    const msgType = ['', 'рефинансирования', 'выкупа'];
    if (maxLimit < +sum) {
      this.toastService.viewMsg(
        `Сумма остатков выбранных для ${msgType[type]} кредитов
      ${sum} (рассчитанное значение) превышает лимит ${this._matrixCreditLimit}.`,
        'error'
      );
      return false;
    }
    return true;
  };

  validateCalculateProduct = (form: FormGroup): boolean => {
    let valid = true;
    const productCode = this.chosenMatrix.product.code as any;
    const controlName = this.isRefMix || this.isLoanByuOut
      ? MatrixControlNames.REF_LOAN_CONTROL : this.isTopUp ? MatrixControlNames.TOP_UP_CONTROL : MatrixControlNames.MAIN_CREDIT_SUM_CONTROL;
    const calcCreditSum = form.get(controlName).value;

    const msgTip = this.isTopUp ? '' : 'хотя бы';
    const msg = `Необходимо заполнить поле “Тип отлагательных условий“
      ${msgTip} для одного кредита в таблице “Отлагательные условия“ для продукта “${
      this.chosenMatrix.product.nameRu
      }“`;

    if (!calcCreditSum) {
      valid = false;
    }

    if (this.isLoanByuOut) {
      valid = !!this.calculateMaxCreditSum(MatrixProductIdsEnum.LOAN, this._currentFilteredList);
    }

    if (!valid) {
      this.toastService.viewMsg(msg, 'error');
      return valid;
    }
    return true;
  };

  validateTopUp = (form: FormGroup, list: ApplicantLoanDto[]): boolean => {
    const filtered = this.filterSuspensiveListByType(MatrixProductIdsEnum.TOP_UP, list);
    if (filtered.length > 1) {
      this.toastService.viewMsg(`Только один кредит может быть выбран для top-up`, 'error');
      return false;
    } else {
      return this.setTopUpValues(form, filtered[0]);
    }
  };


  getSuspensiveConditionsTypeId = (): number => {
    return this.isRefMix || this.isRef ? 1 : this.isLoanByuOut ? 2 : this.isTopUp ? 3 : null;
  }

  private setTopUpValues = (form: FormGroup, data: ApplicantLoanDto): boolean => {
    if (data) {
      const topUp = this.chosenMatrix.topUps.find(el => {
        el.isSelected = false;
        if(el.applicantLoanId === data.id) {
          el.isSelected = true;
          return true
        }
      });
      if(!topUp) {
        return false;
      }
      const MAIN_CREDIT_SUM_CONTROL = form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL);
      const TOP_UP_CONTROL = form.get(MatrixControlNames.TOP_UP_CONTROL);
      const TOP_UP_TERM = form.get(MatrixControlNames.TOP_UP_TERM);

      const remainder = Math.ceil(data.isCreditLine ? data.amount : data.remainder);
      TOP_UP_CONTROL.setValue(remainder);
      const sum =  Math.ceil(topUp.maxLimit - remainder);
      MAIN_CREDIT_SUM_CONTROL.setValue(sum);
      TOP_UP_TERM.setValue(topUp.creditTerm);
      MAIN_CREDIT_SUM_CONTROL.setValidators(maxLimitSumValidator(sum));
      MAIN_CREDIT_SUM_CONTROL.updateValueAndValidity();
      return true;
    } else {
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(this.chosenMatrix.maxLimit);
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).clearValidators();
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).updateValueAndValidity();
      form.get(MatrixControlNames.TOP_UP_CONTROL).reset();
    }
  };

  private disableCalculatorCreditControl = (control: FormControl, enable?: boolean): void => {
    control.clearValidators();
    if (enable) {
      control.setValidators(Validators.required);
      control.enable();
    } else {
      control.disable();
    }
    control.updateValueAndValidity();
  };

  // PROCESS
  private loanByuOutProcess = (form: FormGroup, item: Partial<ApplicantLoanDto>, callBack: () => void): void => {
    const sum = this.calculateMaxCreditSum(MatrixProductIdsEnum.LOAN, this._currentFilteredList);
    const roundSum = !!sum ? Math.ceil(sum) : 0;

    const matrixCreditLimit =  !!this._recalculatedMatrix ? this._recalculatedMatrix.maxLimit : this._matrixCreditLimit;

    if (this.validateMaxLimit(matrixCreditLimit, roundSum, MatrixProductIdsEnum.LOAN)) {
      form.get(MatrixControlNames.REF_LOAN_CONTROL).setValue(roundFloatNumber(roundSum));
      form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(roundFloatNumber(this.chosenMatrix.maxLimit - roundSum));
      this.disableCalculatorCreditControl(form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL) as FormControl);
      callBack();
    } else {item.typeId = null;}
  };

  private refProcess = (form: FormGroup, item: Partial<ApplicantLoanDto>, callBack: () => void): void => {
    const sum = this.calculateMaxCreditSum(MatrixProductIdsEnum.REF, this._currentFilteredList);

    if (this.isRef) {
      const roundSum = !!sum  ? Math.ceil(sum) : 0;
      if (this.validateMaxLimit(this._matrixCreditLimit, roundSum as any, MatrixProductIdsEnum.REF)) {
        form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValue(roundSum);
        callBack();
      } else {item.typeId = null;}
    } else {

      const roundSum = !!sum  ? sum.toFixed(2) : 0;
      if (this.validateMaxLimit(this._matrixCreditLimit, roundSum as any, MatrixProductIdsEnum.REF)) {
        callBack();
        form.get(MatrixControlNames.REF_LOAN_CONTROL).setValue(roundSum);
        this.setMaxLimitValidator(form, Math.ceil( this.chosenMatrix.maxLimitCL ) );
      } else {item.typeId = null;}
    }
  };

  private topUpProcess = (form: FormGroup, item: Partial<ApplicantLoanDto>, callBack: () => void): void => {

    if(this.validateTopUp(form, this._currentFilteredList)) {
      callBack();
    } else {item.typeId = null;  callBack();}


  };

  private setMaxLimitValidator = (form: FormGroup, limit: number):void => {
    form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValidators(Validators.required);
    form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).enable();
    form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).setValidators(maxLimitSumValidator(limit));
    form.get(MatrixControlNames.MAIN_CREDIT_SUM_CONTROL).updateValueAndValidity();
  }

  private filterSuspensiveListByType = (type: number, list: ApplicantLoanDto[]): ApplicantLoanDto[] => {
    return list.filter(
      el => !!el.typeId && (el.typeId === type)
    );
  };


}

function roundFloatNumber(sum: number): number {
  if(!!sum && !Number.isInteger(sum)) {
    return +sum.toFixed(2) as number;
  } else {
    return sum;
  }
}
