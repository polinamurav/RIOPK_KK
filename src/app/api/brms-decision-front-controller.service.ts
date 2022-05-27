import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BRMSDto } from '@app/_models/api-models/brms';
import {ScoringResponse, TransformQueryParams} from "@app/_models";

@Injectable({ providedIn: 'root' })
export class BrmsDecisionFrontControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение всех записей
   * @returns Observable of BRMSDto[]
   */
  public getAll(): Observable<BRMSDto[]> {
    return this.http.get<BRMSDto[]>(`${this.baseUrl}/brms-decision`);
  }

  /**
   * Получение деталей по id:
   * @param id id для GET запроса
   * @returns Observable of BRMSDto
   */
  public getById(id: number | string): Observable<BRMSDto> {
    return this.http.get<BRMSDto>(`${this.baseUrl}/brms-decision/${id}`);
  }

  public getByBrms2ResponseId(id): Observable<ScoringResponse[]> {
    const params: TransformQueryParams = new TransformQueryParams(id);
    return this.http.get<ScoringResponse[]>(`${this.baseUrl}/scoring-response/brms2`, {params});
  }

  public getByBrms3ResponseId(id): Observable<ScoringResponse[]> {
    const params: TransformQueryParams = new TransformQueryParams(id);
    return this.http.get<ScoringResponse[]>(`${this.baseUrl}/scoring-response/brms3`, {params});
  }
}
