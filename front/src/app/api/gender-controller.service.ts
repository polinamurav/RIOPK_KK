import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { DirAbsCode } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class GenderController {
  private path = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника полов
   * @returns Observable<CreatedUpdatedParam>
   */
  public getAll(): Observable<DirAbsCode[]> {
    return this.http.get<DirAbsCode[]>(this.path + `/genders`);
  }
}
