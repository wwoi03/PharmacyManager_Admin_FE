import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { ErrorNotify } from "../../helpers/error-notify";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { catchError, tap } from "rxjs/operators";
import { ListShipmentDetailsResponse } from "../../models/responses/shipment-details/list-shipment-details-response";
import { CreateShipmentDetailsRequest } from "../../models/requests/shipment-details/create-shipment-details-request";

@Injectable({
  providedIn: "root",
})
export class ShipmentDetailsService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/shipmentDetails/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách đơn nhập kho
  getShipmentDetailsByShipment(shipmentId: string): Observable<ResponseApi<ListShipmentDetailsResponse[]>> {
    const params = new HttpParams().set("shipmentId", shipmentId);

    return this.http
      .get<ResponseApi<ListShipmentDetailsResponse[]>>(
        this.apiUrl + "GetShipmentDetailsByShipment", { params }
      )
      .pipe(
        tap((response: ResponseApi<ListShipmentDetailsResponse[]>) => {
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
  create(request: CreateShipmentDetailsRequest): Observable<ResponseApi<string>> {
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
