import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ListStaffResponse } from "../../models/responses/staff/list-staff-response";
import { ResponseApi } from "../../models/response-apis/response-api";
import { map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { CreateStaffRequest } from "../../models/requests/staff/create-staff-request";

@Injectable({
  providedIn: "root",
})
export class StaffService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/staff/";

  constructor(private http: HttpClient) {}

  getStaffs(): Observable<ListStaffResponse[]> {
    return this.http
      .get<ResponseApi<ListStaffResponse[]>>(this.apiUrl + "GetStaffs")
      .pipe(map((response: ResponseApi<ListStaffResponse[]>) => response.obj));
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

          }
        })
      );
  }
}
