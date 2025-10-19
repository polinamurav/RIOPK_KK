import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  VisualAssessmentChecklistListDto,
  VisualAssessmentChecklistDto,
  VisualAssessmentChecklist
} from '@app/_models/api-models/visual-assessment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisualAssessmentChecklistController {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка визуальных оценок
   * @param applicantId: id заявителя
   * @param applicationId: id приложения
   * @returns Observable<VisualAssessmentChecklist[]>
   */
  public getAllByApplicantIdAndApplicationIdOrInit(
    applicantId: string,
    applicationId: string
  ): Observable<VisualAssessmentChecklist[]> {
    const params = { applicantId, applicationId };
    return this.http
      .get<VisualAssessmentChecklist[]>(this.baseUrl + `/visual-assessment-checklist`, { params })
      .pipe(
        map((dirItemsArray: VisualAssessmentChecklist[]) =>
          dirItemsArray.filter((item: VisualAssessmentChecklist) => item.dirVisualAssessment.active === true)
        )
      );
  }

  /**
   * Сохранение списка визуальных оценок
   * @param visualAssessment: Визуальная оценка
   * @returns Observable<VisualAssessmentChecklist>
   */
  public save(visualAssessment: VisualAssessmentChecklistDto): Observable<VisualAssessmentChecklist> {
    return this.http.post<VisualAssessmentChecklist>(this.baseUrl + `/visual-assessment-checklist`, visualAssessment);
  }

  /**
   * Сохранение списка визуальных оценок
   * @param visualAssessments: визуальные оценки
   * @returns Observable<VisualAssessmentChecklist>
   */
  public saveAll(visualAssessments: VisualAssessmentChecklistListDto): Observable<VisualAssessmentChecklist[]> {
    return this.http.post<VisualAssessmentChecklist[]>(
      this.baseUrl + `/visual-assessment-checklist/saveAll`,
      visualAssessments
    );
  }
}
