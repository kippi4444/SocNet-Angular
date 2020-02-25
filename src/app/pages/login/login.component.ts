import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  loginEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  regEvent: EventEmitter<User> = new EventEmitter<User>();

  @Input()
  user: User;

  link: string;
  form: FormGroup;
  state: boolean;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  login() {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.loginEvent.emit(loginData);
      this.form.reset();
    }
  }

  reg(user: User) {
    this.regEvent.emit(user);
  }

  changeState(state: boolean) {
    this.state = state;
  }
}


