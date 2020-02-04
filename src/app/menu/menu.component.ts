import { Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuth: boolean;
  accessToken: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuth.subscribe(state => { this.isAuth = state});
  }

}
