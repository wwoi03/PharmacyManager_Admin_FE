import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-delete-promotion-program',
  templateUrl: './delete-promotion-program.component.html',
  styleUrls: ['./delete-promotion-program.component.scss']
})
export class DeletePromotionProgramComponent {
  program: any;

  constructor(
    protected ref: NbDialogRef<DeletePromotionProgramComponent>,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    this.ref.close(true);
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
