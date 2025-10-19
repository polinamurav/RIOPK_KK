import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OPZFacadeGetDto, OPZFacadePostDto } from '@app/_models/api-models/opzfacade-get-dto';

@Injectable({
  providedIn: 'root'
})
export class BorrowerControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /** Получить список opz
   *
   * @param applicationId: id приложения
   * @returns Observable of  OPZFacadeGetDto
   */
  public getOpz(applicationId: string): Observable<OPZFacadeGetDto> {
    return this.http.get<OPZFacadeGetDto>(this.baseUrl + `/opz/${applicationId}`);
  }

  public setOpz(data: OPZFacadePostDto): Observable<OPZFacadePostDto> {
    return this.http.post<OPZFacadePostDto>(this.baseUrl + `/opz`, data);
  }
}
