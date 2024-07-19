import { Component, ElementRef, ViewChild } from "@angular/core";
import { CreateProductRequest } from "../../../models/requests/product/create-product-request";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { ProductService } from "../../../services/product/product.service";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UploadFileService } from "../../../services/upload-file/upload-file.service";

@Component({
  selector: "ngx-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent {
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

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  images: string[] = [];


  // Constructor
  constructor(
    private productService: ProductService,
    private toast: Toast,
    private loadingService: LoadingService,
    private router: Router,
    private uploadFileService: UploadFileService
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
    console.log("Editor content:", content);
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.uploadFileService.saveFile(file).subscribe(
        (res) => {
          if (res.code === 200) {
            this.toast.successToast("Thành công", res.message);
          } else {
            this.toast.warningToast("Thất bại", res.message);
          }
        }
      )
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
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
