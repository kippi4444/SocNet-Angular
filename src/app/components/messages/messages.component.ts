import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../interfaces/user';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {SendMes} from '../../store/actions/message.actions';
import {getMessage} from '../../store/selectors/message.selector';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeOut} from '../../animations/fadeOut';
import {Dialog} from '../../interfaces/dialog';
import {Msg} from '../../interfaces/msg';
import {GetScrollMes} from '../../store/actions/user.actions';
import {ActivatedRoute} from '@angular/router';




@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('mesAnimation', [
      transition(':enter', [
      useAnimation(fadeOut)
        ]),
  ])]
})
export class MessagesComponent implements OnInit, OnDestroy,  AfterViewChecked {
  sub = [];
  text: string;
  @Input() msgs: Msg[];
  @Input() dialog: Dialog;
  @Input() user: User;
  @Input() count: object;
  disableScrollDown: boolean;

  @ViewChild('scrollBar', {static: false})
  scrollBar: ElementRef;
  showPersons = false;


  constructor(private  store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub.push(this.route.paramMap.subscribe(next => {
        this.disableScrollDown = false;
    }));
    this.sub.push(this.store.select(getMessage)
      .subscribe(mes => {
        if (this.msgs && mes) {
          this.msgs.push(mes);
          this.disableScrollDown = false;
        } }));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private onScroll(event) {
    if(!this.count[0]){return;}
    if (this.msgs.length < this.count[0].count && event.target.scrollTop < 15) {
      this.store.dispatch(new GetScrollMes({dialog: this.dialog._id, skip: this.msgs.length}));
    }
    const element = this.scrollBar.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;
    this.disableScrollDown = !(this.disableScrollDown && atBottom);
  }

  private scrollToBottom(): void {
    if (this.disableScrollDown) {
      return;
    }
    try {

      this.scrollBar.nativeElement.scrollTop = this.scrollBar.nativeElement.scrollHeight;
    } catch (err) { }
  }


  sendMes(msg) {
    msg = msg.replace(/^\s+|\s+$/gm, '');
    if (!msg) { return; }
    const message = {
      name: this.user.name,
      user: this.user._id,
      dialog: this.dialog,
      isReading: this.dialog.person.filter(person => person !== this.user._id),
      text: msg,
    };
    this.store.dispatch(new SendMes(message));
    this.text = '';
    this.scrollBar.nativeElement.scrollTop = this.scrollBar.nativeElement.scrollHeight;
  }


  ngOnDestroy(): void {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
  }


  keyToSend(event: KeyboardEvent) {
      if (event.shiftKey && event.key === 'Enter') {
      } else if (event.key === 'Enter') {
        this.sendMes(this.text);
      }
  }
}
