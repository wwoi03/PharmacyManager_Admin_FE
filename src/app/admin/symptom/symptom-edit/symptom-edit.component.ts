import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailsSymptomRequest } from '../../../models/requests/symptom/get-details-symptom-request';
import { SymptomResponse } from '../../../models/responses/symptom/symptom-response';
import { EditSymptomRequest } from '../../../models/requests/symptom/edit-symptom-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-symptom-edit',
  templateUrl: './symptom-edit.component.html',
  styleUrls: ['./symptom-edit.component.scss']
})
export class SymptomEditComponent implements OnInit, OnDestroy{
  
  currentTheme: string;
  themeSubscription: any;
  symptomRequest: DetailsSymptomRequest = new DetailsSymptomRequest();
  symptom: SymptomResponse;

  //Tạo biến
  editSymptomRequest: EditSymptomRequest = new EditSymptomRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('symptomForm') symptomForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private route: ActivatedRoute,
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
    //Lấy symptom từ id
    this.symptomRequest.id = this.route.snapshot.paramMap.get('id');

    if (this.symptomRequest) {
      // Gọi service để lấy thông tin chi tiết triệu chứng
      this.symptomService.details(this.symptomRequest).subscribe(
        (response) => { if (response.code === 200){
          this.symptom = response.obj;
          this.editSymptomRequest.id = this.symptom.id;
          this.editSymptomRequest.name = this.symptom.name;
          this.editSymptomRequest.description = this.symptom.description;
          this.editSymptomRequest.codeSymptom = this.symptom.codeSymptom;
        } else {
          this.toast.warningToast('Lấy thông tin thất bại', response.message);
        }
      },
        (error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
      );
    }
    
    this.validationMessages = this.editSymptomRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.symptomForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thay 
   edit() {
    // Lấy form controls
    const controls = this.symptomForm.controls;
    
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
    this.symptomService.edit(this.editSymptomRequest).subscribe(
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
