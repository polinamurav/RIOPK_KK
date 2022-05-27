import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  VerificationEmployment, VerificationEmploymentDto,
} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class VerificationEmploymentControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Сохранение
   * @param param Параметры для POST запроса
   * @returns Observable of VerificationEmploymentDto
   */
  public update(company: VerificationEmploymentDto): Observable<VerificationEmployment> {
    return this.http.post<VerificationEmployment>(`${this.path}/verification-employment`, company);
  }

}
