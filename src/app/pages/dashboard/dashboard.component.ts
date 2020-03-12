import {Component, EventEmitter, Input, Output} from '@angular/core';
import { User } from '../../interfaces/user';
import {Friend} from '../../interfaces/friend';
import {Router} from '@angular/router';
import {QuerySearch} from '../../interfaces/querySearch';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {

  @Output() allUsers: EventEmitter<void> = new EventEmitter<void>();
  @Output() addingFriend: EventEmitter<object> = new EventEmitter<object>();
  @Output() delettingFriend: EventEmitter<string> = new EventEmitter<string>();
  @Output() delMyRequest: EventEmitter<object> = new EventEmitter<object>();
  @Output() goThisDialog: EventEmitter<object> = new EventEmitter<object>();
  @Output() changeView: EventEmitter<object> = new EventEmitter<object>();
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevPage: EventEmitter<void> = new EventEmitter<void>();

  @Input() users: User[];
  @Input() myId: string;
  @Input() next: boolean;
  @Input() prev: boolean;
  @Input() isAuth: boolean;
  @Input() myReqFrnd: {requests: Friend[], friends: Friend[]};

  @Input() query: QuerySearch ;

  constructor(private router: Router) {}


  itFriend(req) {
    if (req.length < 1) {
      return false;
    }
    let state;
    req.forEach( f => {
      if (f.friend === this.myId) {
        state = true;
      }
    });
    return state;
  }

  addFriend(friend: Friend) {
    this.addingFriend.emit({friend, id: this.myId});
  }

  delFriend(exFriend) {
    this.delettingFriend.emit(exFriend);
  }

  delRequest(requests) {
   this.delMyRequest.emit({requests, id: this.myId});
  }

  go(query) {
    this.router
      .navigate([], { queryParams: {
        page: query.page ? query.page : 0,
        limit: query.limit ? query.limit : 0 ,
        sort: query.sort ? query.sort : 'name',
        start: query.start ? query.start : 1,
        search: query.search ? query.search : ''}
      });
  }
}




