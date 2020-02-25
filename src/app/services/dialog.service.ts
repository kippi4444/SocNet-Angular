import { Injectable } from '@angular/core';
import {Album} from '../interfaces/album';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Dialog} from '../interfaces/dialog';
import {Msg} from '../interfaces/msg';


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
    return this.http.post<Dialog>(this.dialogsUrl, body);
  }

  getDialog(id: string) {
    return this.http.get<Dialog>(this.dialogsUrl + id).pipe(map(value => { return value }));
  }

  getMessages(dialogId: string) {
    return this.http.get<Msg[]>(this.dialogsUrl + 'mes/' + dialogId);
  }
}
