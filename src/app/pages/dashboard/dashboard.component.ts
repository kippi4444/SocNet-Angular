import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import { fromEvent } from 'rxjs';
import {SearchService} from '../../services/search.service';
import {debounceTime, delay, filter, map, takeUntil, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: Observable<User[]>;
  sub: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.getUsers();
    this.search();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();

  }


  search() {
    const input = fromEvent(document.querySelector('#searching'), 'change');

    this.sub = input.pipe(
        delay( 300),
        map(event => event.target.value)
      )
        .subscribe(value => {
          this.users = this.searchService.search(value);
        });
    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}


