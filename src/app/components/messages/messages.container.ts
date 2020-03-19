import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {dialogMes} from '../../services/dialog.service';
import {User} from '../../interfaces/user';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {authentificatedUser, msgForDialog, selectedDialog} from '../../store/selectors/user.selector';
import {GetSelectedDialog} from '../../store/actions/user.actions';
import {
  DialogConnectSocket,
  DialogDisconnect,
  GetMes,
} from '../../store/actions/message.actions';
import {Msg} from '../../interfaces/msg';
import {Dialog} from '../../interfaces/dialog';


@Component({
  selector: 'app-messages-container',
  template: `<app-messages
          [msgs] = 'msgs$ | async'
          [user] = 'user$ | async'
          [dialog] = 'dialog$ | async'
  ></app-messages>`,
  styleUrls: ['./messages.component.scss']
})
export class MessagesContainerComponent implements OnInit, OnDestroy {
  sub = [];
  routing: Subscription;
  text: string;
  dialogId: string;
  user$: Observable<User> = this.store.select(authentificatedUser);
  msgs$: Observable<Msg[]> = this.store.select(msgForDialog);
  dialog$: Observable<Dialog> = this.store.select(selectedDialog);
  myId: string = localStorage.getItem('user');
  user: User;

  constructor(private  store: Store<AppState>,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe(next => {
      this.dialogId = this.route.snapshot.paramMap.get('id');
      this.store.dispatch(new DialogDisconnect());
      this.connect();
    });
  }

  connect() {
    const session = {
      dialog: this.dialogId,
      sender: this.myId,
    };
    this.sub.push(this.user$.subscribe(value => {
      if (value) {
        this.store.dispatch(new GetSelectedDialog({dialog: this.dialogId, skip: 0}));
        this.store.dispatch(new DialogConnectSocket(session));
        this.store.dispatch(new GetMes());
      }
    }));
  }


  ngOnDestroy(): void {
    this.routing.unsubscribe();
    this.store.dispatch(new DialogDisconnect());
  }

}
