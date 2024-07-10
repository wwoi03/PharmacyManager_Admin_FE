import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SupportService } from '../../../services/support/support.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-support-delete',
  templateUrl: './support-delete.component.html',
  styleUrls: ['./support-delete.component.scss']
})
export class SupportDeleteComponent {
  support: any;

  constructor(
    protected ref: NbDialogRef<SupportDeleteComponent>,
    private supportService: SupportService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    
    this.supportService.delete(this.support.id).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.ref.close(true);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
        }
      },
    )
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
