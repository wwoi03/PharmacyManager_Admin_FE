import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PromotionRequest } from '../../../models/requests/promotion/promotion-create-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { PromotionService } from '../../../services/promotion/promotion.service';
import { NbDatepickerComponent, NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';
import { Util } from '../../../helpers/util';

@Component({
  selector: 'ngx-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tạo biến
  createPromotion: PromotionRequest = new PromotionRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('promotionForm') promotionForm: NgForm;
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
    this.validationMessages = this.createPromotion.validationMessages;
    this.loadData();
  }

  loadData(){
    this.min = new Date(); 
    this.createPromotion.startDate = this.formatDateToISO(this.min);
    // // set giá trị ngày
    // this.createPromotion.startDate = this.formatDateToISO(new Date());
    this.updateMinEndDate();
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

    //Chuyển đổi date sang string => ISO

    // Valid
    if (this.promotionForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API Create 
    this.promotionService.create(this.createPromotion).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
          this.createPromotion.discountType = this.typeDiscount[0];
          //this.ref.close(true);
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

  updateMinEndDate() {
    this.minEndDate = this.createPromotion.startDate;
    console.log(this.createPromotion.startDate);
    console.log(this.createPromotion.endDate);
  }

  formatDateToISO(date: Date ): string {
    if (date) {
      return date.toISOString().split('T')[0];
    }
    return '';
  }

  onChangeStartDate(){
    this.createPromotion.startDate;
    console.log(this.createPromotion.endDate);
    this.updateMinEndDate();
  }

  onChangeEndDate(event){
    this.createPromotion.endDate = this.formatDateToISO(event);
  }

}
