import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { DirHash } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class DirHashControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение информации о состоянии справочников
   * @returns Observable<ProgressBar[]>
   */
  public getDirHash(): Observable<DirHash[]> {
    return this.http.get<DirHash[]>(`${this.baseUrl}/dir-hash`);
  }
}
