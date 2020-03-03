import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {SearchService} from '../../services/search.service';
import {FriendService} from '../../services/friend.service';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DialogService} from '../../services/dialog.service';
import { Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {stateAuth} from '../../store/selectors/user.selector';
import {GetAllUsers, SearchingUsers} from '../../store/actions/extraForUser.actions';
import {allUsers} from '../../store/selectors/extraForUser.selector';
import {AddFriend, DelFriend, DelRequest} from '../../store/actions/friendship.actions';



@Component({
  selector: 'app-dashboard',
  template: `
      <app-dashboard-component
              [users]="users$ | async"
              [isAuth]="isAuth$ | async"
              [myId]="id"
              [myReqFrnd]="myReqAndFriends$ | async"
              (addingFriend)="addFriend($event)"
              (delMyRequest)="delRequest($event)"
              (delettingFriend)="delFriend($event)"
              (changeView)="changeViewUsers($event)"
      ></app-dashboard-component>`  ,
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  users$: Observable<User[]> = this.store.select(allUsers);
  sub = [];
  id: string = localStorage.getItem('user');
  myReqAndFriends$: Observable<any> = this.store.select(state => state.friendship);
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  constructor(private userService: UserService,
              private searchService: SearchService,
              private friendService: FriendService,
              private dialogService: DialogService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.search();
  }

  getUsers(query?): void {
    this.store.dispatch(new GetAllUsers(query));
  }

  search() {
    const input = fromEvent(document.querySelector('#searching'), 'input');
    input.pipe(
      debounceTime( 400),
      map(event => event.target.value),
      distinctUntilChanged(),
    )
      .subscribe(value => {
        this.store.dispatch(new SearchingUsers(value));
      });

  }

  addFriend(obj) {
    this.store.dispatch(new AddFriend({friend: obj.id , owner: obj.friend}));
  }


  delFriend(exFriend) {
    this.store.dispatch(new DelFriend(exFriend));
  }

  delRequest(reqObj) {
    let reqId;
    reqObj.requests.forEach( f => {
      if (f.friend === reqObj.id) {
        reqId = f._id;
      }
    });
    this.store.dispatch(new DelRequest(reqId));

  }


  changeViewUsers(query: object) {
    this.getUsers(query);
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
  }



}


