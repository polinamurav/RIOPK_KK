import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { SelectedConditionRes, SelectedConditionReq } from '@app/_models/api-models/selected-condition';

@Injectable({ providedIn: 'root' })
export class SelectedConditionController {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранных условий кредитования
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<SelectedConditionRes[]>
   */
  public getAllByApplicantIdAndApplicationId(
    applicantId: string,
    applicationId: string
  ): Observable<SelectedConditionRes[]> {
    const params = { applicantId, applicationId };
    return this.http.get<SelectedConditionRes[]>(this.path + `/selected-products`, { params });
  }

  /**
   * Создание выбранных условий кредитования
   * @param selectedCondition: выбранное условие кредитования
   * @returns Observable<SelectedConditionRes>
   */
  public save(selectedCondition: SelectedConditionReq): Observable<SelectedConditionRes> {
    return this.http.post<SelectedConditionRes>(this.path + `/selected-products`, selectedCondition);
  }

  /**
   * Удаление выбранных условий кредитования
   * @param id: id выбранного условия кредитования
   * @returns Observable<SelectedConditionRes>
   */
  public delete(id: string | number): Observable<SelectedConditionRes> {
    return this.http.delete<SelectedConditionRes>(this.path + `/selected-products/${id}`);
  }
}
