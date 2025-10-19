import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  IntegrationAbsParallelApplicationsDto,
  SummaryIndividualsDataDto
} from '@app/_models/api-models/inner-information';
// @ts-ignore
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InnerInformationControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение внутренней информации
   * @param applicationId: id приложения
   * @param socCardId: id socCardId
   * @returns Observable<SummaryIndividualsDataDto>
   */
  public getInnerInfo(
    applicationId: number,
    socCardId: number,
    date?: Date
  ): Observable<IntegrationAbsParallelApplicationsDto[]> {
    const currentDate = date ? date.setFullYear(date.getFullYear() - 2) : undefined; // Вычитаем 2 года и делаем формат даты мм.дд.гг

    return this.http.post<IntegrationAbsParallelApplicationsDto[]>(this.baseUrl + `/inner-information`, {
      applicationId,
      socCardId,
      dateFrom: date ? moment(currentDate).format('YYYY-MM-DD') : null
    });
  }
}
