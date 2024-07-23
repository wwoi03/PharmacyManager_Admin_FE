import { Component } from '@angular/core';
import { ProductDiseaseResponse } from '../../../models/responses/productDisease/productDisease-response';
import { NbDialogRef } from '@nebular/theme';
import { ProductDiseaseService } from '../../../services/productDisease/product-disease.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-delete-product-disease',
  templateUrl: './delete-product-disease.component.html',
  styleUrls: ['./delete-product-disease.component.scss']
})
export class DeleteProductDiseaseComponent {
  productDisease: ProductDiseaseResponse;
  listName: string;
  link: number;
  
  constructor(
    protected ref: NbDialogRef<DeleteProductDiseaseComponent>,
    private productDiseaseService: ProductDiseaseService,
    private toast: Toast
  ) {}

  // Delete
  delete() {
    this.productDiseaseService.getLink(this.link);

    this.productDiseaseService.delete(this.productDisease.diseaseId, this.productDisease.productId).subscribe(
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
