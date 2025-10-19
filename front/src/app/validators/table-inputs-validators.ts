export const isOdd = num => num % 2 !== 0;
export const isEven = num => num % 2 === 0;

export const isInt = n => Number(n) === n && n % 1 === 0;

export const isFloat = n => Number(n) === n && n % 1 !== 0;

export interface IValidatorError {
  msg?: string;
  valid?: boolean;
}

export const bankCodeValidator = (val: string): IValidatorError => {
  if (!val) {
    return {
      msg: '',
      valid: true
    };
  }

  const pattern = /^[0-9]{12}[LMNOPQRSTUVWXYZ]{1}[0-9]{3}$/;

  if (!pattern.test(val)) {
    return {
      msg: `Неверный формат: XXXXXXXXXXXXAXXX (A - одна из латинских букв (L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z)   X- цифра )`,
      valid: false
    };
  }

  const firstNumbers = parseInt(val, 10);
  const firstNumbersArray = Array.from(firstNumbers.toString(), Number);

  const filialCode = firstNumbersArray.slice(0, 11);
  const ControlNumber = firstNumbersArray.slice(11, 12)[0];

  const odd = filialCode.filter(isOdd);
  const even = filialCode.filter(isEven);

  let finalCNumber = 0;

  const sumFCodes = filialCode.reduce((accumulator, currentValue, index) => {
    let finCurSum = 0;

    if (isEven(index)) {
      const sumCur = currentValue * 2;
      const sArr = Array.from(sumCur.toString(), Number);
      finCurSum = sArr[0] + (!!sArr[1] ? sArr[1] : 0);
    } else {
      finCurSum = currentValue;
    }

    return accumulator + finCurSum;
  }, 0);

  const checkedNumber = sumFCodes / 10;

  if (isInt(checkedNumber)) {
    finalCNumber = 0;
  }
  if (isFloat(checkedNumber)) {
    const roundSum = Math.ceil(checkedNumber) * 10;

    finalCNumber = roundSum - sumFCodes;
  }

  if (finalCNumber !== ControlNumber) {
    return {
      msg: `12-й контрольный символ не соответствует алгоритму расчета контрольного символа`,
      valid: false
    };
  }

  return {
    msg: '',
    valid: true
  };
};
