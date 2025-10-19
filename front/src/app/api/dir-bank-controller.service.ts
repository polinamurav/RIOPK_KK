import { DirAbsCode } from './../_models/api-models/directory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DirBankControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of DirSigner
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/bank`);
  }
}
