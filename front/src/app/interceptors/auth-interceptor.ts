import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { CredentialsService } from '@app/services/authentication';
import { AuthenticationRestController } from '@app/api/authentication-rest-controller.service';
import { Fingerprint2Service } from '@app/services/fingerprint2.service';
import { AuthResponseDto } from '@app/_models';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private authenticationRestController: AuthenticationRestController,
    private fingerprint2Service: Fingerprint2Service
  ) {}

  addAccessToken(request: HttpRequest<any>) {
    const accessToken = this.credentialsService.authInfo ? this.credentialsService.authInfo.access_token : '';

    if (!accessToken) {
      return request;
    }

    return request.clone({
      setHeaders: { Authorization: 'Bearer ' + accessToken }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq: HttpRequest<any>;
    const startUriPosition = req.url.lastIndexOf('/') + 1;
    const queryParams = req.url.lastIndexOf('?');
    const finishUri = req.url.length;
    const action = req.url.substring(startUriPosition, queryParams === -1 ? finishUri : queryParams);

    switch (action) {
      case 'token':
        cloneReq = req.clone({
          setHeaders: { Authorization: 'Basic ' + btoa('browser:secret') }
        });
        break;
      case 'auth':
        cloneReq = req;
        break;
      case 'refresh':
        cloneReq = req;
        break;
      default:
        cloneReq = this.addAccessToken(req);
        break;
    }

    return next.handle(cloneReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((error as HttpErrorResponse).status) {
            case 401:
              const refreshTokenId = this.credentialsService.authInfo
                ? this.credentialsService.authInfo.refresh_token
                : null;

              if (this.refreshTokenInProgress) {
                return this.refreshTokenSubject.pipe(
                  filter(res => res !== null),
                  take(1),
                  switchMap(() => next.handle(this.addAccessToken(cloneReq)))
                );
              } else if (!!refreshTokenId) {
                this.refreshTokenInProgress = true;
                this.refreshTokenSubject.next(null);

                return this.authenticationRestController.refreshToken(refreshTokenId).pipe(
                  switchMap((authInfo: AuthResponseDto) => {
                    this.credentialsService.setAuthInfo(authInfo);
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(authInfo.access_token);

                    return next.handle(this.addAccessToken(cloneReq));
                  })
                );
              } else {
                if (req.url.indexOf('grant_type=password') === -1) {
                  this.router.navigate(['/login']);
                }

                return next.handle(cloneReq);
              }

            case 400:
              if (req.url.indexOf('grant_type=refresh_token') !== -1) {
                this.refreshTokenInProgress = false;
                this.router.navigate(['/login']);
              }
              return next.handle(cloneReq);

            // default:
            //   return next.handle(cloneReq);
            default:
              throw error;
          }
        } else {
          return next.handle(error);
        }
      })
    );
  }
}
