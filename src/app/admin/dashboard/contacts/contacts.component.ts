import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { StatisticProductResponse } from '../../../models/responses/statistic/statistic-product-view-response';
import { StatisticProductOrderResponse } from '../../../models/responses/statistic/statistic-top-product-order-response';
import { StatisticService } from '../../../services/statistic/statistic.service';
import { Toast } from '../../../helpers/toast';
import { ResponseApi } from '../../../models/response-apis/response-api';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy, OnInit {

  private alive = true;

  top10View: StatisticProductResponse[] = [];

  top10Sold: StatisticProductOrderResponse[] = [];

  top10Cancellation: StatisticProductOrderResponse[] = [];


  constructor(private statisticService: StatisticService, private toast: Toast) {
    
  }



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadData(){
     // Call API top 10 hủy 
     this.statisticService.getTopCancellation().subscribe((data: ResponseApi<StatisticProductOrderResponse[]>)=>{
        if (data.code === 200) {
          this.top10Cancellation = data.obj;
        } else if (data.code >= 400 && data.code < 500) {
          this.toast.warningToast("Thất bại", data.message);
        }
      },
      (err) => {
        console.error('Error:', err);
        //console.error("Lỗi khi thêm", error);
        this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
      }
    );

    // Call API top 10 hủy 
    this.statisticService.getTopSold().subscribe((data: ResponseApi<StatisticProductOrderResponse[]>)=>{
      if (data.code === 200) {
        this.top10Sold = data.obj;
      } else if (data.code >= 400 && data.code < 500) {
        this.toast.warningToast("Thất bại", data.message);
      }
    },
    (err) => {
      console.error('Error:', err);
      //console.error("Lỗi khi thêm", error);
      this.toast.warningToast("Lỗi hệ thống", "Lỗi hệ thống, vui lòng thử lại sau.");
    }
  );

   // Call API top 10 hủy 
   this.statisticService.getTopView().subscribe((data: ResponseApi<StatisticProductResponse[]>)=>{
    if (data.code === 200) {
      this.top10View = data.obj;
    } else if (data.code >= 400 && data.code < 500) {
      this.toast.warningToast("Thất bại", data.message);
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
