import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { CreateProductRequest } from "../../../models/requests/product/create-product-request";
import { ValidationNotify } from "../../../helpers/validation-notify";
import { ProductService } from "../../../services/product/product.service";
import { Toast } from "../../../helpers/toast";
import { LoadingService } from "../../../helpers/loading-service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UploadFileService } from "../../../services/upload-file/upload-file.service";
import { CategoryService } from "../../../services/category/category.service";
import { SelectCategoryResponse } from "../../../models/responses/category/select-category-response";
import { SelectIngredientResponse } from "../../../models/responses/ingredient/select-ingredient-response";
import { IngredientService } from "../../../services/ingredient/ingredient.service";
import { SelectDiseaseResponse } from "../../../models/responses/disease/select-disease-response";
import { DiseaseService } from "../../../services/disease/disease.service";
import { SupportService } from "../../../services/support/support.service";
import { SelectSupportResponse } from "../../../models/responses/support/select-support-response";
import { UpdateProductRequest } from "../../../models/requests/product/update-product-request";

@Component({
  selector: "ngx-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
})
export class ProductEditComponent {
  // Variable
  productId: string;
  @Input() newProductId: string;
  @Output() actionTriggered = new EventEmitter<any>(); // Định nghĩa sự kiện
  
  createProductRequest: CreateProductRequest = new CreateProductRequest();
  updateProductRequest: UpdateProductRequest = new UpdateProductRequest();
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  images: string[] = [];
  imagesFile: File[] = [];
  categories: SelectCategoryResponse[] = [];
  ingredients: SelectIngredientResponse[] = [];
  diseases: SelectDiseaseResponse[] = [];
  supports: SelectSupportResponse[] = [];


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
    private route: ActivatedRoute,
    private uploadFileService: UploadFileService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private diseaseService: DiseaseService,
    private supportService: SupportService,
  ) {
    
  }

  // InitData
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];

      this.loadProduct();
      this.validationMessages = this.updateProductRequest.validationMessages;

      this.loadCategories();
      this.loadIngredients();
      this.loadDiseases();
      this.loadSupports();
    });
  }

  // After Init Data
  ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(
      this.formErrors,
      this.validationMessages,
      this.productForm
    );
  }

  // Kích hoạt sự kiện để thông báo cho component cha
  triggerAction(): void {
    this.actionTriggered.emit(this.newProductId);
  }

  // load product
  loadProduct() {
    this.productService.details(this.productId).subscribe(
      (res) => {
        if (res.code === 200) {
          this.updateProductRequest = res.obj;
        }
      }
    )
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

  // load ingredient
  loadIngredients() {
    this.ingredientService.getIngredientSelect().subscribe(
      (res) => {
        if (res.code === 200) {
          this.ingredients = res.obj;
        }
      }
    )
  }

  // load disease
  loadDiseases() {
    this.diseaseService.getDiseaseSelect().subscribe(
      (res) => {
        if (res.code === 200) {
          this.diseases = res.obj;
        }
      }
    )
  }

  // load support
  loadSupports() {
    this.supportService.getSupportSelect().subscribe(
      (res) => {
        if (res.code === 200) {
          this.supports = res.obj;
        }
      }
    )
  }

  // Xử lý thêm nhân viên
  async updateProduct() {
    // Valid
    if (this.productForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors = this.validationNotify.formErrors;
      return;
    }

    this.loadingService.show();

    await this.uploadImages();

    // Call API Create Staff
    this.productService.update(this.updateProductRequest).subscribe((res) => {
      if (res.code === 200) {
        setTimeout(() => {
          this.loadingService.hide();
          this.toast.successToast("Thành công", res.message);
          this.newProductId = res.obj;
          this.triggerAction();
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
            } else {
              this.createProductRequest.images.push(res.obj);
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

  removeImageCurrent(index: number): void {
    this.updateProductRequest.images.splice(index, 1);
  }

  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.codeCategory.toString().includes(term);
  }

  customSearchIngredient(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.codeIngredient.toString().includes(term);
  }

  customSearchDisease(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.codeDisease.toString().includes(term);
  }

  customSearchSupport(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.codeSupport.toString().includes(term);
  }

  toggleDisabled() {
		const ingredient: any = this.ingredients[1];
		ingredient.disabled = !ingredient.disabled;
	}

  toggleDisabledDisease() {
		const disease: any = this.diseases[1];
		disease.disabled = !disease.disabled;
	}

  toggleDisabledSupport() {
		const support: any = this.supports[1];
		support.disabled = !support.disabled;
	}

  loadImage(image: string) {
    return this.uploadFileService.loadImage(image);
  }
}
