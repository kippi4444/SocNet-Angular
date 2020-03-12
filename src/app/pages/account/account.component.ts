import {Component,  EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {Pet} from '../../interfaces/pet';
import {Friend} from '../../interfaces/friend';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  @Output() getThisUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() changeProfile: EventEmitter<User> = new EventEmitter<User>();
  @Output() delPet: EventEmitter<Pet> = new EventEmitter<Pet>();
  @Output() updAvatar: EventEmitter<object> = new EventEmitter<object>();
  @Output() addFriends: EventEmitter<Friend> = new EventEmitter<Friend>();
  @Output() delMyFriend: EventEmitter<string> = new EventEmitter<string>();
  @Output() delMyRequest: EventEmitter<string> = new EventEmitter<string>();
  @Output() goDialog: EventEmitter<any> = new EventEmitter<any>();

  @Input() userPerson: User;
  @Input() isAuth: boolean;
  @Input() myId: string;

  url: 'http://localhost:8000/';
  show = false;
  file: object;
  sub = [];
  edit: boolean;

  private newAvatar: string | ArrayBuffer;
  private preview: string | ArrayBuffer;
  private showModal = false;
  constructor()  {}

  ngOnInit() {
    this.getThisUser.emit();
  }


  deletePet(pet: Pet) {
    this.userPerson.pets = this.userPerson.pets.filter(pets  => pets.name !== pet.name);
    this.delPet.emit(pet);
  }

  changeUser(updateUser: User) {
    this.changeProfile.emit(updateUser);
  }

  onFileChange(event) {
    const reader  = new FileReader();
    this.file = event.target.files[0];
    reader.readAsDataURL( this.file as Blob);
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

    return (this.myId === this.userPerson._id);
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  changeState(state: boolean) {
    this.edit = state;
  }

  addFriend(id: string) {
    const body   = {
      friend: this.myId ,
      owner: id
    };
    this.addFriends.emit(body);
  }

  itFriend(friends) {
    let state = false;
    if (friends < 1) {
      return  state;
    }
    friends.forEach( f => {
      if (f.friend === this.myId) {
        state = true;
      }
    });
    return state;
  }

  delFriend(id: string) {
    this.userPerson.friends = [];
    this.delMyFriend.emit(id);
  }

  delRequest(requests) {
    let reqId;
    requests.forEach( f => {
      if (f.friend === this.myId) {
        reqId = f._id;
      }
    });
    this.delMyRequest.emit(reqId);
  }

  goToDialog(user: User) {
    this.goDialog.emit(user);
  }
}
