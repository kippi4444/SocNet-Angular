import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Dialog} from '../interfaces/dialog';
import {Msg} from '../interfaces/msg';

export class dialogMes {
  dialog: Dialog;
  mes: Msg[];
}



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogsUrl = 'http://localhost:8000/dialogs/';

  constructor(private http: HttpClient) { }

  getAllDialogs() {
    return this.http.get<Dialog[]>(this.dialogsUrl);
  }

  addDialog(body: object) {
    return this.http.post<Dialog>(this.dialogsUrl, body).pipe(map(value => value));
  }

  getDialog(id: string) {
    return this.http.get<Dialog>(this.dialogsUrl + id).pipe(map(value => value));
  }

  getMessages(dialogId: string) {
    return this.http.get<dialogMes>(this.dialogsUrl + 'mes/' + dialogId);
  }

  delDialog(dialogId: string) {
    return this.http.delete<string>(this.dialogsUrl + dialogId);
  }
}
