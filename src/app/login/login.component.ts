import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../user';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';



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

  form: FormGroup;
  visible: false;
  title = 'Registration';
  constructor(private userService: UserService,
              private   router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAuth.subscribe(next =>  next ? this.router.navigate(['/account']) : this.router.navigate(['/login']));

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

}


