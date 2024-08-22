import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditPromotionRequest } from '../../../models/requests/promotion/promotion-edit-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../../../helpers/util';
import { PromotionProducts, PromotionResponse } from '../../../models/responses/promotion/promotion-response';

@Component({
  selector: 'ngx-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tạo biến
  editPromotion: EditPromotionRequest = new EditPromotionRequest();

  //PromotionProduct Response
  promotionProducts: PromotionProducts[] = [];

  detailsPromotion: PromotionResponse;

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('editPromotionForm') promotionForm: NgForm;
  validationNotify: ValidationNotify;

  //Discount Type 
  typeDiscount = ['PromotionMoney', 'PromotionPercent'];

  //set ngày
  min: Date;
  minEndDate: string = '';



  public static readonly typeMapping: { [key: string]: string } = {
    'PromotionMoney': 'Giảm giá tiền',
    'PromotionPercent': 'Giảm phần trăm'
  };


   // Constructor
   constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionService,
    private themeService: NbThemeService,
    private toast: Toast,
    private router: Router,
    public util: Util,
  ) {
    this.themeSubscription = this.themeService
      .getJsTheme()
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.validationMessages = this.editPromotion.validationMessages;
    this.loadData();
  }

  loadData(){
    this.min = new Date();

    //Lấy disease từ id
    this.editPromotion.id = this.route.snapshot.paramMap.get('id');

    // Gọi service để lấy thông tin chi tiết bệnh
    this.promotionService.details(this.editPromotion.id).subscribe(
      (response) => {
        if (response.code === 200){
          this.detailsPromotion = response.obj;

          this.editPromotion.name = this.detailsPromotion.name;
          this.editPromotion.description = this.detailsPromotion.description;
          
          this.editPromotion.discountType = this.detailsPromotion.discountType;
          this.editPromotion.discountValue = this.detailsPromotion.discountValue;
          this.editPromotion.codePromotion = this.detailsPromotion.codePromotion;

          

          // Mapping dữ liệu từ ProductPromotionResponse sang PromotionProducts
          this.promotionProducts = this.detailsPromotion.productPromotions.map(product => ({
              products: [{
                  id: product.productId,               // Gán productId
                  productName: product.productName,    // Gán productName
                  codeProduct: product.codeProduct     // Gán codeProduct
              }],
              additionalInfo: product.additionalInfo,  // Gán additionalInfo tương ứng
              quantity: product.quantity,              // Gán quantity tương ứng
              promotionProgramRequest: product.promotionPrograms.map(program => ({
                  productId: [program.productId],  // Đảm bảo rằng productId được bọc trong một mảng string[]
                  quantity: program.quantity
              })),
          }));

          this.editPromotion.startDate = this.formatDateToISO(this.detailsPromotion.startDate);
          this.editPromotion.endDate = this.formatDateToISO(this.detailsPromotion.endDate);
          
          console.log(this.editPromotion);

        } else {
          this.toast.warningToast('Lấy thông tin thất bại', response.message);
        }
      },
      (error) => {
        this.toast.warningToast('Lấy thông tin thất bại', error);
      }
    );
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.promotionForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  // Xử lý thêm 
  edit() {

    // Valid
    if (this.promotionForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }
    
    this.editPromotion.productPromotionRequest = this.promotionProducts;

    console.log(this.editPromotion);
    
    // Call API Create 
    this.promotionService.edit(this.editPromotion).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Cập nhật thành công", res.message);
         } else if (res.code >= 400 && res.code < 500) {
          this.toast.warningToast("Thất bại", res.message);
          this.validationNotify.formErrors[res.validationNotify.obj] = res.validationNotify.message;
        }
      },
      (err) => {
        console.error('Error:', err);
        //console.error("Lỗi khi thêm", error);
        this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
      }
    );
  }
  
  back(){
    
  }

  formatDateToISO(date: string ): string {
    if (date) {
      return date.split('T')[0];
    }
    return '';
  }

  onChangeStartDate(){
    this.minEndDate = this.editPromotion.startDate;
    console.log(this.editPromotion.startDate);
  }

  onChangeEndDate(event){
    this.editPromotion.endDate = this.formatDateToISO(event);
  }

  handleProductPromotions(promotionRequest: any) {
    this.editPromotion.productPromotionRequest = promotionRequest;
  }

  //Chuyển đổi
  onDiscountTypeChange() {
    //Chờ model cập nhật
    setTimeout(()=> 
      {
        const value = this.editPromotion.discountValue;

        if (this.editPromotion.discountType === 'PromotionPercent' && value > 100) {
          this.editPromotion.discountValue = 100;
        } else if (this.editPromotion.discountType === 'PromotionMoney') {
          this.editPromotion.discountValue = Math.round((value || 1)) * 1000;
        }
      }
    )
  }

  //check giá trị giảm
  onDiscountValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;

    if (this.editPromotion.discountType === 'PromotionPercent') {
      if (value > 100) {
        this.editPromotion.discountValue = 100;
        this.formErrors['discountValue'] = 'Giảm giá không được vượt quá 100%';
      } else {
        this.editPromotion.discountValue = value;
        this.formErrors['discountValue'] = '';
      }
    } 
  }
}

