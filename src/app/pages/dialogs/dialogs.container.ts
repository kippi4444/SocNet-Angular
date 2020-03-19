import {Component,  OnInit} from '@angular/core';
import {Dialog} from '../../interfaces/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AddDialog, DelDialog, GetLoginUserDialogs} from '../../store/actions/user.actions';
import {addDialog, allDialogs} from '../../store/selectors/user.selector';
import {Friend} from '../../interfaces/friend';
import {allFriends} from '../../store/selectors/friendship.selector';
import {GetAllFriends} from '../../store/actions/friendship.actions';

@Component({
  selector: 'app-dialogs-container',
  template: `<app-dialogs-component
          [dialogs]="dialogs$ | async"
          [friendList]="friendList$ | async"
          (allDialogs)="getAllDialogs()"
          (delThatDialog)="delDialog($event)"
          (createDialog)="createNewDialog($event)"
          (toDialog)="goToDialog($event)"></app-dialogs-component>`,
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsContainerComponent implements OnInit {
  id: string = localStorage.getItem('user');
  login: string = localStorage.getItem('login');
  dialogs$: Observable<Dialog[]> = this.store.select(allDialogs);
  friendList$: Observable<Friend[]> = this.store.select(allFriends);
  activeDialog: string;
  sub = [];

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getAllDialogs();
    this.store.dispatch(new GetAllFriends(this.login));
  }

  getAllDialogs() {
    this.store.dispatch(new GetLoginUserDialogs());
  }

  goToDialog(dialog: Dialog) {
    this.activeDialog = dialog._id;
    this.router
      .navigate([`/dialogs/${dialog._id}`]);
  }

  delDialog(id: string) {
    this.store.dispatch(new DelDialog(id));
  }

  createNewDialog(users: {title: string, person: []}) {
    const body = {title: users.title, person: [...users.person, this.id]};
    this.store.dispatch(new AddDialog(body));
    this.sub.push(this.store.select(addDialog).subscribe( value => {
      if (value) {
        this.router
          .navigate([`/dialogs/${value._id}`]);
      }
    }));
  }
}
