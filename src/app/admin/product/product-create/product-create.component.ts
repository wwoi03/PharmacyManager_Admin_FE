import { Component, ViewChild } from "@angular/core";
import { CreateProductRequest } from "../../../models/requests/product/create-product-request";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { ProductService } from "../../../services/product/product.service";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "ngx-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent {
  // config ngx-tiny-mce
  config = {
    height: 500,
    // menubar: false,
    // plugins: [
    //   'advlist autolink lists link image charmap print preview anchor',
    //   'searchreplace visualblocks code fullscreen',
    //   'insertdatetime media table paste code help wordcount'
    // ],
    // toolbar:
    //   'undo redo | formatselect | bold italic backcolor | \
    //   alignleft aligncenter alignright alignjustify | \
    //   bullist numlist outdent indent | removeformat | help'
  };

  // Variable
  codeCategory: string;
  categoryName: string;
  showCategoryNameField = false;
  createProductRequest: CreateProductRequest = new CreateProductRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild("productForm") productForm: NgForm;
  validationNotify: ValidationNotify;

  // Constructor
  constructor(
    private productService: ProductService,
    private toast: Toast,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  // InitData
  ngOnInit(): void {
    this.validationMessages = this.createProductRequest.validationMessages;
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.productForm
    );
  }

  handleEditorKeyup(content: any) {
    console.log('Editor content:', content);
  }

  // Xử lý thêm nhân viên
  createProduct() {
    console.log(this.createProductRequest);
    // Valid
    if (this.productForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();

    // Call API Create Staff
    this.productService.create(this.createProductRequest).subscribe((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.successToast("Thành công", res.message);
          //this.router.navigate(['/admin/shipment/shipment-list']);
        }, 1000);
      } else if (res.code >= 400 && res.code < 500) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.warningToast("Thất bại", res.validationNotify.message);
          this.validationNotify.formErrors[res.validationNotify.obj] =
            res.validationNotify.message;
        }, 1000);
      }
    });
  }

  // Xử lý sự kiện khi nhập nhà cung cấp
  onInputCategoryFinish(event: any) {
    // this.codeSupplier = event.target.value;

    // if (this.codeSupplier === "" || this.codeSupplier === null) {
    //   this.showSupplierNameField = false;
    // }

    // this.supplierService
    //   .getSupplierByCode(this.codeSupplier)
    //   .subscribe((res) => {
    //     if (res.code === 200) {
    //       this.supplierName = res.obj.name;
    //       this.createProductRequest.supplierId = res.obj.id;
    //       this.validationNotify.formErrors["codeSupplier"] = null;
    //       this.showSupplierNameField = true;
    //     } else if (res.code === 409) {
    //       this.createProductRequest.supplierId = null;
    //       this.validationNotify.formErrors["codeSupplier"] =
    //         "Nhà cung cấp không tồn tại.";
    //       this.showSupplierNameField = false;
    //     }
    //   });
  }
}
