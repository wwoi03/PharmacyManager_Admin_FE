import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NbAccordionItemComponent, NbDateService, NbThemeService } from '@nebular/theme';

import { ElectricityData } from '../../../@core/data/electricity';
import { takeWhile } from 'rxjs/operators';
import { StatisticService } from '../../../services/statistic/statistic.service';
import { ResponseApi } from '../../../models/response-apis/response-api';
import { Toast } from '../../../helpers/toast';
import { StatisticRevenueResponse } from '../../../models/responses/statistic/statistic-revenue-response';
import { StatisticRequest } from '../../../models/requests/statistic/statistic-request';
import * as moment from 'moment';

@Component({
  selector: 'ngx-electricity',
  styleUrls: ['./electricity.component.scss'],
  templateUrl: './electricity.component.html',
})
export class ElectricityComponent implements OnDestroy {

  private alive = true;

  //Xử lý expaned
  @ViewChild('firstAccordion') firstAccordion: NbAccordionItemComponent;
  @ViewChild('secondAccordion') secondAccordion: NbAccordionItemComponent;

  firstAccordionOpen = true;
  secondAccordionOpen = false;

  listData: any[] ;
  chartData: StatisticRevenueResponse[] = [];
  tmpChart: any[]=[];

  request: StatisticRequest = new StatisticRequest();

  types = ['week', 'month', 'year'];
  type: string = 'week';

  currentTheme: string;
  themeSubscription: any;

  //Giới hạn ngày
  min: Date;
  max: Date;
  inputDate: Date = new Date();

  //Tính tổng
  sumRevenue: number ;

  constructor(private electricityService: ElectricityData,
              private themeService: NbThemeService,
              private statisticService: StatisticService,
              private toast: Toast,
              private dateService: NbDateService<Date>) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.min = new Date(2020, 0, 1); // Tháng 0 tương ứng với tháng 1 (tháng được tính từ 0 đến 11)
    // Thiết lập giá trị max là ngày hiện tại
    this.max = this.dateService.today();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

 
  //Chuyển đổi tiền tệ
  formatCurrency(value: number): string {
    return `${value.toLocaleString('vi-VN')}`;
  }

  loadData(){
    //Xử lý chart

    this.listData = [];
    this.sumRevenue = 0;
    
    this.request = {
      dateTime: moment(this.inputDate).format('YYYY-MM-DD'),
      timeType: this.type,
    };

    this.statisticService.getStatisticRevenue(this.request).subscribe((data: ResponseApi<StatisticRevenueResponse[]>)=>{
      if(data.code === 200){

        if(this.type !== 'year')    
          this.chartData = data.obj.filter((_, index) => index !== data.obj.length - 1).reverse();
        else
          this.chartData = data.obj.reverse();

          //Chuyển đổi Định dạng dữ liệu
        this.tmpChart = this.chartData.map(data => ({
          ...data,
          value: this.formatCurrency(data.statistic),
        }));
      

        //Xử lý data list
        for (let i = 0; i < data.obj.length - 1; i++) {

            const previousItem = data.obj[i + 1];
            const currentItem = data.obj[i];
            let deltaValue = currentItem.statistic;
            let deltaString = `${deltaValue} VND`;
            let down = false;

            //Tính sum
            this.sumRevenue += currentItem.statistic;

            if(previousItem.statistic !== 0 && previousItem.statistic !== null){
              deltaValue = ((currentItem.statistic - previousItem.statistic) / previousItem.statistic) * 100;
              const delta = deltaValue.toFixed(2); // Làm tròn đến 2 chữ số thập phân
    
              deltaString = `+${delta}%`;

              if (deltaValue < 0) {
                down = true;
                deltaString = `${delta}%`;            // Để delta là số âm, không cần dấu trừ
              }

            }
            const tmp = {
              title : currentItem.title,
              delta: deltaString, 
              down: down,
              value: currentItem.statistic,
            }
            this.listData.push(tmp);
          }
      
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });

}

convertToDate(nbDate: any): Date {
  return new Date(nbDate.year, nbDate.month - 1, nbDate.day);
}

  onChangeType(event){
    this.type = event;
    this.ngOnInit();
  }

  onChangeDate(event){
    this.inputDate = event;
    this.ngOnInit();
  }

  //Xử lý chuyển biểu đồ 
  onAccordionToggle() {
    // Đổi trạng thái
      this.secondAccordionOpen = this.firstAccordionOpen;
      this.firstAccordionOpen = !this.firstAccordionOpen;
      console.log(this.secondAccordionOpen, this.firstAccordionOpen);
    this.updateAccordionState();
  }

  updateAccordionState() {
    if (this.firstAccordionOpen) {
      this.firstAccordion.open();
      this.secondAccordion.close();
    } else {
      this.firstAccordion.close();
      this.secondAccordion.open();
    }
  }
}
