import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirAbsCode } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { DirExpenseType } from '@app/_models/api-models/dir-expense-type';

@Injectable({
  providedIn: 'root'
})
export class DirExpenseTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @returns Observable of Directory
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirExpenseType[]>(`${this.baseUrl}/expense-type`);
  }
}
