import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Friend} from '../../interfaces/friend';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  @Output() createNewDialog: EventEmitter<{title: string, person: []}> = new EventEmitter<{title: string, person: []}>();

  @Input() friendList: Friend[];
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      dialogsWithNext: new FormArray([]),
      title: new FormControl('', [
        Validators.minLength(3)
      ]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.friendList.forEach((o, i) => {
      const control = new FormControl(0); // if first item set to true, else false
      (this.form.controls.dialogsWithNext as FormArray).push(control);
    });
  }

  submit() {
    const selectedUsers = this.form.value.dialogsWithNext
      .map((v, i) => (v ? this.friendList[i].friend._id : null))
      .filter(v => v !== null);
    const title = this.form.value.title;
    if (selectedUsers.length) {
      this.createNewDialog.emit({title, person: selectedUsers});
    }
  }

}
