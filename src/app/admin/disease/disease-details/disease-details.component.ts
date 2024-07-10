import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailsDiseaseRequest } from '../../../models/requests/disease/get-details-disease-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseService } from '../../../services/disease/disease.service';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Console } from 'console';
import { DiseaseResponse } from '../../../models/responses/disease/disease-response';
import { DiseaseDeleteComponent } from '../disease-delete/disease-delete.component';

@Component({
  selector: 'ngx-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.scss']
})
export class DiseaseDetailsComponent implements OnInit, OnDestroy{
 
  currentTheme: string;
  themeSubscription: any;
  diseaseRequest: DetailsDiseaseRequest = new DetailsDiseaseRequest();
  disease: DiseaseResponse;

   // Constructor
   constructor(
    private route: ActivatedRoute,
    private diseaseService: DiseaseService,
    private themeService: NbThemeService,
    private toast: Toast,
    private router: Router,
    private dialogService : NbDialogService,
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
          if (response.code === 200){
            this.disease = response.obj;
          } else if (response.code >= 400 && response.code < 500) {
            this.toast.warningToast("Thất bại", response.message);
          } else if (response.code === 500) {
            this.toast.dangerToast("Lỗi hệ thống", response.message);
          }
        },
        (error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onDelete(): void {
    
    this.dialogService
      .open(DiseaseDeleteComponent, {
        context: {
          disease: this.disease
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.router.navigate(['/admin/disease/disease-list']);
        }
      });
  }
}
