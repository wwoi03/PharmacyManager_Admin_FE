import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { ShipmentDetailsUnitResponse } from '../../models/responses/shipment-details-unit/shipment-details-unit-response';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipmentDetailsUnitService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/ShipmentDetailsUnit/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách đơn nhập kho
  getShipmentDetailsUnitBestest(productId: string): Observable<ResponseApi<ShipmentDetailsUnitResponse[]>> {
    const params = new HttpParams().set("productId", productId);

    return this.http
      .get<ResponseApi<ShipmentDetailsUnitResponse[]>>(
        this.apiUrl + "GetShipmentDetailsUnitBestest", { params }
      )
      .pipe(
        tap((response: ResponseApi<ShipmentDetailsUnitResponse[]>) => {
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
