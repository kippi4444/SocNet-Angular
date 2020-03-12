import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {SearchService} from '../../services/search.service';
import {FriendService} from '../../services/friend.service';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DialogService} from '../../services/dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {stateAuth} from '../../store/selectors/user.selector';
import {SearchingUsers} from '../../store/actions/extraForUser.actions';
import {allUsers} from '../../store/selectors/extraForUser.selector';
import {AddFriend, DelFriend, DelRequest} from '../../store/actions/friendship.actions';
import {QuerySearch} from '../../interfaces/querySearch';
import {SendNotification} from '../../store/actions/message.actions';




@Component({
  selector: 'app-dashboard',
  template: `<app-dashboard-component
              [users]="users$ | async"
              [isAuth]="isAuth$ | async"
              [myId]="id"
              [next]="next"
              [prev]="prev"
              [query]="query"
              [myReqFrnd]="myReqAndFriends$ | async"
              (addingFriend)="addFriend($event)"
              (delMyRequest)="delRequest($event)"
              (delettingFriend)="delFriend($event)"
      ></app-dashboard-component>`  ,
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  users$: Observable<User[]> = this.store.select(allUsers);
  sub = [];
  query: QuerySearch;
  id: string = localStorage.getItem('user');
  myReqAndFriends$: Observable<any> = this.store.select(state => state.friendship);
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  next = true;
  prev: boolean;
  constructor(private userService: UserService,
              private searchService: SearchService,
              private friendService: FriendService,
              private dialogService: DialogService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(value => value.params)).subscribe( query => {
      this.query = JSON.parse(JSON.stringify(query));
      this.searchDispatch();
    });
    this.search();
  }

  search() {
    const input = fromEvent(document.querySelector('#searching'), 'input');
    this.sub.push(input.pipe(
      debounceTime( 400),
      map(event => event.target.value),
      distinctUntilChanged(),
    )
      .subscribe(value => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: value,
          },
        });
        this.query.search = value;
        this.searchDispatch();
      }));
  }

  searchDispatch() {
    this.query.search = this.query.search ? this.query.search : '';
    this.store.dispatch(new SearchingUsers(this.query));
  }

  addFriend(obj) {
    this.store.dispatch(new SendNotification({event: 'addFriend', mes: {id: obj.friend}}));
    this.store.dispatch(new AddFriend({friend: obj.id , owner: obj.friend}));
  }

  delFriend(exFriend) {
    this.store.dispatch(new SendNotification({event: 'delFriend', mes: {id: exFriend}}));
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

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
  }



}


