import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { stateAuth} from '../store/selectors/user.selector';
import {AppState} from '../store/state/app.state';
import {Store} from '@ngrx/store';

@Injectable()
export class AddUserGuard implements CanActivate {
  isAuth: boolean;
  isAuth2: boolean;
  constructor(private router: Router,
              private store: Store<AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.select(stateAuth).subscribe(status => this.isAuth = status );
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}

