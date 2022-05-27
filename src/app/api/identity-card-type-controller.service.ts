import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DirAbsCode } from '@app/_models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityCardTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение информации о типах документа удостоверяющего личность
   * @returns Observable of DirAbsCode
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/identity-card-type`);
  }
}
