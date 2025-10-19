import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntegrationInterfaceDto } from '@app/_models';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class IntegrationInterfaceControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по получению Справки о занятости
   * @returns Observable of AsanEmploymentResponse
   */
  // public getById(id: string): Observable<IntegrationInterfaceDto> {
  //   return this.http.get<IntegrationInterfaceDto>(`${this.baseUrl}/integration-interface`, {
  //     params: { id }
  //   });
  // }
}
