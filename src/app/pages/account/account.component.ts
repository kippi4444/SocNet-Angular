import {Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';

import {Pet} from '../../interfaces/pet';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Output() getThisUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() changeProfile: EventEmitter<User> = new EventEmitter<User>();
  @Output() delUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() delPet: EventEmitter<Pet> = new EventEmitter<Pet>();
  @Output() updAvatar: EventEmitter<object> = new EventEmitter<object>();
  @Input()
  userPerson: User;
  visible = false;
  show = false;
  showEdit = true;
  myAccount: string;
  isAuth = false;
  file: object;
  private newAvatar: string | ArrayBuffer;
  private preview: string | ArrayBuffer;
  private showModal = false;
  constructor(private authService: AuthService)  {
  }

  ngOnInit() {
    this.getThisUser.emit();
    this.authService.isAuth.subscribe(state => { this.isAuth = state});
    this.authService.isId.subscribe(id => { this.myAccount = id });
    // this.myAccount = localStorage.getItem('user');
  }

  reload() {
    this.visible = !this.visible;
    this.getThisUser.emit();
  }

  deleteUser(user: User) {
    this.delUser.emit(user);
  }

  deletePet(pet: Pet) {
    // @ts-ignore
    this.userPerson.pets = this.userPerson.pets.filter( el => el.name !== pet.name);
    this.delPet.emit(pet);
  }

  changeUser(updateUser: User) {
    this.changeProfile.emit(updateUser);
  }

  onFileChange(event) {
    const reader  = new FileReader();
    this.file = event.target.files[0];
    reader.readAsDataURL( <Blob> this.file);
    reader.onloadend = () => {
      this.preview = reader.result;
    };
    event.target.value = '';
   }

  uploadAvatar() {
    this.showModal = !this.showModal;
    this.newAvatar = this.preview;
    this.updAvatar.emit(this.file);
  }

  openModal() {
    this.preview = '';
    this.showModal = !this.showModal;
  }

  accountChecker() {
    return (this.myAccount === this.userPerson._id);
  }
}
