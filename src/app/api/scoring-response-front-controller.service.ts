import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { ScoringResponseDto } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ScoringResponseFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of ScoringResponseDto[]
   */
  public getAll(): Observable<ScoringResponseDto[]> {
    return this.http.get<ScoringResponseDto[]>(`${this.baseUrl}/brms4-response-rules`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of ScoringResponseDto
   */
  public getById(id: number | string): Observable<ScoringResponseDto> {
    return this.http.get<ScoringResponseDto>(`${this.baseUrl}/brms4-response-rules/${id}`);
  }
}
