import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditDiseaseRequest } from '../../../models/requests/disease/edit-disease-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { DiseaseService } from '../../../services/disease/disease.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseDTO } from '../../../models/DTOs/Disease/DiseaseDTO';
import { DetailsDiseaseRequest } from '../../../models/requests/disease/get-details-disease-request';

@Component({
  selector: 'ngx-disease-edit',
  templateUrl: './disease-edit.component.html',
  styleUrls: ['./disease-edit.component.scss']
})
export class DiseaseEditComponent implements OnDestroy, OnInit {

  currentTheme: string;
  themeSubscription: any;
  diseaseRequest: DetailsDiseaseRequest = new DetailsDiseaseRequest();
  disease: DiseaseDTO;

  //Tạo biến
  editDiseaseRequest: EditDiseaseRequest = new EditDiseaseRequest();

  // Form Validation
  formErrors: { [key: string]: string } = {};
  validationMessages = {};
  @ViewChild('diseaseForm') diseaseForm: NgForm;
  validationNotify: ValidationNotify;

   // Constructor
   constructor(
    private route: ActivatedRoute,
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
    //Lấy disease từ id
    this.diseaseRequest.id = this.route.snapshot.paramMap.get('id');

    if (this.diseaseRequest) {
      // Gọi service để lấy thông tin chi tiết bệnh
      this.diseaseService.details(this.diseaseRequest).subscribe(
        (response) => {
          this.disease = response.obj;
          this.editDiseaseRequest.id = this.disease.id;
          this.editDiseaseRequest.name = this.disease.name;
          this.editDiseaseRequest.description = this.disease.description;
          this.editDiseaseRequest.codeDisease = this.disease.codeDisease;
        },
        (error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
      );
    }
    
    this.validationMessages = this.editDiseaseRequest.validationMessages;
  }

   // After Init Data
   ngAfterViewInit(): void {
    this.validationNotify = new ValidationNotify(this.formErrors, this.validationMessages, this.diseaseForm);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

   // Xử lý thay 
   edit() {
    // Lấy form controls
    const controls = this.diseaseForm.controls;
    
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
    this.diseaseService.edit(this.editDiseaseRequest).subscribe(
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
