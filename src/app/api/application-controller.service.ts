import {
  Application,
  ApplicationByPinDto,
  ApplicationDto,
  ApplicationPagedInfoDto,
  IFilteredParams,
  InsideInfoDto,
  ListCompareApplicationsDto,
  PageDTO,
  PaginationAndSortingDto,
  ResignDto,
  ScoringResponseDto,
  TransformQueryParams
} from '@app/_models';
import {
  BRMS1ResponseDto,
  BRMS2ResponseDto,
  BRMS3ResponseDto,
  BRMS4ResponseDto,
  BRMSResponse
} from '@app/_models/api-models/brms';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {TransformToHttpParams} from "@app/_models/app-models/transform-to-http-params";

@Injectable({ providedIn: 'root' })
export class ApplicationControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса по пагинации и сортировке
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getAll(param: PaginationAndSortingDto): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/page`, { params });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getDashboard(
    param: PaginationAndSortingDto,
    filterParams: IFilteredParams
  ): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.post<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/dashboard`, filterParams, {
      params
    });
  }

  /**
   * Получение выбранной страницы dashboard с данными на ней
   * @param param Параметры для пагинации
   * @param filterParams Параметры для фильтрации
   * @param userId string
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getMyTasks(
    param: PaginationAndSortingDto,
    filterParams: IFilteredParams,
    userId?: string
  ): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    const filterParamsReq = new TransformQueryParams({
      ...filterParams,
      createdDate: filterParams.createdDate
        ? [
            ('0' + new Date(filterParams.createdDate).getDate()).slice(-2),
            ('0' + (new Date(filterParams.createdDate).getMonth() + 1)).slice(-2),
            new Date(filterParams.createdDate).getFullYear()
          ].join('.')
        : ''
    });

    return this.http.post<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/myTasks/`, filterParamsReq, {
      params
    });
  }

  /**
   * Назначение заявки недействительной
   * @param applicationId applicationId number | string
   */
  public declineInvalid(applicationId: number | string) {
    return this.http.post(`${this.baseUrl}/applications/${applicationId}/decline_invalid`, {});
  }

  /**
   * Ручной отказ администратром
   * @param applicationId applicationId number | string
   */
  public declineAdmin(applicationId: number | string) {
    return this.http.post(`${this.baseUrl}/applications/${applicationId}/decline_admin`, {});
  }

  /**
   * Получение BRMS
   * @param applicationId application Id
   * @returns Observable of BRMSResponse
   */
  public getBrms(applicationId: number | string): Observable<BRMSResponse> {
    return this.http.get<BRMSResponse>(`${this.baseUrl}/applications/${applicationId}/brms_phase1`);
  }

  /**
   * Получение brms1
   * @param applicationId application Id
   * @returns Observable of BRMS1ResponseDto[]
   */
  public getBrms1Response(applicationId: number | string): Observable<BRMS1ResponseDto[]> {
    return this.http.get<BRMS1ResponseDto[]>(`${this.baseUrl}/applications/${applicationId}/brms1`);
  }

  /**
   * Получение brms2
   * @param applicationId application Id
   * @returns Observable of BRMS2ResponseDto[]
   */
  public getBrms2Response(applicationId: number | string): Observable<BRMS2ResponseDto[]> {
    return this.http.get<BRMS2ResponseDto[]>(`${this.baseUrl}/applications/${applicationId}/brms2`);
  }

  /**
   * Получение brms3
   * @param applicationId application Id
   * @returns Observable of BRMS3ResponseDto[]
   */
  public getBrms3Response(applicationId: number | string): Observable<BRMS3ResponseDto[]> {
    return this.http.get<BRMS3ResponseDto[]>(`${this.baseUrl}/applications/${applicationId}/brms3`);
  }

  /**
   * Получение brms4
   * @param applicationId application Id
   * @returns Observable of BRMS3ResponseDto[]
   */
  public getBrms4Response(applicationId: number | string): Observable<BRMS4ResponseDto[]> {
    return this.http.get<BRMS4ResponseDto[]>(`${this.baseUrl}/applications/${applicationId}/brms4`);
  }

  /**
   * Получение Scoring
   * @param applicationId application Id
   * @returns Observable of ScoringResponseDto
   */
  public getScoringResponse(applicationId: number | string): Observable<ScoringResponseDto> {
    return this.http.get<ScoringResponseDto>(`${this.baseUrl}/applications/${applicationId}/scoring`);
  }

  /**
   *
   * @param applicationId application Id
   * @param lang
   * @returns Observable of string
   */
  public acceptApp(applicationId: string, lang: string): Observable<string> {
    const params = { applicationId, lang };

    return this.http.get<string>(`${this.baseUrl}/applications/accept_app`, { params });
  }

  // /**
  //  *
  //  * @param applicationId application Id
  //  * @returns Observable of string
  //  */
  // public isActiveTask(applicationId: string): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.baseUrl}/applications/isActiveTask`, { params: { applicationId } });
  // }

  /**
   *
   * @param applicationId application Id
   * @returns Observable of string
   */
  public acceptSmsCode(applicantId: string, applicationId: string, smsCode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/applications/accept_sms`, {
      params: { applicantId, applicationId, smsCode }
    });
  }

  /**
   *
   * @param applicationId application Id
   * @param managerDeclineReasonCode
   * @returns Observable of string
   */
  public declineApp(applicationId: string, managerDeclineReasonCode: string = null): Observable<string> {
    const params = managerDeclineReasonCode ? { applicationId, managerDeclineReasonCode } : { applicationId };

    return this.http.get<string>(`${this.baseUrl}/applications/decline_app`, { params });
  }

  /**
   *
   * @param applicationId application Id
   * @param userId Id пользователя
   * @returns Observable of string
   */
  public startTask(applicationId: string, userId: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/applications/start_task`, { params: { applicationId, userId } });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getArchived(param: PaginationAndSortingDto): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/queue/archive`, { params });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getUserTasks(param: PaginationAndSortingDto): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/queue/userTasks`, { params });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для GET запроса
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getDeclined(param: PaginationAndSortingDto): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ApplicationPagedInfoDto>>(`${this.baseUrl}/applications/queue/decline`, { params });
  }

  /**
   * Получение выбранной страницы с данными на ней
   * @param param Параметры для пагинации
   * @param filterParams Параметры для фильтрации
   * @param type string тип Очереди
   * @returns Observable of PageDTO<ApplicationPagedInfoDto>>
   */
  public getQueue(
    param: PaginationAndSortingDto,
    filterParams: IFilteredParams,
    type: string
  ): Observable<PageDTO<ApplicationPagedInfoDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    const filterParamsReq = new TransformQueryParams({
      ...filterParams,
      createdDate: filterParams.createdDate
        ? [
            ('0' + new Date(filterParams.createdDate).getDate()).slice(-2),
            ('0' + (new Date(filterParams.createdDate).getMonth() + 1)).slice(-2),
            new Date(filterParams.createdDate).getFullYear()
          ].join('.')
        : ''
    });
    return this.http.post<PageDTO<ApplicationPagedInfoDto>>(
      `${this.baseUrl}/applications/queue/${type}`,
      filterParamsReq,
      { params }
    );
  }

  /**
   * Получение деталей страницы по id:
   * @param applicationId application Id
   * @returns Observable of InsideInfoDto
   */
  public getPreApprovedCreditInfo(applicationId: number | string): Observable<InsideInfoDto> {
    return this.http.get<InsideInfoDto>(`${this.baseUrl}/applications/insideInfo/${applicationId}`);
  }

  /**
   * Получение внутренней информации:
   * @param id id для GET запроса получению деталей страницы
   * @returns Observable of PageDTO<Application>>
   */
  public getById(id: number | string): Observable<Application> {
    return this.http.get<Application>(`${this.baseUrl}/applications/${id}`);
  }

  /**
   * Получение данных по предыдущим заявкам:
   * @param param Параметры для GET запроса
   * @param pin pin для GET запроса получению деталей страницы
   * @param applicationId applicationId для GET запроса
   * @returns Observable of PageDTO<ApplicationByPinDto>>
   */
  public getByPin(
    param: PaginationAndSortingDto,
    pin: string,
    applicationId: string | number
  ): Observable<PageDTO<ApplicationByPinDto>> {
    const params: TransformQueryParams = new TransformQueryParams(param);
    return this.http.get<PageDTO<ApplicationByPinDto>>(
      `${this.baseUrl}/applications/getByPin/${pin}/${applicationId}`,
      {
        params
      }
    );
  }

  /**
   * Получение данных по предыдущим заявкам:
   * @param applicationId applicationId для GET запроса получению деталей страницы
   * @param applicationPrevId applicationPrevId для GET запроса получению деталей страницы
   * @returns Observable of ListCompareApplicationsDto>
   */
  public compareApplications(
    applicationId: string | number,
    applicationPrevId: string | number
  ): Observable<ListCompareApplicationsDto> {
    return this.http.get<ListCompareApplicationsDto>(
      `${this.baseUrl}/applications/compare/${applicationId}/${applicationPrevId}`
    );
  }

  /**
   * Сохранение заявки на кредит
   * @returns Observable of ApplicationDto
   */
  public update(appDto: ApplicationDto): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(`${this.baseUrl}/applications/update`, appDto);
  }

  /**
   * Сохранение решения Риск-менеджера
   * @param applicationId applicationId для запроса
   * @param decisionMakerDecisionId decisionMakerDecisionId для запроса
   * @returns Observable of ApplicationDto
   */
  public setDecisionMakerDecision(
    applicationId: string | number,
    decisionMakerDecisionId: string | number
  ): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(
      `${this.baseUrl}/applications/${applicationId}/setDecisionMakerDecision/${decisionMakerDecisionId}`,
      null
    );
  }

  /**
   * Сохранение решения Акцепте
   * @param applicationId applicationId для запроса
   * @param accepterDecisionId accepterDecisionId для запроса
   * @returns Observable of ApplicationDto
   */
  public setAccepterDecision(
    applicationId: string | number,
    accepterDecisionId: string | number
  ): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(
      `${this.baseUrl}/applications/${applicationId}/setAccepterDecision/${accepterDecisionId}`,
      null
    );
  }

  /**
   * Сохранение решения СОПИОК на Оформлении документов
   * @param applicationId applicationId для запроса
   * @param paperworkDecisionId paperworkDecisionId для запроса
   * @returns Observable of ApplicationDto
   */
  public setPaperworkDecision(
    applicationId: string | number,
    paperworkDecisionId: string | number
  ): Observable<ApplicationDto> {
    return this.http.post<ApplicationDto>(
      `${this.baseUrl}/applications/${applicationId}/setPaperworkDecision/${paperworkDecisionId}`,
      null
    );
  }

  /**
   * Переназначение пользователей:
   * @param applicationId applicationId для GET запроса
   * @param newUserId newUserId для GET запроса
   * @param reassignRole reassignRole для GET запроса
   * @returns Observable of ResignDto>
   */
  public resign(
    applicationId: string | number,
    newUserId: string | number,
    reassignRole: string
  ): Observable<ResignDto> {
    return this.http.get<ResignDto>(
      `${this.baseUrl}/applications/${applicationId}/reassign/${reassignRole}/${newUserId}`
    );
  }

  /**
   * Прочтение всех существующих сообщений в чате:
   * @param applicationId applicationId для GET запроса
   * @returns Observable of any
   */
  public readAllMessageChat(applicationId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/applications/read_msg_all_chat/${applicationId}`);
  }

  /**
   * Сохранение archivePlace
   * @returns Observable of number
   */
  public updateArchive(applicationId: number, archivePlace: string, archivistComment: string) {
    return this.http.post<number>(`${this.baseUrl}/applications/update/archive`, null,
      {
        params: new TransformToHttpParams({applicationId, archivePlace, archivistComment})
      });
  }
}
