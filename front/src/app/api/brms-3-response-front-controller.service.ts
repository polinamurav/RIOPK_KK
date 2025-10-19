import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMSResponseDto } from '@app/_models/api-models/brms';

@Injectable({ providedIn: 'root' })
export class Brms3ResponseFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMSResponseDto[]
   */
  public getAll(): Observable<BRMSResponseDto[]> {
    return this.http.get<BRMSResponseDto[]>(`${this.baseUrl}/brms3-response`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMSResponseDto
   */
  public getById(id: number | string): Observable<BRMSResponseDto> {
    return this.http.get<BRMSResponseDto>(`${this.baseUrl}/brms3-response/${id}`);
  }
}
