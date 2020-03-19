import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Pet} from '../../interfaces/pet';
import {PetService} from '../../services/pet.service';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';
import {DialogService} from '../../services/dialog.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {addDialog,  stateAuth} from '../../store/selectors/user.selector';
import {Observable} from 'rxjs';
import {AddDialog, DeletedPet, SetAvatar, UpdatedUser} from '../../store/actions/user.actions';
import {GetSelectedUser} from '../../store/actions/extraForUser.actions';
import {selectedUser} from '../../store/selectors/extraForUser.selector';



@Component({
  selector: 'app-account-container',
  template: `<app-account
          [userPerson] = "userPerson$ | async"
          [isAuth] = "isAuth$ | async"
          [myId] = "id"
          (updAvatar)="changeAvata($event)"
          (getThisUser)="getThisPerson()"
          (changeProfile)="updateThisPerson($event)"
          (delPet)="delPet($event)"
          (delMyRequest)="delReq($event)"
          (delMyFriend)="delFriend($event)"
          (addFriends)="addFriend($event)"
          (goDialog)="goToDialog($event)">
  </app-account>`,
  styleUrls: ['./account.component.scss']
})

export class AccountContainerComponent implements OnDestroy {
  id: string = localStorage.getItem('user');
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  userPerson$: Observable<User> = this.store.select(selectedUser);
  login: string;
  sub = [];


  constructor(private userService: UserService,
              private petService: PetService,
              private route: ActivatedRoute,
              private router: Router,
              private friendService: FriendService,
              private dialogService: DialogService,
              private store: Store<AppState>) { }

  getThisPerson() {
      this.sub.push(this.route.paramMap.subscribe((params: ParamMap) => {
      this.login = params.get('id');
      this.store.dispatch(new GetSelectedUser(this.login));
    }));

  }

  updateThisPerson(updatedUser: User) {
    this.store.dispatch(new UpdatedUser(updatedUser));
  }


  delPet(pet: Pet) {
    this.store.dispatch(new DeletedPet(pet._id));
  }

  changeAvata(file: any) {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    this.store.dispatch(new SetAvatar(formData));
  }


  ngOnDestroy(): void {
    this.sub.forEach(el => {el.unsubscribe(); });
    this.sub = [];
  }

  addFriend(body: Friend) {
    this.sub.push( this.friendService.addFriend(body).subscribe(next => {
      this.getThisPerson();
    }));
  }

  delFriend(friendId: string) {
    this.sub.push(this.friendService.delFriend(friendId).subscribe(next => {

    }));
  }

  delReq(reqId: string) {
    this.sub.push(this.friendService.delReq(reqId).subscribe(next => {
      this.getThisPerson();
    }));
  }

  goToDialog(user: User) {
    const body = { person: [
        user._id,
        this.id
      ]
    };

    this.store.dispatch(new AddDialog(body));
    this.sub.push(this.store.select(addDialog).subscribe( value => {
      if (value) {
        console.log(value);
        this.router
          .navigate([`/dialogs/${value._id}`]);
        }
    }));
  }
}
