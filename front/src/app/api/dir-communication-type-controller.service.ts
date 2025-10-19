import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  Dir,
  PageDTO,
  PaginationAndSortingDto,
  ResponseEntity,
  transformOptions,
  TransformQueryParams,
  UploadOptions
} from '@app/_models';
import { HttpClient } from '@angular/common/http';
import {
  Communication,
  CommunicationGetDto,
  CommunicationPostDto,
  DirCommunicationMethod
} from '@app/_models/api-models/communication-get-dto';

@Injectable({ providedIn: 'root' })
export class DirCommunicationTypeControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение полного списка данных
   * @returns Observable of Dir
   */
  public getList(): Observable<Dir[]> {
    return this.http.get<Dir[]>(`${this.baseUrl}/communication-type`);
  }

  /**
   * Добавление файла
   * @param data Файл и информация о нём
   * @returns Observable of <Dir>
   */
  public create(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/communication-type`, data);
  }

  /**
   * получение справочника по id
   * @param id: number
   * @returns Observable of Dir
   */
  public getById(id: number): Observable<Dir> {
    return this.http.get<Dir>(`${this.baseUrl}/communication-type/${id}`);
  }

  /**
   * деактивация справочника по id
   * @param id: number
   * @returns Observable<ResponseEntity>
   */
  public deactivate(id: number): Observable<ResponseEntity> {
    return this.http.get<ResponseEntity>(`${this.baseUrl}/communication-type/deactivate/${id}`);
  }

  /**
   * Скачивание
   * @returns Observable of Blob
   */
  public download(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/communication-type/download`, { responseType: 'blob' });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<Dir>
   */
  public getByPage(param: PaginationAndSortingDto): Observable<PageDTO<Dir>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<Dir>>(`${this.baseUrl}/communication-type/page`, { params });
  }

  /**
   * Обновление
   * @param data: Dir
   * @returns Observable<Dir>
   */
  public update(data: Dir): Observable<Dir> {
    return this.http.post<Dir>(`${this.baseUrl}/communication-type/update`, {
      ...data
    });
  }

  /**
   * @param options Параметры для POST запроса
   * @returns Observable of ResponseEntity
   */
  public upload(options: UploadOptions): Observable<ResponseEntity> {
    const params = transformOptions(options);
    return this.http.post<ResponseEntity>(`${this.baseUrl}/communication-type/upload`, params);
  }

  // communication
  // Получение связей с банком по методу связи
  public getCommunication(applicationId: number, dirCommunicationMethodId: number): Observable<CommunicationGetDto> {
    const params: TransformQueryParams = new TransformQueryParams({ applicationId, dirCommunicationMethodId });
    return this.http.get<CommunicationGetDto>(`${this.baseUrl}/communication`, { params });
  }

  // Получение связей с банком по текущей заявке
  public getCommunicationByAppId(applicationId: number): Observable<Communication[]> {
    return this.http.get<Communication[]>(`${this.baseUrl}/communication/${applicationId}`);
  }

  // Сохранение связей с банком по текущей заявке
  public saveCommunication(data: CommunicationPostDto): Observable<CommunicationPostDto> {
    return this.http.post<CommunicationPostDto>(`${this.baseUrl}/communication/save`, data);
  }

  // Получение списка из справочника методов связи
  public getCommunicationMethods(): Observable<DirCommunicationMethod[]> {
    return this.http.get<DirCommunicationMethod[]>(`${this.baseUrl}/communication-method`);
  }

  // Получение списка из справочника принадлежности методов связи
  public getCommunicationMethodsOwner(): Observable<DirCommunicationMethod[]> {
    return this.http.get<DirCommunicationMethod[]>(`${this.baseUrl}/communication-method-owner`);
  }
}
