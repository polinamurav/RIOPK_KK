import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShortApplicationDto } from '@app/_models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortApplicationControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Создание краткой анкеты
   * @returns Observable<number>
   */
  public create(shortAppDto: ShortApplicationDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/short-app/create`, shortAppDto);
  }
}
