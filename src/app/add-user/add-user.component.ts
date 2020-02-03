import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input()
  userPerson: User;
  form: FormGroup;
  userToken: string;
  info: string;
  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userToken =  localStorage.getItem('accessToken') || null;
    // this.userToken = this.userService.getAuthUser() || null;
    this.form = new FormGroup({
      email: new FormControl(this.userToken ? this.userPerson.email : '', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl(this.userToken ? this.userPerson.password : '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname:  new FormControl(this.userToken ? this.userPerson.surname : '', [
        Validators.minLength(3)
      ]),
      name:  new FormControl(this.userToken ? this.userPerson.name : '', [
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
      avatar:  new FormControl(this.userToken ? this.userPerson.avatar : '', []),
    });
  }


  addUser() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.form.reset();
      this.userService.add(formData);
    }
  }

  delete(user: User) {
    this.userService.del(user.login);
    this.userService.logout();
  }

  update() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.form.reset();
      this.userService.update(formData);
      this.info = 'User Updated';
    }
  }
}
