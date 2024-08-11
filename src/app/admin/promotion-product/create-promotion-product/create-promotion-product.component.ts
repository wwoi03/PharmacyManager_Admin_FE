import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProductPromotionRequest, PromotionProgramRequest } from '../../../models/requests/promotion/promotion-create-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';
import { Util } from '../../../helpers/util';
import { ProductService } from '../../../services/product/product.service';
import { ListProductResponse } from '../../../models/responses/product/list-product-response';
import { ResponseApi } from '../../../models/response-apis/response-api';

@Component({
  selector: 'ngx-create-promotion-product',
  templateUrl: './create-promotion-product.component.html',
  styleUrls: ['./create-promotion-product.component.scss'],
  animations: [
    trigger('pageAnimation', [
      state('void', style({ transform: 'translateY(-50%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({transform: 'translateY(-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CreatePromotionProductComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tạo biến sản phẩm giảm giá
  @Output() createProduct = new EventEmitter<any>(); 

  //Tạo biến sản phẩm giảm giá
  createPromotionProduct: {
    products: { id: string; productName: string; codeProduct: string }[] ,
    additionalInfo: string;
    quantity: number;
    promotionProgramRequest?: PromotionProgramRequest[] | null;
  } = {
    products: [], 
    additionalInfo: '',
    quantity: 0,
    promotionProgramRequest: null,
  };

  validationMessages = {
    quantity: {
      required: 'Số lượng khuyến mãi là bắt buộc',
      min: 'Số lượng phải lớn hơn hoặc bằng 1',
    },
    additionalInfo:{
      required: 'Thông tin khuyễn mãi là bắt buộc',
    }
  };

  //program
  promotionProgram: boolean = false;

  //product
  listProductId: any;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  @ViewChild('promotionProductForm') promotionForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    // private promotionService: PromotionService,
    private productService: ProductService,
    private themeService: NbThemeService,
    private toast: Toast,
    private router: Router,
  ) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.productService.getProducts().subscribe((data: ResponseApi<ListProductResponse[]>)=>{
      if(data.code === 200){
        this.listProductId = data.obj.map(product => ({
          id: product.id,
          codeProduct: product.codeMedicine,
          productName: product.productName
        }));
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
    });
  }

  showValidationErrors() {
    // Đánh dấu tất cả các trường trong form là "touched" để hiển thị lỗi
    Object.keys(this.promotionForm.controls).forEach(field => {
      const control = this.promotionForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.promotionForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thêm 
  create() {
    // Valid
    if (this.promotionForm.invalid) {
      this.showValidationErrors();
      return;
    }


    this.createProduct.emit(this.createPromotionProduct);
    
  }
  

  back(){
    
  }

  openPromotion(event: Event){
    event.preventDefault();
    this.promotionProgram= !this.promotionProgram;
  }

  handlePrograms(promotionRequests: PromotionProgramRequest[]) {
    this.createPromotionProduct.promotionProgramRequest = promotionRequests;
  }


}
