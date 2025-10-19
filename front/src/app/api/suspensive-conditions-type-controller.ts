import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DirAbsCode } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class SuspensiveConditionsTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника отлагательные условия
   * @returns Observable<DirAbsCode[]>
   */
  public getSuspensiveConditionsTypes(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(this.baseUrl + `/suspensive-conditions-type`);
  }
}
