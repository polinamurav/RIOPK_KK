import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { CommentDto } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatManagerVerificatorControllerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Получение комментариев
   * @returns Observable of CommentDto
   */
  public getAllByApplicationId(applicationId: string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${this.baseUrl}/chat-manager-verificator`, { params: { applicationId } });
  }

  /**
   * Отправка комментария
   * @returns Observable of CommentDto
   */
  public save(comment: CommentDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(`${this.baseUrl}/chat-manager-verificator`, comment);
  }

  public triggerChatUpdate() {
    return this.http.get(`/websocket/chat`);
  }
}
