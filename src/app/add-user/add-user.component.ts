import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
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
  changePass = true;
  file: File = null;
  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userToken =  localStorage.getItem('accessToken');
    // this.userToken = this.userService.getAuthUser() || null;
    this.form = new FormGroup({
      email: new FormControl(this.userToken ? this.userPerson.email : '', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
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
    });
  }


  addUser() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.form.reset();
      this.userService.add(formData);
    }
  }



  update() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.userService.update(formData);
      this.info = `${this.form.value.name}, you account was updated`;
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('filedata', this.file, this.file.name);
    this.userService.setAvatar(formData);
  }
}
