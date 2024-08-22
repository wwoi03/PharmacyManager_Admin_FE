import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { NbDialogRef } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { UtilMoney } from '../../../helpers/util-money';
import { ListProductResponse } from '../../../models/responses/product/list-product-response';

@Component({
  selector: 'ngx-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {
  product: any;

  constructor(
    private productService: ProductService,
    protected ref: NbDialogRef<ProductDeleteComponent>,
    private toast: Toast,
    private utilMoney: UtilMoney,
  ) {

  }

  onSubmitDelete() {
    this.productService.delete(this.product.id).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.ref.close(true);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.validationNotify.message);
        }
      },
    )
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
