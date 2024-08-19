import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { OrderResponse } from '../../models/responses/order/list-order-response';
import { catchError, map, tap } from 'rxjs/operators';
import { OrderStatus, OrderStatusNumber } from '../../models/requests/order/edit-order-request';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Order/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify,
    private authService: AuthService) { 

  }

  //Lấy danh sách
  getOrders(status: OrderStatus): Observable<ResponseApi<OrderResponse[]>>{
    //Gán kiểu lấy danh sách
    const params = new HttpParams().set("type", this.orderStatusToNumber(status));

    return this.http.get<ResponseApi<OrderResponse[]>> (this.apiURL + 'GetOrders', {params})
    .pipe(
      tap((response: ResponseApi<OrderResponse[]>) => {
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

  //Lấy 
  details(id: string): Observable<ResponseApi<OrderResponse>>{
    const params = new HttpParams().set("id", id);

    return this.http.get<ResponseApi<OrderResponse>> (this.apiURL + 'DetailsOrder', {params})
    .pipe(
      tap((response: ResponseApi<OrderResponse>) => {
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

  getStatuses(): Observable< OrderStatus[] >{

    return this.http.get<string[]> (this.apiURL + 'GetOrderStatuses')
    .pipe(
      map((response: string[]) => { 
        // Ánh xạ các giá trị enum thành giá trị hiển thị
        return response.map(status => this.stringToOrderStatus(status)).filter(status => status !== undefined) as OrderStatus[];
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorNotify.handleStatusError(error.status);
      })
    );
  }

  //Sửa trạng thái
  edit(id: string,status: OrderStatus): Observable<ResponseApi<string>>{
    const request = {
      id: id,
      type: this.orderStatusToNumber(status),
    };

    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateOrder', request)
    .pipe(
      tap((response: ResponseApi<string>) => {
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

  stringToOrderStatus(status: string): OrderStatus | undefined {
    return Object.values(OrderStatus).includes(status as OrderStatus) ? status as OrderStatus : undefined;
  }

  orderStatusToNumber(status: OrderStatus): number | undefined {
    return OrderStatusNumber[status as keyof typeof OrderStatusNumber];
  }
}
