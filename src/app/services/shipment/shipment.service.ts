import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { ErrorNotify } from '../../helpers/error-notify';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseApi } from '../../models/response-apis/response-api';
import { ShipmentResponse } from '../../models/responses/shipment/shipment-response';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CreateShipmentRequest } from '../../models/requests/shipment/create-shipment-request';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/shipment/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách đơn nhập kho
  getShipmentsByBranch(): Observable<ResponseApi<ShipmentResponse[]>> {
    return this.http
      .get<ResponseApi<ShipmentResponse[]>>(this.apiUrl + "GetShipmentsByBranch")
      .pipe(
        tap((response: ResponseApi<ShipmentResponse[]>) => {
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

  // Create
  create(request: CreateShipmentRequest): Observable<ResponseApi<string>> {
    return this.http
      .post<ResponseApi<string>>(this.apiUrl + "Create", request)
      .pipe(
        tap((response: ResponseApi<string>) => {
          if (response.isSuccessed) {
            return response;
          } else {
            this.errorNotify.handleStatusError(response.code);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.errorNotify.handleStatusError(error.status);
        })
      );
  }
}
