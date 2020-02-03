import {Component, OnInit, Output} from '@angular/core';
import { UserService } from '../user.service';
import {User} from '../user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
   this.users = this.userService.getUsers();
  }

}
