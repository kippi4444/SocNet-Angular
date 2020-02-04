import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  isAuth: string;
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.isAuth = localStorage.getItem('accessToken');
    if (this.isAuth) {

      return false;
    } else {
      this.router.navigate(['/account']);
      return true;
    }
  }
}

