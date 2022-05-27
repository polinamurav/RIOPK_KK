import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AddressControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * @param applicationId applicationId для GET запроса
   * @returns Observable of boolean
   */
  public getByApplicationId(applicationId: number | string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/address/coincidence?applicationId=${applicationId}`);
  }
}
