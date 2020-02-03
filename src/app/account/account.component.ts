import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Output() getThisUser: EventEmitter<User> = new EventEmitter<User>();
  @Input()
  userPerson: User;
  visible = false;
  user: User;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getThisUser.emit();
  }

  reload() {
    this.visible = !this.visible;
    this.getThisUser.emit();
  }

  LogoutUser() {
    this.userService.logout();
    this.user = null;
  }
}
