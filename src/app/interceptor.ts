import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './services/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken: string;
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken =  localStorage.getItem('accessToken') || null;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken)
    });

    return next.handle(authReq);
  }
}
