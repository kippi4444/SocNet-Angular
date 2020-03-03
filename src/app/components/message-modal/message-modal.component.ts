import { Component, OnInit } from '@angular/core';
import {Msg} from '../../interfaces/msg';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  private showModal = false;
  private message: Msg;

  constructor() { }

  ngOnInit() {
  }

  sendMes(msg) {
    this.showModal = !this.showModal;

    this.message = {
      name: '',
      user: '',
      dialog: '',
      isReading: true,
      text: msg,
    };
  }


  closeModal() {
    this.showModal = !this.showModal;
    this.message = {
      name: '',
      user: '',
      dialog: '',
      isReading: true,
      text: '',
    };
  }

}
