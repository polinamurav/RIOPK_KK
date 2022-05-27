import {
  AttachmentType,
  ClientInitDto,
  PageDTO,
  PaginationAndSortingDto,
  ResponseCommonDto,
  TransformQueryParams
} from '@app/_models';
import { Client, ClientDto, ClientPagedInfoDto } from './../_models/api-models/client';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransformToHttpParams } from '@app/_models/app-models/transform-to-http-params';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Клиент Направить далее
   * @returns Observable of number
   */
  public complete(clientId: number): Observable<number> {
    const params = new TransformToHttpParams({ clientId });
    return this.http.get<number>(`${this.baseUrl}/client/complete`, { params });
  }

  /**
   * Клиент обновить
   * @returns Observable of number
   */
  public update(clientDto: ClientDto): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/client/update`, clientDto);
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для пагинации
   * @param filterParams Параметры для фильтрации
   * @param type string тип Очереди
   * @returns Observable of PageDTO<Client>>
   */
  public getClients(param: PaginationAndSortingDto, type: string): Observable<PageDTO<ClientPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);

    return this.http.get<PageDTO<ClientPagedInfoDto>>(`${this.baseUrl}/client/queue/${type}`, { params });
  }

  /**
   * Получение списка типов прикрепленных документов
   * @returns Observable of AttachmentType[]
   */
  public getAttachmentTypes(clientId: number): Observable<AttachmentType[]> {
    const params = new TransformToHttpParams({ clientId });
    return this.http.get<AttachmentType[]>(`${this.baseUrl}/client/attachmentTypes`, { params });
  }

  /**
   * Запрос информации по клиенту
   */
  public init(clientInit: ClientInitDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/client/init`, clientInit);
  }

  /**
   * Получение выбранной страницы с данными клиента на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<DirProductGroup>
   */
  public getByPage(value: string): Observable<PageDTO<ClientPagedInfoDto>> {
    return this.http.get<PageDTO<ClientPagedInfoDto>>(`${this.baseUrl}/client/page`, {
      params: { value }
    });
  }

  /**
   * Запрос клиента по id
   */
  public getById(clientId: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/client/${clientId}`);
  }

  /**
   * Перезапуск
   */
  public repeat(clientId: number): Observable<ResponseCommonDto> {
    const params: TransformQueryParams = new TransformQueryParams({ clientId });
    return this.http.post<ResponseCommonDto>(`${this.baseUrl}/client/repeat`, {}, { params });
  }
}
