import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-delete-promotion',
  templateUrl: './delete-promotion.component.html',
  styleUrls: ['./delete-promotion.component.scss']
})
export class DeletePromotionComponent {
  promotion: any;

  constructor(
    protected ref: NbDialogRef<DeletePromotionComponent>,
    private promotionService: PromotionService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    
    this.promotionService.delete(this.promotion.id).subscribe(
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
