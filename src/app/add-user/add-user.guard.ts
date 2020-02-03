import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
// import {UserService} from '../user.service';
// import {User} from '../user';

export class AddUserGuard implements CanActivate {accessToken: string;
  // private userServices: UserService;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    this.accessToken =  localStorage.getItem('accessToken') || null;
    if (!!this.accessToken) {
      return true;
    } else {
      return false;
    }

  }
}

