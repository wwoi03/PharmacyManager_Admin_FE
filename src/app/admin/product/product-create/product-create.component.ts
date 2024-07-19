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
import { SelectCategoryResponse } from "../../../models/responses/category/select-category-response";

@Component({
  selector: "ngx-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent {
  // Variable
  createProductRequest: CreateProductRequest = new CreateProductRequest();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  images: string[] = [];
  imagesFile: File[] = [];
  categories: SelectCategoryResponse[] = [];

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
    this.loadCategories();
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.productForm
    );
  }

  // load category
  loadCategories() {
    this.categoryService.getCategoriesSelect().subscribe(
      (res) => {
        if (res.code === 200) {
          this.categories = res.obj;
        }
      }
    )
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
    } catch (error) {
      console.error('Có lỗi xảy ra khi tải lên ảnh:', error);
    }
  }

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagesFile.push(file);

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

  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.codeCategory.toString().includes(term);
  }
}
