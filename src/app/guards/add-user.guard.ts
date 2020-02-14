import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AddUserGuard implements CanActivate {
  isAuth: string;
  isAuth2: boolean;
  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.isAuth = localStorage.getItem('accessToken');
    this.authService.isAuth.subscribe(state => { this.isAuth2 = state});

    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}

