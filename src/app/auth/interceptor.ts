import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UserAuthService} from '../services/user-auth.service';
import {Injectable} from '@angular/core';
import {LoaderService} from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private userAuthService: UserAuthService,
              private loaderService: LoaderService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();

    if (!(req.headers.get('No-Auth') === 'True')) {
      const token = this.userAuthService.getToken();
      if(token) {
        req = this.addToken(req, token);
      }
    }
    console.log("sent request from interceptor ", req);
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log('error from interceptor: ', error);
          if (error.status === 401) {
            this.userAuthService.clear();
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.router.navigate(['/forbidden']);
          }
          return throwError(error);
        }
      ),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
