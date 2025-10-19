import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { AddressDirsRqDto, AddressDirsRsDto } from '@app/_models/api-models/address-dirs-dto';

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

  // Возвращает списки справочных значений адреса в зависимости от выбранных значений

  public getAddressDirs(data: AddressDirsRqDto): Observable<AddressDirsRsDto> {
    return this.http.post<AddressDirsRsDto>(`${this.baseUrl}/address/dir`, data);
  }
}
