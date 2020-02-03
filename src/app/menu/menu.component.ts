import { Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, DoCheck {
  @Input() isAuth: User[];
  @Output() checkReg: EventEmitter<void> = new EventEmitter<void>();
  accessToken: string;
  constructor() { }

  ngOnInit() {

    // this.checkReg.emit();
  }

  ngDoCheck() {
    this.accessToken =  localStorage.getItem('accessToken') || null;
    // this.checkReg.emit();
  }

}
