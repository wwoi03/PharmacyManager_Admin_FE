import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListStaffResponse } from "../../models/responses/staff/list-staff-response";
import { ResponseApi } from "../../models/response-apis/response-api";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { CreateStaffRequest } from "../../models/requests/staff/create-staff-request";
import { ErrorNotify } from "../../helpers/error-notify";
import { UpdateStaffRequest } from "../../models/requests/staff/update-staff-request";
import { DetailsStaffResponse } from "../../models/responses/staff/details-staff.response";

@Injectable({
  providedIn: "root",
})
export class StaffService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/staff/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  getStaffs(): Observable<ResponseApi<ListStaffResponse[]>> {
    return this.http
      .get<ResponseApi<ListStaffResponse[]>>(this.apiUrl + "GetStaffs")
      .pipe(
        tap((response: ResponseApi<ListStaffResponse[]>) => {
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

  // Thêm staff
  create(request: CreateStaffRequest): Observable<ResponseApi<string>> {
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
          return this.errorNotify.handleStatusError(error.status);
        })
      );
  }

  // Thêm staff
  update(request: UpdateStaffRequest): Observable<ResponseApi<string>> {
    return this.http
      .put<ResponseApi<string>>(this.apiUrl + "Update", request)
      .pipe(
        tap((response: ResponseApi<string>) => {
          if (response.isSuccessed) {
            return response;
          } else {
            this.errorNotify.handleStatusError(response.code);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return this.errorNotify.handleStatusError(error.status);
        })
      );
  }

  // chi tiết staff
  details(staffId: string): Observable<ResponseApi<DetailsStaffResponse>> {
    const params = new HttpParams().set("staffId", staffId);

    return this.http
      .get<ResponseApi<DetailsStaffResponse>>(this.apiUrl + "Details", { params })
      .pipe(
        tap((response: ResponseApi<DetailsStaffResponse>) => {
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
