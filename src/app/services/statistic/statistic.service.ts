import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { StatisticRequest, StatisticStatus } from '../../models/requests/statistic/statistic-request';
import { catchError, tap } from 'rxjs/operators';
import { GeneralResponse } from '../../models/responses/statistic/general-response';
import { StatisticProductOrderResponse } from '../../models/responses/statistic/statistic-top-product-order-response';
import { StatisticOrderResponse } from '../../models/responses/statistic/statistic-order-respone';
import { StatisticRevenueResponse } from '../../models/responses/statistic/statistic-revenue-response';
import { StatisticProductResponse } from '../../models/responses/statistic/statistic-product-view-response';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Statistic/';

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) { }

  //Lấy thống kê Order
  getStatisticOrder(request: StatisticRequest): Observable<ResponseApi<StatisticOrderResponse[]>>{

    const params = new HttpParams()
    .set('TimeType', request.timeType)
    .set('DateTime', request.dateTime); 

    return this.http.get<ResponseApi<StatisticOrderResponse[]>> (this.apiURL + 'Order', {params})
    .pipe(
      tap((response: ResponseApi<StatisticOrderResponse[]>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }

  //Lấy thống kê doanh thu
  getStatisticRevenue(request: StatisticRequest): Observable<ResponseApi<StatisticRevenueResponse[]>>{

    const params = new HttpParams()
    .set('TimeType', request.timeType)
    .set('DateTime', request.dateTime); 

    return this.http.get<ResponseApi<StatisticRevenueResponse[]>> (this.apiURL + 'Revenue', {params})
    .pipe(
      tap((response: ResponseApi<StatisticRevenueResponse[]>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }

  //Lấy thống kê tổng bộ
  getGeneralStatistic(): Observable<ResponseApi<GeneralResponse>>{

    return this.http.get<ResponseApi<GeneralResponse>> (this.apiURL + 'General')
    .pipe(
      tap((response: ResponseApi<GeneralResponse>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }  

  //Lấy thống kê 10 đơn hủy
  getTopCancellation(): Observable<ResponseApi<StatisticProductOrderResponse[]>>{

    return this.http.get<ResponseApi<StatisticProductOrderResponse[]>> (this.apiURL + 'Top10Cancellation')
    .pipe(
      tap((response: ResponseApi<StatisticProductOrderResponse[]>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }  

  //Lấy thống kê 10 sản phẩm bán chạy
  getTopSold(): Observable<ResponseApi<StatisticProductOrderResponse[]>>{

    return this.http.get<ResponseApi<StatisticProductOrderResponse[]>> (this.apiURL + 'Top10Sold')
    .pipe(
      tap((response: ResponseApi<StatisticProductOrderResponse[]>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }  

  //Lấy thống kê 10 sản phẩm được xem nhiều nhất
  getTopView(): Observable<ResponseApi<StatisticProductResponse[]>>{

    return this.http.get<ResponseApi<StatisticProductResponse[]>> (this.apiURL + 'Top10View')
    .pipe(
      tap((response: ResponseApi<StatisticProductResponse[]>) => {
        if (response.isSuccessed) {
          return response;
        } else {
          this.errorNotify.handleStatusError(response.code);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }  
}
