import { Component, OnInit } from '@angular/core';
import { DetailsSupportRequest } from '../../../models/requests/support/get-details-support-request';
import { SupportResponse } from '../../../models/responses/support/support-response';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportService } from '../../../services/support/support.service';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { Toast } from '../../../helpers/toast';
import { SupportDeleteComponent } from '../support-delete/support-delete.component';

@Component({
  selector: 'ngx-support-details',
  templateUrl: './support-details.component.html',
  styleUrls: ['./support-details.component.scss']
})
export class SupportDetailsComponent implements OnInit{
  currentTheme: string;
  themeSubscription: any;
  supportRequest: DetailsSupportRequest = new DetailsSupportRequest();
  support: SupportResponse;

   // Constructor
   constructor(
    private route: ActivatedRoute,
    private supportService: SupportService,
    private themeService: NbThemeService,
    private toast: Toast,
    private router: Router,
    private dialogService: NbDialogService,
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
      // Gọi service để lấy thông tin chi tiết bệnh
      this.supportService.details(this.supportRequest).subscribe(
        (response) => {
        if (response.code === 200){
          this.support = response.obj;
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

  onDelete(): void {
    
    this.dialogService
      .open(SupportDeleteComponent, {
        context: {
          support: this.support
        }
      })
      .onClose.subscribe((isSubmit: boolean) => {
        if (isSubmit) {
          this.router.navigate(['/admin/support/support-list']);
        }
      });
  }
}
