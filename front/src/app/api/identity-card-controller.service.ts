import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { IdentityCard } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class IdentityCardControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // TODO: исправить всё

  /**
   * Сохранение файла
   * @param fileData Файл и информация о нём
   * @returns Observable of CreatedUpdatedParam>
   */
  public create(fileData: IdentityCard): Observable<IdentityCard> {
    return this.http.post<IdentityCard>(`${this.baseUrl}/identity-card`, fileData);
  }

  /**
   * Сохранение файла
   * @param fileData Файл и информация о нём
   * @returns Observable of CreatedUpdatedParam>
   */
  public update(fileData: IdentityCard): Observable<string | number> {
    return this.http.post<string | number>(`${this.baseUrl}/identity-card/update`, fileData);
  }
}
