import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {stateAuth} from '../../store/selectors/user.selector';
import {DeleteUser} from '../../store/actions/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  @Input()
  userPerson: User;
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  state: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  getUpdUser: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  myId: string;
  isAuth = false;
  info: string;
  changePass = true;
  file: File = null;
  sub = [];
  showEdit = true;
  registration: boolean;
  edit: boolean;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {
    this.myId = localStorage.getItem('user');
    this.sub.push(this.store.select(stateAuth).subscribe(state => {
      this.isAuth = state;
    }));
    this.routing();
    this.form = new FormGroup({
      email: new FormControl(this.isAuth ? this.userPerson.email : '', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(7)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(7)
      ]),
      surname: new FormControl(this.isAuth ? this.userPerson.surname : '', [
        Validators.minLength(3),
        Validators.required,
      ]),
      name: new FormControl(this.isAuth ? this.userPerson.name : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      birthday: new FormControl(this.isAuth ? this.userPerson.birthday : '', [
        Validators.required,
        Validators.minLength(8)
      ]),
      login: new FormControl(this.isAuth ? this.userPerson.login : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      number: new FormControl(this.isAuth ? this.userPerson.number : '', [
        Validators.minLength(12),
        Validators.pattern('^(375|\\+375|80)(?:\\s(44|29|25|33)\\s|\\((44|29|25|33)\\)|(44|29|25|33))[1-9]{1}([0-9]{6}|[0-9]{2}-[0-9]{2}-[0-9]{2})$')
      ]),
    }, [this.checkPasswords]);
  }

  routing() {
    this.route.queryParams
      .subscribe(params => {
        this.route.url.subscribe(next => {
        this.determinePage(next[0].path, params);
      });
    });
  }

  determinePage(path: string, params) {
    const setParams = path === 'login' ? this.registration = params.registration : this.edit = params.edit;
    if (setParams) {
      this.state.emit(true);
      return;
    } else {
      this.edit = false;
      this.registration = false;
      this.state.emit(false);
      return;
    }
  }

  deleteUser(user: User) {
    this.store.dispatch(new DeleteUser(user.login));
  }

  checkPageSend() {
    if (this.isAuth && this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.info = `${this.form.value.name}, запрос на изменения Ваших данных отправлен!`;
    } else {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    }
  }

  showPage() {
    return this.isAuth
  }

  accountChecker() {
    return (this.myId === this.userPerson._id);
  }

  updateUser() {
    this.getUpdUser.emit();
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
  }

}
