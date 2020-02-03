import {Component} from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {User} from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  accessToken: string;
  title = 'Tour of Heroes';
  checkAuth$: Observable<User[]>;
  constructor(private userService: UserService) { }


  getRegUser() {
    this.accessToken = localStorage.getItem('accessToken');
    if (this.accessToken) {
      this.checkAuth$ = this.userService.getMe();
    }

  }
}
