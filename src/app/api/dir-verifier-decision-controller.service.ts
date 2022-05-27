import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Decision } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DirVerifierDecisionControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getAll(): Observable<Decision[]> {
    return this.http.get<Decision[]>(`${this.baseUrl}/verifier-decisions`);
  }
}
