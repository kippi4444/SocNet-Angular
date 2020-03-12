import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable()
export class AddUserGuard implements CanActivate {
  isAuth: boolean;
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.isAuth = !!localStorage.getItem('accessToken');
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}

