import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {UserService} from '../services/user.service';
import {PetService} from '../services/pet.service';
import {Pet} from '../pet';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Output() getThisUser: EventEmitter<User> = new EventEmitter<User>();
  @Input()
  userPerson: User[];
  visible = false;
  user: User;
  show = false;
  showEdit = true;
  myAccount: string;

  constructor(private userService: UserService,
              private petService: PetService) {
  }

  ngOnInit() {
    this.myAccount = localStorage.getItem('user');
    this.getThisUser.emit();
  }

  reload() {
    this.visible = !this.visible;
    this.getThisUser.emit();
  }

  LogoutUser() {
    this.userService.logout();
    this.user = null;
  }

  delete(user: User) {
    this.userService.del(user.login);
    this.userService.logout();
  }

  delPet(pet: Pet) {
    this.userPerson[0].pets = this.userPerson[0].pets.filter( el => el.name !== pet.name);
    this.petService.delPet(pet._id);
  }

  // updPet(pet: Pet) {
  //   this.showPet = !this.showPet;
  //   // this.petService.updPet(pet);
  // }
}
