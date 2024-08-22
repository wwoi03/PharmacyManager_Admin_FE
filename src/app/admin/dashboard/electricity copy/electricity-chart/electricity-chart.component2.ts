import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils';
import { StatisticOrderResponse } from '../../../../models/responses/statistic/statistic-order-respone';

@Component({
  selector: 'ngx-electricity-chart2',
  styleUrls: ['./electricity-chart.component2.scss'],
  template: `
    <div echarts
         [options]="option"
         [merge]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class ElectricityChartComponent2 implements AfterViewInit, OnDestroy, OnChanges {

  @Output() timeType = new EventEmitter<string>();
  
  private alive = true;

  @Input() data: StatisticOrderResponse[];

  option: any;
  echartsIntance: any;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onSafeChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {

      this.ngAfterViewInit();
    }
  }

  ngAfterViewInit(): void {
    this.data;
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const eTheme: any = config.variables.electricity;

        this.option = {
          grid: {
            left: 30,
            top: 0,
            right: 30,
            bottom: 80,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: eTheme.tooltipLineColor,
                width: eTheme.tooltipLineWidth,
              },
            },
            textStyle: {
              color: eTheme.tooltipTextColor,
              fontSize: 20,
              fontWeight: eTheme.tooltipFontWeight,
            },
            position: 'top',
             backgroundColor: eTheme.tooltipBg,
             borderColor: eTheme.tooltipBorderColor,
             borderWidth: 1,
             extraCssText: eTheme.tooltipExtraCss,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 25,
            data: this.data.map(i => i.title),
            axisTick: {
              show: true,
            },
            axisLabel: {
              color: eTheme.xAxisTextColor,
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: eTheme.axisLineColor,
                width: '2',
              },
            },
            splitNumber: this.data.length,
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: eTheme.yAxisSplitLine,
                width: '1',
              },
            },
          },
          series: [
            {
              name: 'Tổng đơn hàng',
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  color: '#A4D24F',
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 5, 0, 0.5, [{
                    offset: 0,
                    color: '#008009',
                  }, {
                    offset: 1,
                    color: '#A4D24F',
                  }]),
                  shadowColor: eTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.3, [{
                    offset: 0,
                    color: '#008009',
                  }, {
                    offset: 1,
                    color: '#A4D24F',
                  }]),
                },
              },
              data: this.data.map(i => i.order), // Sử dụng dữ liệu `order`
              tooltip: {
                formatter: '{c} đơn hàng'
              },
            },
            {
              name: 'Số đơn hủy',
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  color: '#FF8A8C',
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.3, [{
                    offset: 0,
                    color: '#FD4256', // Màu gradient cho line `Cancellation`
                  }, {
                    offset: 1,
                    color: '#FF8A8C',
                  }]),
                  shadowColor: eTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.5, [{
                    offset: 0,
                    color: '#FD4256', // Màu gradient cho area `Cancellation`
                  }, {
                    offset: 1,
                    color: '#FF8A8C',
                  }]),
                },
              },
              data: this.data.map(i => i.cancellation), // Sử dụng dữ liệu `cancellation`
              tooltip: {
                formatter: '{c} đơn hủy'
              },
            },
            {
              name: 'Số đơn thanh toán',
              type: 'line',
              smooth: true,
              symbolSize: 20,
              itemStyle: {
                normal: {
                  color: '#459BAC',
                  opacity: 0,
                },
                emphasis: {
                  color: '#ffffff',
                  borderColor: eTheme.itemBorderColor,
                  borderWidth: 2,
                  opacity: 1,
                },
              },
              lineStyle: {
                normal: {
                  width: eTheme.lineWidth,
                  type: eTheme.lineStyle,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.3, [{
                    offset: 0,
                    color: '#0094C7', // Màu gradient cho line `Payment`
                  }, {
                    offset: 1,
                    color: '#459BAC',
                  }]),
                  shadowColor: eTheme.lineShadow,
                  shadowBlur: 6,
                  shadowOffsetY: 12,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.4, [{
                    offset: 0,
                    color: '#0094C7', // Màu gradient cho area `Payment`
                  }, {
                    offset: 1,
                    color: '#459BAC',
                  }]),
                },
              },
              data: this.data.map(i => i.payment), // Sử dụng dữ liệu `payment`
              tooltip: {
                formatter: '{c0} đơn thanh toán'
              }
            }
          ],
        };
    });
  }

  onChartInit(echarts) {
    this.timeType.emit(echarts);
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
