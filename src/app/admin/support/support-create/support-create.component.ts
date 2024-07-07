import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateSupportRequest } from '../../../models/requests/support/create-support-request';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { NgForm } from '@angular/forms';
import { SupportService } from '../../../services/support/support.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-support-create',
  templateUrl: './support-create.component.html',
  styleUrls: ['./support-create.component.scss']
})

export class SupportCreateComponent implements OnInit, OnDestroy {
  
  currentTheme: string;
  themeSubscription: any;

  //Tạo biến
  createSupportRequest: CreateSupportRequest = new CreateSupportRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('supportForm') supportForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
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
    this.validationMessages = this.createSupportRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.supportForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thêm 
   create() {
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

    // Call API Create 
    this.supportService.create(this.createSupportRequest).subscribe(
      (res) => {
        console.log('Response from server:', res);
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
        } else  {
          this.toast.warningToast("Thất bại", res.message);
          this.validationNotify.formErrors[res.obj] = res.message;
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
