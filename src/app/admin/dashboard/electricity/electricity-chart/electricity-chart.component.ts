import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../../@core/utils';
import { StatisticRevenueResponse } from '../../../../models/responses/statistic/statistic-revenue-response';

@Component({
  selector: 'ngx-electricity-chart',
  styleUrls: ['./electricity-chart.component.scss'],
  template: `
    <div echarts
         [options]="option"
         [merge]="option"
         class="echart">
    </div>
  `,
})
export class ElectricityChartComponent implements AfterViewInit, OnDestroy, OnChanges {

 
  private alive = true;

  @Input() data: StatisticRevenueResponse[];

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
            formatter: '{c0} kWh',
            extraCssText: eTheme.tooltipExtraCss,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 25,
            data: this.data.map(i => i.title),
            axisTick: {
              show: false,
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
              name: 'Tổng doanh thu',
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
              data: this.data.map(i => i.statistic), // Sử dụng dữ liệu `order`
              tooltip: {
                formatter: '{c} doanh thu'
              },
            },
          ],
        };
    });
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
