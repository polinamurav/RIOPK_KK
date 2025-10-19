import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortApplicationControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Порлучение id краткой анкеты при поиске предодобов
   * @returns Observable<number>
   */
  public getApplicationId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/short-app/save`);
  }
}
