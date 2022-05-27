import { DirStage } from '@app/_models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class StageControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника этапов
   * @returns Observable of DirStage[]
   */
  public getStagesDir(): Observable<DirStage[]> {
    return this.http.get<DirStage[]>(`${this.baseUrl}/stage`);
  }
}
