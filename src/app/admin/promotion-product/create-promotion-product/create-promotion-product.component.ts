import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Transform } from 'stream';
import { ProductPromotionRequest } from '../../../models/requests/promotion/promotion-create-request';
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
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CreatePromotionProductComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tạo biến sản phẩm giảm giá
  createPromotionProduct: ProductPromotionRequest = new ProductPromotionRequest();


  //product
  listProductId: any;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
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
    this.validationMessages = this.createPromotionProduct.validationMessages;
    this.loadData();
  }

  loadData(){
    this.productService.getProducts().subscribe((data: ResponseApi<ListProductResponse[]>)=>{
      if(data.code === 200){
        this.listProductId = data.obj.map(product => ({
          id: product.id,
          code: product.codeMedicine,
          name: product.productName
        }));
      }
    },(error) => {
      this.toast.warningToast('Lấy thông tin thất bại', error);
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
    console.log(this.createPromotionProduct.productId);
  }
  
  addProductId(event){
    
  }

  back(){
    
  }


}
