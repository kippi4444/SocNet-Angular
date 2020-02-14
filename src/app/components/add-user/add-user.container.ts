import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {AuthService} from '../../services/auth.service';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-add-user-container',
  template: `<app-add-user (submitForm)="checkPageSend($event)"></app-add-user>`,
  styleUrls: ['./add-user.component.scss']
})
export class AddUserContainerComponent implements OnInit {
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();
  userToken: string;
  isAuth: boolean;
  form: FormGroup;
  info: string;
  userPerson: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  checkPageSend(user: User) {
    if (this.isAuth && this.userToken ) {
      this.submitForm.emit(user);
    } else {
      this.userService.add(user);
    }
  }

}
