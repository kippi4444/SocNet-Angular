import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';
import {PetService} from '../../services/pet.service';
import {AddPet} from '../../store/actions/user.actions';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.component.html',
  styleUrls: ['./add-pets.component.scss']
})
export class AddPetsComponent implements OnInit {
  form: FormGroup;
  @Input()
  owner: User;
  show = false;
  constructor(private petServices: PetService,
              private store: Store<AppState>) { }

  ngOnInit() {
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
    this.store.dispatch(new AddPet(petData));
  }
}
