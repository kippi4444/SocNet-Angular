import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {authentificatedUser, stateAuth} from '../store/selectors/user.selector';

@Injectable()
export class LoginGuard implements CanActivate {
  isAuth: boolean;
  login: string;
  result: boolean;
  constructor(private router: Router,
              private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.select(stateAuth).subscribe(status => {
      this.isAuth = status;
      this.login = localStorage.getItem('login');
      if (this.isAuth) {
        this.router.navigate(['/users/' + this.login]);
        this.result = false;
      } else {
        this.result = true;
      }
    });

    return this.result;
  }
}

