import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';
import {User} from '../../interfaces/user';
import {DialogService} from '../../services/dialog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {AddFriend, DelFriend, DelRequest, GetAllFriends, GetAllRequests} from '../../store/actions/friendship.actions';
import {allFriends, allRequests} from '../../store/selectors/friendship.selector';
import {AddDialog} from '../../store/actions/user.actions';
import {addDialog} from '../../store/selectors/user.selector';
import {SendNotification} from '../../store/actions/message.actions';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {
  friends: Friend[];
  requests: Friend[];
  sub = [];
  id: string = localStorage.getItem('user');
  userLogin: string = localStorage.getItem('login');
  login: string;

  routeMyFriends: boolean;
  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeMyFriends = this.router.url.indexOf('friends') === 1;
    this.sub.push(this.route.paramMap.subscribe((params: ParamMap) => {
      this.login = params.get('id');
      this.getAllFriends(this.login);
      if (this.login === this.userLogin && this.routeMyFriends) {
        this.getAllRequests();
      }
    }));

  }

  getAllFriends(login: string) {
    this.store.dispatch(new GetAllFriends(login));
    this.sub.push(this.store.select(allFriends).subscribe(friends => {
      this.friends = this.routeMyFriends ? friends : friends.slice(0 , 4);
    }));
  }

  getAllRequests() {
    this.store.dispatch(new GetAllRequests());
    this.sub.push(this.store.select(allRequests).subscribe(req => {
        this.requests = req;
    }));
  }

  addFriend(id: string) {
    this.store.dispatch(new SendNotification({event: 'newFriend', mes: {id: id}}));
    this.store.dispatch(new AddFriend({friend: this.id , owner: id}));
  }

  delReq(id: string) {
    this.store.dispatch(new DelRequest(id));
  }

  delFriend(id: string) {
    this.store.dispatch(new SendNotification({event: 'delFriend', mes: {id: id}}));
    this.store.dispatch(new DelFriend(id));
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
        this.router
          .navigate([`/dialogs/${value._id}`], { queryParams: {to: user.login}});
      }
    }));
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
    this.sub = [];
  }
}
