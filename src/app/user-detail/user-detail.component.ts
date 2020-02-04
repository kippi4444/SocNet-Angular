import {Component,  Input, OnInit} from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  @Input() user: User;
  person: Observable<User[]>;

  constructor(  private route: ActivatedRoute,
                private userService: UserService,
                private location: Location) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.person = this.userService.getUser(id);

  }

  goBack(): void {
    this.location.back();
  }


}
