import { Component, ElementRef, ViewChild } from "@angular/core";
import { CreateProductRequest } from "../../../models/requests/product/create-product-request";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { ProductService } from "../../../services/product/product.service";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UploadFileService } from "../../../services/upload-file/upload-file.service";
import { CategoryService } from "../../../services/category/category.service";

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
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  images: string[] = [];
  imagesFile: File[] = [];

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
    private router: Router,
    private uploadFileService: UploadFileService,
    private categoryService: CategoryService,
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
  async createProduct() {

    // Valid
    if (this.productForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();

    // for (let i = 0; i < this.imagesFile.length; i++) {
    //   // Thêm ảnh
    //   this.uploadFileService.saveFile(this.imagesFile[i]).subscribe(
    //     (res) => {
    //       if (res.code === 200) {
    //         if (i == 0) {
    //           this.createProductRequest.image = res.obj;
    //           console.log(this.createProductRequest.image);
    //         } else {
    //           this.createProductRequest.images.push(res.obj);
    //           console.log(this.createProductRequest.images);
    //         }
    //       } else {
    //         this.toast.warningToast("Thất bại", res.message);
    //       }
    //     }
    //   )
    // }

    
    await this.uploadImages();

    console.log(this.createProductRequest);

    // Call API Create Staff
    this.productService.create(this.createProductRequest).subscribe((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.successToast("Thành công", res.message);
          this.router.navigate(['/admin/product/product-list']);
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

  async uploadImages() {
    try {
      const uploadPromises = this.imagesFile.map((file, index) => 
        this.uploadFileService.saveFile(file).toPromise().then((res) => {
          if (res.code === 200) {
            if (index === 0) {
              this.createProductRequest.image = res.obj;
              console.log(this.createProductRequest.image);
            } else {
              this.createProductRequest.images.push(res.obj);
              console.log(this.createProductRequest.images);
            }
          } else {
            this.toast.warningToast("Thất bại", res.message);
          }
        })
      );
  
      await Promise.all(uploadPromises);
  
      // Tiếp tục các bước tiếp theo sau khi tất cả ảnh đã được tải lên thành công
      console.log('Tất cả ảnh đã được tải lên thành công');
      // Tiếp tục các bước khác như tạo sản phẩm...
    } catch (error) {
      console.error('Có lỗi xảy ra khi tải lên ảnh:', error);
    }
  }

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagesFile.push(file);

      // this.uploadFileService.saveFile(file).subscribe(
      //   (res) => {
      //     if (res.code === 200) {
      //       this.toast.successToast("Thành công", res.message);
      //     } else {
      //       this.toast.warningToast("Thất bại", res.message);
      //     }
      //   }
      // )

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
    this.imagesFile.splice(index, 1);
  }

  // Xử lý sự kiện khi nhập nhà cung cấp
  onInputCategoryFinish(event: any) {
    this.codeCategory = event.target.value;

    if (this.codeCategory === "" || this.codeCategory === null) {
      this.showCategoryNameField = false;
    }

    this.categoryService.getCategoryByCode(this.codeCategory).subscribe(
      (res) => {
        if (res.code === 200) {
          this.categoryName = res.obj.name;
          this.createProductRequest.categoryId = res.obj.id;
          this.validationNotify.formErrors['codeCategory'] = null;
          this.showCategoryNameField = true;
        } else if (res.code === 409) {
          this.createProductRequest.categoryId = null;
          this.validationNotify.formErrors['codeCategory'] = "Loại sản phẩm không tồn tại.";
          this.showCategoryNameField = false;
        } 
      },
    )
  }
}
