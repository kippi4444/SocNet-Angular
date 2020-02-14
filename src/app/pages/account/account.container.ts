import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Pet} from '../../interfaces/pet';
import {PetService} from '../../services/pet.service';



@Component({
  selector: 'app-account-container',
  template: `<app-account
          [userPerson] = "(userPerson$ | async)"
          (updAvatar)="changeAvata($event)"
          (getThisUser)="getThisPerson()"
          (changeProfile)="updateThisPerson($event)"
          (delUser)="delUser($event)"
          (delPet)="delPet($event)">
  </app-account>`,
  styleUrls: ['./account.component.scss']
})

export class AccountContainerComponent implements OnDestroy{
  id: string;
  routing: Subscription;
  constructor(private userService: UserService,
              private petService: PetService,
              private route: ActivatedRoute) { }
  private userPerson$: Observable<User>;

  getThisPerson() {
   this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ;
      this.userPerson$ = this.userService.getUser(this.id);
    });

    // || localStorage.getItem('login')
    // const id = this.route.snapshot.paramMap.get('id') || localStorage.getItem('login');

  }

  updateThisPerson(updatedUser: User) {
    this.userService.update(updatedUser);
  }

  delUser(user: User) {
    this.userService.del(user.login);
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
    this.routing.unsubscribe();
  }
}
