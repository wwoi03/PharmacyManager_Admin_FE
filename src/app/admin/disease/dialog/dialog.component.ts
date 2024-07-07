import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<DialogComponent>) {}

  confirm() {
    this.confirmCallback();
    this.ref.close();
  }
  confirmCallback() {
    throw new Error('Method not implemented.');
  }

  cancel() {
    this.rejectCallback();
    this.ref.close();
  }
  rejectCallback() {
    throw new Error('Method not implemented.');
  }
}
