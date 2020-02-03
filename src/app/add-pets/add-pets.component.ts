import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.component.html',
  styleUrls: ['./add-pets.component.scss']
})
export class AddPetsComponent implements OnInit {
  private userToken: string;
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.userToken =  localStorage.getItem('accessToken') || null;
    // this.userToken = this.userService.getAuthUser() || null;
    this.form = new FormGroup({
      name:  new FormControl( '', [
        Validators.required,
        Validators.minLength(2)
      ]),
      species:  new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }

}
