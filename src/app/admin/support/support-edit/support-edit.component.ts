import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailsSupportRequest } from '../../../models/requests/support/get-details-support-request';
import { SupportResponse } from '../../../models/responses/support/support-response';
import { EditSupportRequest } from '../../../models/requests/support/edit-support-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportService } from '../../../services/support/support.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-support-edit',
  templateUrl: './support-edit.component.html',
  styleUrls: ['./support-edit.component.scss']
})
export class SupportEditComponent implements OnInit, OnDestroy{
  
  currentTheme: string;
  themeSubscription: any;
  supportRequest: DetailsSupportRequest = new DetailsSupportRequest();
  support: SupportResponse;

  //Tạo biến
  editSupportRequest: EditSupportRequest = new EditSupportRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('supportForm') supportForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private route: ActivatedRoute,
    private supportService: SupportService,
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
    //Lấy support từ id
    this.supportRequest.id = this.route.snapshot.paramMap.get('id');

    if (this.supportRequest) {
      // Gọi service để lấy thông tin chi tiết hỗ trợ
      this.supportService.details(this.supportRequest).subscribe(
        (response) => {
          if (response.code === 200){
            this.support = response.obj;
            this.editSupportRequest.id = this.support.id;
            this.editSupportRequest.name = this.support.name;
            this.editSupportRequest.description = this.support.description;
            this.editSupportRequest.codeSupport = this.support.codeSupport;
          } else {
            this.toast.warningToast('Lấy thông tin thất bại', response.message);
          }
        },(error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
      );
    }
    
    this.validationMessages = this.editSupportRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.supportForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thay 
   edit() {
    // Lấy form controls
    const controls = this.supportForm.controls;
    
    // Kiểm tra tính hợp lệ của các yếu tố, bỏ qua description
    let formValid = false;
    for (const name in controls) {
      if (name !== 'description' && controls[name].invalid) {
        formValid = true;
        break;
      }
    }
    // Valid
    if (formValid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API update 
    this.supportService.edit(this.editSupportRequest).subscribe(
      (res) => {
        console.log('Response from server:', res);
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
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
}
