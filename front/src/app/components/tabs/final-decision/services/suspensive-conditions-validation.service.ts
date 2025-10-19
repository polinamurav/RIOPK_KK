import { Injectable } from '@angular/core';
import { ApplicantLoanDto, DirAbsCode, EditableTableHeader, OptionListNames } from '@app/_models';
import { IValidatorError } from '@app/validators/table-inputs-validators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SuspensiveConditionsValidationService {
  private _bankList: DirAbsCode[] = [];
  private _headers: EditableTableHeader[] = [];
  private _obligationsList: ApplicantLoanDto[] = [];

  private _validationsCodes = ['creditCode', 'clientAccount', 'accountYKO'];

  constructor(private translateService: TranslateService) {}

  setSuspensiveConditionsConfig(headers: EditableTableHeader[], bankList: DirAbsCode[]) {
    this._headers = headers;
    this._bankList = bankList;

    this._headers.forEach(head => {
      if (this._validationsCodes.includes(head.code)) {
        head.clearIfNotValidOnBlur = true;
        if (head.code === this._validationsCodes[0]) {
          head.innerValidation = [this.bankCodeValidation, this.bankNameValidator, this.uniqueCode];
        } else {
          if (head.code === this._validationsCodes[2]) {
            head.innerValidation = [this.bankCodeValidation];
          } else {
            head.innerValidation = [this.bankCodeValidation, this.bankNameValidator];
          }
        }
      }
    });
  }

  updateObligationsList = (obligationsList: ApplicantLoanDto[]): void => {
    this._obligationsList = obligationsList;
  };

  private bankCodeValidation = (rowValue: any, headName: string, val: string): IValidatorError => {
    if (!val) {
      return {
        msg: '',
        valid: true
      };
    }

    const tableHead = this._headers.find(el => el.code === headName);
    const title = this.translateService.instant(tableHead.value);

    const creditCode = val.slice(0, 3);

    const banks = this._bankList.filter(el => el.natid && el.natid.includes(creditCode));

    if (banks.length) {
      return {
        msg: '',
        valid: true
      };
    } else {
      return {
        msg: `${title}: первые 3 символа должны содержать код банка из Справочника банков`,
        valid: false
      };
    }
  };

  private bankNameValidator = (rowValue: any, headName: string, val: string): IValidatorError => {
    if (!val) {
      return {
        msg: '',
        valid: true
      };
    }

    const creditCode = val.slice(0, 3);
    const banks = this._bankList.filter(el => el.natid && el.natid.includes(creditCode));

    const tableHead = this._headers.find(el => el.code === headName);
    const title = this.translateService.instant(tableHead.value);

    if (banks.length) {
      if (
        !banks.some(
          el => el.nameAcra && el.nameAcra.toLowerCase().includes(rowValue.creditorOrganization.toLowerCase())
        )
      ) {
        return {
          msg: `Для “${rowValue.creditorOrganization}“ указан неверный ${title}`,
          valid: false
        };
      } else {
        return {
          msg: '',
          valid: true
        };
      }
    }

    return {
      msg: '',
      valid: true
    };
  };

  private uniqueCode = (rowValue: any, headName: string, val: string): IValidatorError => {
    if (!val) {
      return {
        msg: '',
        valid: true
      };
    }

    const fundedCode = this._obligationsList.filter(el => {
      if (el.creditCode && rowValue.id !== el.id) {
        return el.creditCode === val;
      }
    });

    if (fundedCode.length) {
      return {
        msg: 'ErrorMessage.CreditCodeNotUnique',
        valid: false
      };
    }

    return {
      msg: '',
      valid: true
    };
  };
}
