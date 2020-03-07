import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthenticationService, private router: Router) { }

  intercept(req, next) {

    const token = this._auth.getToken();
    let tokenidReq = req;
    if (token) {
      tokenidReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(tokenidReq).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/home');
        }

        return throwError(err);

      })
    );
  }
}
