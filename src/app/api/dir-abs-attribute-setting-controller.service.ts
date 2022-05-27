import {Injectable} from "@angular/core";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {
  PageDTO,
  PaginationAndSortingDto,
  TransformQueryParams
} from "@app/_models";
import {Observable} from "rxjs";
import {DirAbsAttributeSetting, DirAbsAttributeSettingDto} from "@app/_models/api-models/dir-abs-attribute-setting";

@Injectable({ providedIn: 'root' })
export class DirAbsAttributeSettingControllerService {
  private path = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<IntegrationLog>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<DirAbsAttributeSetting>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<DirAbsAttributeSetting>>(this.path + `/abs-attribute-setting/page`, { params });
  }

  /**
   * Создание справочника
   * @param data: any
   * @returns Observable<ProductDto>
   */
  public create(data: DirAbsAttributeSettingDto): Observable<DirAbsAttributeSettingDto> {
    return this.http.post<DirAbsAttributeSettingDto>(this.path + `/abs-attribute-setting`, { ...data });
  }

  /**
   * Обновление справочника
   * @returns Observable of number
   */
  public update(data: DirAbsAttributeSettingDto): Observable<number> {
    return this.http.post<number>(`${this.path}/abs-attribute-setting/update`, data);
  }
}
