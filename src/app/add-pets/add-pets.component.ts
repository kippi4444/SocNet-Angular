import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {PetService} from '../services/pet.service';

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.component.html',
  styleUrls: ['./add-pets.component.scss']
})
export class AddPetsComponent implements OnInit {
  private userToken: string;
  form: FormGroup;
  @Input()
  owner: User;
  show = false;
  constructor(private petServices: PetService) { }

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
      owner:  new FormControl(this.owner._id, [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }

  addPet() {
    const petData = this.form.value;
    this.form.reset();
    this.show = !this.show;
    this.petServices.addPet(petData);
  }
}
