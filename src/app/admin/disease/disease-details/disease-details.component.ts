import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DetailsDiseaseRequest } from '../../../models/requests/disease/get-details-disease-request';
import { NgForm } from '@angular/forms';
import { ValidationNotify } from '../../../helpers/validation-notify';
import { ActivatedRoute, Router } from '@angular/router';
import { DiseaseService } from '../../../services/disease/disease.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { Console } from 'console';
import { DiseaseResponse } from '../../../models/responses/disease/disease-response';

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
          } else {
            this.toast.warningToast('Lấy thông tin thất bại', response.message);
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
}
