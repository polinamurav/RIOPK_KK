import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirAbsCode } from '@app/_models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DirScheduleTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(`${this.baseUrl}/schedule-type`);
  }
}
