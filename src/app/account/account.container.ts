import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {User} from '../user';

@Component({
  selector: 'app-account-container',
  template: '<app-account [userPerson] = "(this.userPerson | async)" (getThisUser)="getThisPerson()" > </app-account>',
  styleUrls: ['./account.component.scss']
})

export class AccountContainerComponent {

  constructor(private userService: UserService) { }
  private userPerson: Observable<User[]>;

  getThisPerson() {
    this.userPerson = this.userService.getMe();
  }

}
