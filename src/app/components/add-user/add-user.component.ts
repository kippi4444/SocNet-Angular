import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input()
  userPerson: User;
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  userToken: string;
  isAuth = false;
  info: string;
  changePass = true;
  file: File = null;

  constructor(private authService: AuthService) { }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
    this.authService.isAuth.subscribe(state => { this.isAuth = state});
    this.userToken = localStorage.getItem('accessToken');
    this.form = new FormGroup({
      email: new FormControl(this.userToken ? this.userPerson.email : '', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(3)
      ]),
      surname:  new FormControl(this.userToken ? this.userPerson.surname : '', [
        Validators.minLength(3)
      ]),
      name:  new FormControl(this.userToken ? this.userPerson.name : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      birthday:  new FormControl(this.userToken ? this.userPerson.birthday : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      login:  new FormControl(this.userToken ? this.userPerson.login : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      number:  new FormControl(this.userToken ? this.userPerson.number : '', [
        Validators.minLength(3)
      ]),
   }, [this.checkPasswords]);
  }

  checkPageSend() {
    if (this.isAuth && this.userToken && this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.info = `${this.form.value.name}, Ваш профиль был успешно обновлен!`;
    } else {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    }
  }

  showPage() {
    return !!(this.isAuth && this.userToken);
  }

}
