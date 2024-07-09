import { Component, OnInit } from '@angular/core';
import { DetailsSymptomRequest } from '../../../models/requests/symptom/get-details-symptom-request';
import { SymptomResponse } from '../../../models/responses/symptom/symptom-response';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomService } from '../../../services/symptom/symptom.service';
import { NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';

@Component({
  selector: 'ngx-symptom-details',
  templateUrl: './symptom-details.component.html',
  styleUrls: ['./symptom-details.component.scss']
})
export class SymptomDetailsComponent implements OnInit{
  currentTheme: string;
  themeSubscription: any;
  symptomRequest: DetailsSymptomRequest = new DetailsSymptomRequest();
  symptom: SymptomResponse;

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
      // Gọi service để lấy thông tin chi tiết bệnh
      this.symptomService.details(this.symptomRequest).subscribe(
        (response) => {
          if (response.code === 200){
            this.symptom = response.obj;
          } else {
            this.toast.warningToast('Lấy thông tin thất bại', response.message);
          }
        }, (error) => {
          this.toast.warningToast('Lấy thông tin thất bại', error);
        }
        );
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
