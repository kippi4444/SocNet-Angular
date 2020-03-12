import {Component, EventEmitter, Input,  OnInit, Output} from '@angular/core';
import {Dialog} from '../../interfaces/dialog';
import {dialogMes, DialogService} from '../../services/dialog.service';
import {FriendService} from '../../services/friend.service';

import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectedDialog} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-dialogs-component',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  @Output() allDialogs: EventEmitter<void> = new EventEmitter<void>();
  @Output() toDialog: EventEmitter<Dialog> = new EventEmitter<Dialog>();
  @Output() delThatDialog: EventEmitter<string> = new EventEmitter<string>();

  @Input() dialogs: Dialog[];
  activeDialog: string;
  sub = [];

  constructor(private dialogService: DialogService,
              private friendService: FriendService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.activeDialog = this.route.snapshot.children.length > 0 ?  this.route.snapshot.children[0].params.id : '';
    this.getAllDialogs();
  }

  getAllDialogs() {
    this.allDialogs.emit();
  }

  goToDialog(dialog: Dialog) {
    this.activeDialog = dialog._id;
    this.toDialog.emit(dialog);
  }

  delDialog(id: string) {
   this.goBack();
   this.delThatDialog.emit(id);
  }

  goBack() {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {}});
  }
}
