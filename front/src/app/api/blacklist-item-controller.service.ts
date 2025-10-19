import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlacklistItem } from '@app/_models/api-models/blacklist-item';

@Injectable({ providedIn: 'root' })
export class BlacklistItemControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMS2Matrix[]
   */
  public getAll(): Observable<BlacklistItem[]> {
    return this.http.get<BlacklistItem[]>(`${this.path}/blacklist-item`);
  }
}
