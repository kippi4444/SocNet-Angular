import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
// import {User} from '../user';
// import {UserService} from '../user.service';

export class UserDetailGuard implements CanActivate {
  accessToken: string;

  // private userService: UserService;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    this.accessToken =  localStorage.getItem('accessToken') || null;

    if (!!this.accessToken) {
      return true;
    } else {
      return  false;
    }

  }
}
