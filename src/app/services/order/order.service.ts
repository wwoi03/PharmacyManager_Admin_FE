import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { ListOrderResponse } from '../../models/responses/order/list-order-response';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Disease/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  //Lấy danh sách
  getOrders(): Observable<ResponseApi<ListOrderResponse[]>>{
    return this.http.get<ResponseApi<ListOrderResponse[]>> (this.apiURL + 'GetOrders')
    .pipe(
      tap((response: ResponseApi<ListOrderResponse[]>) => {
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
