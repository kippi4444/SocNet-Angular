import {Component,  OnInit} from '@angular/core';
import {Dialog} from '../../interfaces/dialog';
import { Router} from '@angular/router';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {GetLoginUserDialogs} from '../../store/actions/user.actions';
import {allDialogs} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-dialogs-container',
  template: `<app-dialogs-component
          [dialogs]="dialogs$ | async"
          (allDialogs)="getAllDialogs()"
          (toDialog)="goToDialog($event)"></app-dialogs-component>`,
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsContainerComponent implements OnInit {
  id: string = localStorage.getItem('user');
  login: string = localStorage.getItem('login');
  dialogs$: Observable<Dialog[]> = this.store.select(allDialogs);
  activeDialog: string;
  sub = [];



  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.getAllDialogs();
  }

  getAllDialogs() {
    this.store.dispatch(new GetLoginUserDialogs());
  }

  goToDialog(dialog: Dialog) {
    this.activeDialog = dialog._id;
    this.router
      .navigate([`/dialogs/${dialog._id}`], { queryParams: {to: dialog.persons.login}});
  }

}
