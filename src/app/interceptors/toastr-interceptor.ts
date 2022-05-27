import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/toast.service';
import { CredentialsService } from '@app/services/authentication';

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService: ToastService,
    private credentialsService: CredentialsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (_event: HttpEvent<any>) => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log('error', (error as HttpErrorResponse).status);
            switch ((error as HttpErrorResponse).status) {
              case 400:
                const url = this.router.url;

                if (url !== '/login' && url.indexOf('directories') === -1) {
                  this.toastService.viewMsg('ErrorMessage.InvalidRequest', 'error');
                } else if (url.indexOf('directories') !== -1) {
                  this.toastService.viewMsg(error.error.message, 'error');
                }
                break;

              case 401:
                if (!this.credentialsService.isAuthenticated()) {
                  this.toastService.viewMsg('Ошибка авторизации', 'error');
                }
                break;

              case 403:
                this.toastService.viewMsg('Ошибка авторизации', 'error');
                this.router.navigate(['/login']);
                break;

              case 404:
                if (this.router.url !== '/login') {
                  this.toastService.viewMsg('Не найдено', 'error');
                }
                break;

              case 412:
                // TODO возможно есть более элегантное решение
                // чтобы не переделывать структуру сервисов по получению печатных форм в Blob
                this.toastService.viewMsg('Необходимо настроить подписантов для филиала заявки', 'warning');
                break;

              case 500:
                this.toastService.viewMsg('ErrorMessage.ServiceUnavailable', 'error');
                break;

              default:
                this.toastService.viewMsg('ErrorMessage.Error', 'error');
                break;
            }
          }
        }
      )
    );
  }
}
