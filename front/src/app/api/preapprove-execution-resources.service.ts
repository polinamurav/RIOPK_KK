import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { PreapproveExecutionDto } from '@app/_models/api-models/preapprove-execution-dto';

@Injectable({
  providedIn: 'root'
})
export class PreapproveExecutionResourcesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPreapproveExecutionList() {
    return this.http.get<PreapproveExecutionDto[]>(`${this.baseUrl}/preapprove-execution`);
  }

  executionStop() {
    return this.http.post(`${this.baseUrl}/preapprove-execution/stop`, null);
  }
}
