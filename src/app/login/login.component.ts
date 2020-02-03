import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  loginEvent: EventEmitter<number> = new EventEmitter();
  @Input()
  user: User;
  logined: string = localStorage.getItem('accessToken');
  form: FormGroup;
  visible: false;
  title = 'Registration';

  constructor(private userService: UserService,
              private   router: Router) {
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

  update(user: User) {
    this.userService.update(user);
  }


}


