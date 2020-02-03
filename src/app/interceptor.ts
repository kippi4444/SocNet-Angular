import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken: string;
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken =  localStorage.getItem('accessToken') || null;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken)
    });

    return next.handle(authReq);
  }
}
