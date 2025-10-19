import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { RelativeDto, RelativeListDto } from '@app/_models';
import { pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RelativesControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение информации о родственниках по applicant_id
   * @param applicant_id: string | number
   * @returns Observable<RelativeDto[]>
   */
  public getRelativesByApplicantId(applicant_id: string | number): Observable<RelativeDto[]> {
    return this.http
      .get<RelativeDto[]>(`${this.baseUrl}/relatives/by_applicant/${applicant_id}`)
      .pipe(pluck('relatives'));
  }

  /**
   * Сохранение информации по родственникам
   * @param dto Информация о родственниках
   * @returns Observable of RelativeDto
   */
  public update(dto: RelativeListDto): Observable<RelativeListDto> {
    return this.http.post<RelativeListDto>(`${this.baseUrl}/relatives/update_list`, dto);
  }
}
