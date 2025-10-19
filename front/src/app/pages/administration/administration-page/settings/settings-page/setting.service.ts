import { Injectable } from '@angular/core';
import { CustomSettingsDto } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor() {}

  /**
   * Если с сервера в параметре parameterDouble приходит значение без плавоющей точки
   * Нужно это для отображения корректного значения
   */
  setToFixed(key: string, data: CustomSettingsDto) {
    if (key === 'parameterDouble') {
      const splittingVal = (data.parameterDouble as number).toString().split('.');
      if ((splittingVal.length > 1 && splittingVal[1].length < 2) || splittingVal.length === 1) {
        data.parameterDouble = (data.parameterDouble as number).toFixed(2);
      }
    }
  }
}
