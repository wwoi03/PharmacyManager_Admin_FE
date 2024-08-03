import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { GeneralResponse } from '../../models/responses/statistic/general-response';
import { StatisticService } from '../../services/statistic/statistic.service';
import { ResponseApi } from '../../models/response-apis/response-api';
import { Toast } from '../../helpers/toast';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, OnInit {

  private alive = true;

  general: GeneralResponse = new GeneralResponse();

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Tổng doanh thu: ',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Tổng đơn hàng: ',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  // wirelessAudioCard: CardSettings = {
  //   title: 'Wireless Audio',
  //   iconClass: 'nb-audio',
  //   type: 'info',
  // };
  // coffeeMakerCard: CardSettings = {
  //   title: 'Coffee Maker',
  //   iconClass: 'nb-coffee-maker',
  //   type: 'warning',
  // };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    // this.wirelessAudioCard,
    // this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      // {
      //   ...this.wirelessAudioCard,
      //   type: 'danger',
      // },
      // {
      //   ...this.coffeeMakerCard,
      //   type: 'info',
      // },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
            private statisticService: StatisticService,
          private toast: Toast) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

  }
  ngOnInit(): void {
    this.loadData;
  }

  loadData(){
    this.statisticService.getGeneralStatistic().subscribe((data: ResponseApi<GeneralResponse>)=>{
      if(data.code === 200){
        this.general =data.obj;
        this.lightCard.title=  this.lightCard.title + this.general.salePrice;
        this.rollerShadesCard.title = this.rollerShadesCard.title+this.general.numOrder;
      
    }else {
      this.toast.warningToast("Lỗi hệ thống", data.message);}
  },(error) => {
    this.toast.warningToast('Lấy thông tin thất bại', error);
  });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
