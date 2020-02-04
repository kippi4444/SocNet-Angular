import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  accessToken: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    if (this.accessToken) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
