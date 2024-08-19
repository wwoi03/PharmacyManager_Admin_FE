import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { PromotionService } from '../../../services/promotion/promotion.service';

@Component({
  selector: 'ngx-delete-promotion-product',
  templateUrl: './delete-promotion-product.component.html',
  styleUrls: ['./delete-promotion-product.component.scss']
})
export class DeletePromotionProductComponent {
  product: any;

  constructor(
    protected ref: NbDialogRef<DeletePromotionProductComponent>,
    private promotionService: PromotionService,
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
