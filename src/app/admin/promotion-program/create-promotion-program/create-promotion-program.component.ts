import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PromotionProgramRequest } from '../../../models/requests/promotion/promotion-create-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ProductService } from '../../../services/product/product.service';
import { NbDialogRef, NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { ListProductResponse } from '../../../models/responses/product/list-product-response';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ngx-create-promotion-program',
  templateUrl: './create-promotion-program.component.html',
  styleUrls: ['./create-promotion-program.component.scss'],
  animations: [
    trigger('createProgram', [
      state('void', style({ transform: 'translateY(-30%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateY(-30%)', opacity: 0 }))
      ])
    ])
  ],
  
})
export class CreatePromotionProgramComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tạo biến sản phẩm giảm giá
  createPromotionProgram: {
    products: { id: string; productName: string; codeProduct: string }[] ,
    quantity: number,
  } = {
    products: [], 
    quantity: 0   
  };

  validationMessages = {
    quantity: {
      required: 'Số lượng tặng kèm là bắt buộc',
      min: 'Số lượng phải lớn hơn hoặc bằng 1',
    },
  };


  //product
  listProductId: any;

  
  @ViewChild('promotionProgramForm') promotionForm: NgForm;

   // Constructor
   constructor(
    protected ref: NbDialogRef<CreatePromotionProgramComponent>,
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

   // After Init Data
   ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  // Xử lý thêm 
  create(): void {
    if (this.promotionForm.valid) {
      // Form hợp lệ, thực hiện thao tác và đóng dialog
      console.log(this.createPromotionProgram);
      this.ref.close(this.createPromotionProgram);
    } else {
      // Form không hợp lệ, hiển thị thông báo lỗi
      this.showValidationErrors();
    }
  }

  showValidationErrors() {
    // Đánh dấu tất cả các trường trong form là "touched" để hiển thị lỗi
    Object.keys(this.promotionForm.controls).forEach(field => {
      const control = this.promotionForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

  // Hủy
  cancel() {
    this.ref.close(false);
  }

  // Chỉ nhận số nguyên
  preventDecimal(event: KeyboardEvent) {
    if (event.key === '.' || event.key === ',' || event.key === '-') {
      event.preventDefault();
    }
  }

}
