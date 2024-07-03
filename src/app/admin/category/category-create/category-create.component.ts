import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { CreateCategoryRequest } from '../../../models/requests/category/create-category-request';
import { CategoryService } from '../../../services/category/category.service';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent {
  // Variable
  showParentCategoryField: boolean = false; 
  parentCategoryCode: string;
  parentCategoryName: string;
  createCategoryRequest: CreateCategoryRequest = new CreateCategoryRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('categoryForm') categoryForm: NgForm;
  validationNotify: ValidationNotify;

  constructor(
    protected ref: NbDialogRef<CategoryCreateComponent>,
    private categoryService: CategoryService,
    private toast: Toast
  ) {}

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.createCategoryRequest.validationMessages
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.categoryForm);
  }

  // Create
  createCategory() {
    // Valid
    if (this.categoryForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Create
    this.categoryService.create(this.createCategoryRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
        } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
        }
      },
      (err) => {
        this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
      }
    )
  }

  // Hàm để chuyển đổi trạng thái hiển thị
  toggleParentCategoryField() {
    this.showParentCategoryField = !this.showParentCategoryField;
  }

  // Xử lý khi nhấn xong code category
  onInputCategoryParentFinish(event: any): void {
    this.parentCategoryCode = event.target.value;

    if (this.parentCategoryCode === "" || this.parentCategoryCode === null) {
      this.validationNotify.formErrors['parentCategoryId'] = null;
    }

    this.categoryService.getCategoryByCode(this.parentCategoryCode).subscribe(
      (res) => {
        if (res.code === 200) {
          this.parentCategoryName = res.obj.name;
          this.createCategoryRequest.parentCategoryId = res.obj.id;
          this.validationNotify.formErrors['parentCategoryId'] = null;
          this.showParentCategoryField = true;
        } else if (res.code === 409) {
          this.createCategoryRequest.parentCategoryId = null;
          this.validationNotify.formErrors['parentCategoryId'] = "Loại sản phẩm không tồn tại.";
          this.showParentCategoryField = false;
        } else if (res.code === 500) {
          this.toast.dangerToast("Lỗi hệ thống", res.message);
          this.showParentCategoryField = false;
        }
      },
      (err) => {

      }
    )
  }

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
