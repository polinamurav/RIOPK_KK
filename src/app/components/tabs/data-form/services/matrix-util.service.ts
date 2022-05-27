import { REF_LIABILITY_KEYS, RefLiabilityKey } from '../constants/data-form-constants';

import { BRMS2MatrixDto, BRMSMatrixDto } from '@app/_models/api-models/brms';
import { Injectable } from '@angular/core';

@Injectable()
export class MatrixUtilService {
  constructor() {}

  public isNotNullMatrixExist(matrix: BRMS2MatrixDto) {
    const calculatedMatrix = this.getTransformedMatrix(matrix);
    let isExist = false;

    for (const key of Object.keys(calculatedMatrix)) {
      if (!!calculatedMatrix[key]) {
        isExist = true;
      }
    }
    return !!isExist;
  }

  public transformFromLiabilityToLiabilityId(brms2Obj: BRMS2MatrixDto) {
    return REF_LIABILITY_KEYS.reduce((refLiabilityObj: {}, item: RefLiabilityKey) => {
      refLiabilityObj[item.keyWithId] =
        !!brms2Obj && !!brms2Obj[item.key] && !!brms2Obj[item.key].id ? brms2Obj[item.key].id : null;
      return refLiabilityObj;
    }, {});
  }

  public deleteRefLiabilityKeys(obj: BRMS2MatrixDto) {
    REF_LIABILITY_KEYS.forEach((item: RefLiabilityKey) => delete obj[item.key]);
  }

  public getTransformedMatrix(matrix: BRMS2MatrixDto) {
    return REF_LIABILITY_KEYS.reduce((refLiabilityObj: {}, item: RefLiabilityKey) => {
      refLiabilityObj[item.key] = !!matrix && !!matrix[item.key] ? matrix[item.key] : null;

      return refLiabilityObj;
    }, {});
  }

  public filterMatrix(matrix: BRMSMatrixDto[], isWithRef: boolean, productId: number) {
    let filteredMatrix: BRMSMatrixDto[] = matrix.filter((m: BRMS2MatrixDto) =>
      isWithRef
        ? m.ref1AcbLiability != null ||
          m.ref2AcbLiability != null ||
          m.ref3AcbLiability != null ||
          m.ref4AcbLiability != null ||
          m.ref5AcbLiability != null ||
          m.ref6AcbLiability != null ||
          m.ref7AcbLiability != null ||
          m.ref8AcbLiability != null ||
          m.ref9AcbLiability != null ||
          m.ref10AcbLiability != null
        : m.ref1AcbLiability == null &&
          m.ref2AcbLiability == null &&
          m.ref3AcbLiability == null &&
          m.ref4AcbLiability == null &&
          m.ref5AcbLiability == null &&
          m.ref6AcbLiability == null &&
          m.ref7AcbLiability == null &&
          m.ref8AcbLiability == null &&
          m.ref9AcbLiability == null &&
          m.ref10AcbLiability == null
    );

    if (!!productId) {
      filteredMatrix = filteredMatrix.filter((m: BRMS2MatrixDto) => m.product.id == productId);
    }
    return filteredMatrix;
  }
}
