import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent implements OnInit{
  accessToken: string;

  constructor(private userService: UserService,
              private router: Router) { }
  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    if (this.accessToken){
      this.userService.getAuthUser();
    }
  }


}
