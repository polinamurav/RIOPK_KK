import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { GoodsDto, ResponseEntity, GoodsFrontDto } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class GoodsControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение списка товаров
   * @returns Observable<GoodsDto[]>
   */
  public getAllGoods(): Observable<GoodsDto[]> {
    return this.http.get<GoodsDto[]>(this.path + `/goods`);
  }

  /**
   * Получение списка товаров по applicationId и applicantId
   * @returns Observable<GoodsDto[]>
   */
  public getByApplicationAndApplicant(
    applicationId: string | number,
    applicantId: string | number
  ): Observable<GoodsDto[]> {
    return this.http.get<GoodsDto[]>(this.path + `/goods/${applicationId}/${applicantId}`);
  }

  /**
   * Добавление товара в список
   * @returns Observable<ResponseEntity>
   */
  public createGood(data: GoodsFrontDto): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(this.path + `/goods`, data);
  }

  /**
   * Обновление товара
   * @returns Observable<ResponseEntity>
   */
  public updateGood(data: GoodsFrontDto): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(this.path + `/goods/update`, data);
  }
}
