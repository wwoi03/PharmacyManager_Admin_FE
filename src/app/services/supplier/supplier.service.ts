import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ErrorNotify } from "../../helpers/error-notify";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { catchError, tap } from "rxjs/operators";
import { SelectSupplierResponse } from "../../models/responses/supplier/select-supplier-response";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/supplier/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách loại sản phẩm
  getSupplierByCode(codeSupplier: string): Observable<ResponseApi<any>> {
    const params = new HttpParams().set("codeSupplier", codeSupplier);

    return this.http
      .get<ResponseApi<any>>(this.apiUrl + "GetSupplierByCode", { params })
      .pipe(
        tap((response: ResponseApi<any>) => {
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

  // Lấy danh sách loại sản phẩm
  getSuppliersSelect(): Observable<ResponseApi<SelectSupplierResponse[]>> {
    return this.http
      .get<ResponseApi<SelectSupplierResponse[]>>(this.apiUrl + "GetSuppliersSelect")
      .pipe(
        tap((response: ResponseApi<SelectSupplierResponse[]>) => {
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
