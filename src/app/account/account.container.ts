import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-container',
  template: '<app-account [userPerson] = "(this.userPerson | async)" (getThisUser)="getThisPerson()" > </app-account>',
  styleUrls: ['./account.component.scss']
})

export class AccountContainerComponent {

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }
  private userPerson: Observable<User[]>;

  getThisPerson() {
    // this.userPerson = this.userService.getMe();
    const id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : localStorage.getItem('user');
    this.userPerson = this.userService.getUser(id);
  }

}
