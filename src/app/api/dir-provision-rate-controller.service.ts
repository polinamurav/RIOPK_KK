import {Injectable} from "@angular/core";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dir} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class DirProvisionRateControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Получение списка
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/provision-rate`);
  }
}
