import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CreatedUpdatedParam } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AttachmentTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение справочника типов документа
   * @returns Observable of CreatedUpdatedParam>
   */
  public getAll(): Observable<CreatedUpdatedParam[]> {
    return this.http.get<CreatedUpdatedParam[]>(`${this.baseUrl}/attachmentTypes`);
  }
}
