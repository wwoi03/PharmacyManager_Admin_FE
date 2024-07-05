import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { CategoryService } from "../../../services/category/category.service";
import { Toast } from "../../../helpers/toast";
import { UpdateCategoryRequest } from "../../../models/requests/category/update-category-request";
import { ListCategoryResponse } from "../../../models/responses/category/list-category-response";
import { DetailsCategoryResponse } from "../../../models/responses/category/details-category-response";

@Component({
  selector: "ngx-category-create",
  templateUrl: "./category-edit.component.html",
  styleUrls: ["./category-edit.component.scss"],
})
export class CategoryEditComponent {
  // Variable
  showParentCategoryField: boolean = false;
  parentCategoryCode: string;
  parentCategoryName: string;
  updateCategoryRequest: UpdateCategoryRequest = new UpdateCategoryRequest();
  categoryId: string;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("categoryForm") categoryForm: NgForm;
  validationNotify: ValidationNotify;

  constructor(
    protected ref: NbDialogRef<CategoryEditComponent>,
    private categoryService: CategoryService,
    private toast: Toast
  ) {}

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.updateCategoryRequest.validationMessages;
    this.loadCategoryDetails();
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.categoryForm);
  }

  // Load Category Details
  loadCategoryDetails() {
    this.categoryService.details(this.categoryId).subscribe((res) => {
      if (res.code === 200) {
        const detailsCategoryResponse: DetailsCategoryResponse = res.obj;
        this.mapDetailsToUpdateCategory(detailsCategoryResponse);
      }
    });
  }

  // Map
  mapDetailsToUpdateCategory(detailsCategoryResponse: DetailsCategoryResponse) {
    this.updateCategoryRequest.id = detailsCategoryResponse.id;
    this.updateCategoryRequest.name = detailsCategoryResponse.categoryName;
    this.updateCategoryRequest.codeCategory = detailsCategoryResponse.codeCategory;
    this.updateCategoryRequest.parentCategoryId = detailsCategoryResponse.parentCategoryId;

    if (detailsCategoryResponse.parentCategoryCode != null) {
      this.parentCategoryCode = detailsCategoryResponse.parentCategoryCode;
      this.parentCategoryName = detailsCategoryResponse.parentCategoryName;
      this.showParentCategoryField = true;
    }
  }

  // Update
  updateCategory() {
    console.log(this.updateCategoryRequest)
    // Valid
    if (this.categoryForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    // Update
    this.categoryService.update(this.updateCategoryRequest).subscribe((res) => {
      if (res.code === 200) {
        this.toast.successToast("Thành công", res.message);
        this.ref.close(true);
      } else if (res.code >= 400 && res.code < 500) {
        this.toast.warningToast("Thất bại", res.validationNotify.message);
        this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
      }
    });
  }

  // Xử lý khi nhấn xong code category
  onInputCategoryParentFinish(event: any): void {
    this.parentCategoryCode = event.target.value;

    if (this.parentCategoryCode === "" || this.parentCategoryCode === null) {
      this.validationNotify.formErrors["parentCategoryId"] = null;
      this.showParentCategoryField = false;
    }

    this.categoryService
      .getCategoryByCode(this.parentCategoryCode)
      .subscribe((res) => {
        if (res.code === 200) {
          this.parentCategoryName = res.obj.name;
          this.updateCategoryRequest.parentCategoryId = res.obj.id;
          this.validationNotify.formErrors["parentCategoryId"] = null;
          this.showParentCategoryField = true;
        } else if (res.code === 409) {
          this.updateCategoryRequest.parentCategoryId = null;
          this.validationNotify.formErrors["parentCategoryId"] = "Loại sản phẩm không tồn tại.";
          this.showParentCategoryField = false;
        } 
      });
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }
}
