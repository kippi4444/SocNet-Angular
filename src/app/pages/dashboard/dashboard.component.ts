import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {SearchService} from '../../services/search.service';
import {FriendService} from '../../services/friend.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DialogService} from '../../services/dialog.service';
import { Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  @Output() searching: EventEmitter<void> = new EventEmitter<void>();
  @Output() allUsers: EventEmitter<void> = new EventEmitter<void>();
  @Output() addNewFriend: EventEmitter<string> = new EventEmitter<string>();
  @Output() delMyFriend: EventEmitter<string> = new EventEmitter<string>();
  @Output() delMyRequest: EventEmitter<string> = new EventEmitter<string>();


  @Input() users: User[];
  sub = [];
  id: string;
  usr: User;
  isAuth: boolean;
  constructor(private userService: UserService,
              private searchService: SearchService,
              private friendService: FriendService,
              private dialogService: DialogService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.sub.push(this.authService.isAuth.subscribe(state => { this.isAuth = state;}));
    this.id = this.userService.id;
    this.getUsers();
    this.search();
  }

  getUsers(): void {
    this.sub.push( this.userService.getUsers().subscribe(value => {this.users = value;
                                                                   this.usr = this.userService.user;}));
  }

  search() {
    const input = fromEvent(document.querySelector('#searching'), 'input');

    this.sub.push( input.pipe(
      debounceTime( 400),
      map(event => event.target.value),
      distinctUntilChanged(),
    )
      .subscribe(value => {
        this.sub.push(this.searchService.search(value).subscribe(next => this.users = next));
      }));
  }

  itFriend(friends) {
    if (!friends) {
      return;
    }
    let state;
    friends.forEach( f => {
      if (f.friend === this.id) {
        state = true;
      }
    });
    return state;
  }


  addFriend(friend) {
    this.sub.push(this.friendService.addFriend({friend: this.id , owner: friend}).subscribe(next =>{
      this.getUsers();
    } ));
  }


  delFriend(exFriend) {
    this.sub.push(this.friendService.delFriend(exFriend).subscribe(next =>{
      this.getUsers();
    } ));
  }

  delRequest(requests) {
    let reqId;
    requests.forEach( f => {
      if (f.friend === this.id){
        reqId = f._id;
      }
    });
    this.sub.push(this.friendService.delReq(reqId).subscribe(next =>{
      this.getUsers();
    } ));
  }

  goToDialog(user: User) {
    const body = { person: [
        {id: user._id},
        {id: this.id}
      ]
    };
    this.sub.push(this.dialogService.addDialog(body).subscribe(value => {
      this.router
        .navigate([`/dialogs/${value._id}`], { queryParams: {to: user.login}});
    }));
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
  }


}




