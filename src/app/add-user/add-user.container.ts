import {Component,  OnInit} from '@angular/core';
import {UserService} from '../user.service';


@Component({
  selector: 'app-add-user-container',
  template: '<app-add-user></app-add-user>',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserContainerComponent implements OnInit {
  constructor(private userService: UserService) { }
  ngOnInit() {}
}
