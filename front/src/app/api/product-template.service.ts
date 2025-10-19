import { Injectable } from '@angular/core';
import { DirCommonService } from '@app/api/massegment-api/dir-common.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DirPatternDto } from '@app/_models/api-models/dir-pattern-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService extends DirCommonService<DirPatternDto> {
  constructor(public http: HttpClient) {
    super('pattern', http);
  }

  public download(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/${this.path}/download`, { responseType: 'blob', observe: 'response' });
  }
}
