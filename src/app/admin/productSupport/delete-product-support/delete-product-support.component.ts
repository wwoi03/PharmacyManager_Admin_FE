import { Component } from '@angular/core';
import { ProductSupportResponse } from '../../../models/responses/productSupport/productSupport-response';
import { NbDialogRef } from '@nebular/theme';
import { ProductSupportService } from '../../../services/productSupport/product-support.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-delete-product-support',
  templateUrl: './delete-product-support.component.html',
  styleUrls: ['./delete-product-support.component.scss']
})
export class DeleteProductSupportComponent {
  productSupport: ProductSupportResponse;
  listName: string;
  link: number;
  
  constructor(
    protected ref: NbDialogRef<DeleteProductSupportComponent>,
    private productSupportService: ProductSupportService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    this.productSupportService.getLink(this.link);

    this.productSupportService.delete(this.productSupport.supportId, this.productSupport.productId).subscribe(
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
