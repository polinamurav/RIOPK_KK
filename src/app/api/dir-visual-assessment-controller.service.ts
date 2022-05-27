import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageDTO, PaginationAndSortingDto, TransformQueryParams } from '@app/_models';
import { DirVisualAssessment, DirVisualAssessmentDto } from '@app/_models/api-models/visual-assessment';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirVisualAssessmentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными визуальных оценок на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirVisualAssessment>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirVisualAssessment>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirVisualAssessment>>(`${this.baseUrl}/visual-assessment/page`, { params });
  }

  /**
   * Создание списка визуальных оценок
   * @returns Observable of number
   */
  create(visualAssessment: DirVisualAssessmentDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/visual-assessment`, visualAssessment);
  }

  /**
   * Обновление списка визуальных оценок
   * @returns Observable of number
   */
  update(visualAssessment: DirVisualAssessmentDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/visual-assessment/update`, visualAssessment);
  }
}
