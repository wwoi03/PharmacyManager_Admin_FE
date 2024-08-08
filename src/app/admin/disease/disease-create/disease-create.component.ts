import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateDiseaseRequest } from '../../../models/requests/disease/create-disease-request';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { NgForm } from '@angular/forms';
import { DiseaseService } from '../../../services/disease/disease.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-disease-create',
  templateUrl: './disease-create.component.html',
  styleUrls: ['./disease-create.component.scss']
})

export class DiseaseCreateComponent implements OnInit, OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  //Tham chiếu từ component diseasesymptomlist
  receivedSymptom: string[];



  //Tạo biến
  createDiseaseRequest: CreateDiseaseRequest = new CreateDiseaseRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('diseaseForm') diseaseForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private diseaseService: DiseaseService,
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
    this.validationMessages = this.createDiseaseRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.diseaseForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thêm 
   create() {


    // Valid
    if (this.diseaseForm.invalid) {
      this.validationNotify.validateForm();
      this.formErrors =  this.validationNotify.formErrors;
      return;
    }

    // Call API Create 
    this.diseaseService.create(this.createDiseaseRequest).subscribe(
      (res) => {
        if (res.code === 200) {
          this.toast.successToast("Thành công", res.message);
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

  onDataReceivedSymptom(data: string[]) {
    // Cập nhật dữ liệu nhận được từ component con
    this.createDiseaseRequest.symptomId = data;
  }

  onDataReceivedProduct(data: string[]) {
    // Cập nhật dữ liệu nhận được từ component con
    this.createDiseaseRequest.productId = data;
  }
  
  back(){
    
  }
}
