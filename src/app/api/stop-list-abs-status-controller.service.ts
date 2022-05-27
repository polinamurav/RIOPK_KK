import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { StopListAbsStatusDto } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StopListAbsStatusControllerService {
  private baseUrl = environment.integrationUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getAll(): Observable<StopListAbsStatusDto[]> {
    return this.http.get<StopListAbsStatusDto[]>(`${this.baseUrl}/stop-list-abs-status/all`);
  }
}
