import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Pet} from '../../interfaces/pet';
import {PetService} from '../../services/pet.service';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';



@Component({
  selector: 'app-account-container',
  template: `<app-account
          [userPerson] = "(userPerson$ | async)"
          (updAvatar)="changeAvata($event)"
          (getThisUser)="getThisPerson()"
          (changeProfile)="updateThisPerson($event)"
          (delPet)="delPet($event)"
          (delMyRequest)="delReq($event)"
          (delMyFriend)="delFriend($event)"
          (addFriends)="addFriend($event)">
  </app-account>`,
  styleUrls: ['./account.component.scss']
})

export class AccountContainerComponent implements OnDestroy {

  id: string;
  sub = [];
  private userPerson$: Observable<User>;

  constructor(private userService: UserService,
              private petService: PetService,
              private route: ActivatedRoute,
              private friendService: FriendService) { }

  getThisPerson() {
   this.sub.push(this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ;
      this.userPerson$ = this.userService.getUser(this.id);
    }));

  }

  updateThisPerson(updatedUser: User) {
    this.userService.update(updatedUser);
  }


  delPet(pet: Pet) {
    this.petService.delPet(pet._id);
  }

  changeAvata(file: any) {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    this.userService.setAvatar(formData);
  }


  ngOnDestroy(): void {
    this.sub.forEach(el => {el.unsubscribe()});
  }

  addFriend(body: Friend) {

    this.sub.push( this.friendService.addFriend(body).subscribe(next =>{
      this.getThisPerson();
    }));
  }

  delFriend(id: string) {
    this.sub.push(this.friendService.delFriend(id).subscribe(next =>{

    }));
  }

  delReq(id){
    this.sub.push(this.friendService.delReq(id).subscribe(next =>{
      this.getThisPerson();
    }));
  }
}
