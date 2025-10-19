import { Injectable } from '@angular/core';
import { DirCommonService } from '@app/api/massegment-api/dir-common.service';
import { DirCompetenceLevel } from '@app/_models/api-models/dir-competence-level';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DirLevelsPmService extends DirCommonService<DirCompetenceLevel> {
  constructor(public http: HttpClient) {
    super('competence-level', http);
  }
}
