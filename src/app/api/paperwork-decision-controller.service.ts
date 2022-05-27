import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Decision } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PaperworkDecisionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка решений для Paperwork
   * @returns Observable of Directory
   */
  public getAll(): Observable<Decision[]> {
    return this.http.get<Decision[]>(`${this.baseUrl}/paperwork-decision`);
  }
}
