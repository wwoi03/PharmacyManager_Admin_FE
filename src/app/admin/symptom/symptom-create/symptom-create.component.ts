import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateSymptomRequest } from '../../../models/requests/symptom/create-symptom-request';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { NgForm } from '@angular/forms';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-symptom-create',
  templateUrl: './symptom-create.component.html',
  styleUrls: ['./symptom-create.component.scss']
})

export class SymptomCreateComponent implements OnInit, OnDestroy {
  
  currentTheme: string;
  themeSubscription: any;

  //Tạo biến
  createSymptomRequest: CreateSymptomRequest = new CreateSymptomRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('symptomForm') symptomForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private symptomService: SymptomService,
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
    this.validationMessages = this.createSymptomRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.symptomForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thêm 
   create() {

    // Valid
    if (this.symptomForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API Create 
    this.symptomService.create(this.createSymptomRequest).subscribe(
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

  onDataReceived(data: string[]) {
    // Cập nhật dữ liệu nhận được từ component con
    this.createSymptomRequest.diseaseId = data;
  }
}
