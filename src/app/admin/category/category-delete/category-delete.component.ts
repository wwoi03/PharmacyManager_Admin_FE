import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CategoryService } from '../../../services/category/category.service';
import { Toast } from '../../../helpers/toast';
import { ListCategoryResponse } from '../../../models/responses/category/list-category-response';

@Component({
  selector: 'ngx-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent {
  category: any;

  constructor(
    protected ref: NbDialogRef<CategoryDeleteComponent>,
    private categoryService: CategoryService,
    private toast: Toast
  ) {}

  // Create
  deleteCategory() {
    // Create
    this.categoryService.delete(this.category.id).subscribe(
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
