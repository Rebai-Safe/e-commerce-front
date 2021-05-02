import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import{catchError} from 'rxjs/operators'
import { AuthService } from './auth.service';

//needs custom injection
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private router:Router,private authService:AuthService) { }
 
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
           if([401,403].indexOf(error.status) !== -1)
           this.authService.logout();
           else if (error.status === 404){
             this.router.navigate(['/notFoundRessource',error.status],{
               queryParams : {
                 "ERROR.Status": error.status
               }
             })
           }
           else {
            this.router.navigate(['/applicationError',error.status],{
              queryParams : {
                "ERROR.Status": error.status
              }
            })
          }
         
          const err=error.message || error.statusText;
          return throwError(err);



      })
          
    )
  }
}
