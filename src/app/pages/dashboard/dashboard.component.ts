import {Component, EventEmitter, Input, Output} from '@angular/core';
import { User } from '../../interfaces/user';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../../interfaces/friend';

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

  @Input() users: User[];
  @Input() myId: string;
  @Input() isAuth: boolean;
  @Input() myReqFrnd: {requests: Friend[], friends: Friend[]};

  constructor(private route: ActivatedRoute) {
  }


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


  changeViewUsers() {
    const query = {
      page: this.route.snapshot.queryParamMap.get('page'),
      limit: this.route.snapshot.queryParamMap.get('limit')
    };
    this.changeView.emit(query);
  }

}




