import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Employment, EmploymentFrontDto } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmploymentControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // TODO: исправить всё

  /**
   * Сохранение файла
   * @param fileData Файл и информация о нём
   * @returns Observable of <Employment>
   */
  public create(fileData: Employment): Observable<Employment> {
    return this.http.post<Employment>(`${this.baseUrl}/employments`, fileData);
  }

  /**
   * Сохранение файла
   * @param dto параметры для post запроса
   * @returns Observable of <Employment>>
   */
  public update(dto: EmploymentFrontDto): Observable<Employment> {
    return this.http.post<Employment>(`${this.baseUrl}/employments/update`, dto);
  }
}
