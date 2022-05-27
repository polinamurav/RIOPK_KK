import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductToSegment} from "@app/_models/api-models/product-to-segment";
import {ProductToPaymentDay} from "@app/_models/api-models/product-to-payment-day";

@Injectable({
  providedIn: 'root'
})
export class ProductToPaymentDayControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Получение ProductToSegment
   * @returns Observable<ProductToSegment[]>
   */
  public getAll(): Observable<ProductToPaymentDay[]> {
    return this.http.get<ProductToPaymentDay[]>(this.baseUrl + `/payment-day`);
  }
}
