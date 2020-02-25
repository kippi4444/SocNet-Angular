import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';
import {log} from 'util';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {
  friends: Friend[];
  requests: Friend[];
  sub = [];
  id: string;
  constructor(private friendService: FriendService,
              private userService: UserService,) { }

  ngOnInit() {
    this.id = this.userService.userLogin;
    this.getAllFriends(this.id);
    this.getAllRequests();
  }

  getAllFriends(id: string) {
    this.sub.push(this.friendService.getAllFriends(id).subscribe(value => this.friends = value));
  }

  getAllRequests() {
    this.sub.push(this.friendService.getAllRequests().subscribe(value =>  {this.requests = value;}));
  }

  addFriend(id: string) {
    const user = this.userService.id;
    this.sub.push(this.friendService.addFriend({friend: user , owner: id}).subscribe(next => {
      this.getAllFriends(this.id);
      this.getAllRequests();
    }));
  }

  delReq(id: string) {
    this.sub.push(this.friendService.delReq(id).subscribe(next => {
      this.getAllRequests();
    }));
  }

  delFriend(id: string) {
    this.sub.push(this.friendService.delFriend(id).subscribe(next => {
      this.getAllFriends(this.id);
    }));
  }


  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
  }
}
