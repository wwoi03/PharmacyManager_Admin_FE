import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { ListRoleResponse } from "../../models/responses/role/list-role-response";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/Role/";

  constructor(private http: HttpClient) {}

  getRoles(): Observable<ResponseApi<ListRoleResponse[]>> {
    return this.http
      .get<ResponseApi<ListRoleResponse[]>>(this.apiUrl + "Get")
      .pipe(
        tap((response: ResponseApi<ListRoleResponse[]>) => {
          if (response.isSuccessed) {
            return response;
          } else {

          }
        })
      );
  }
}
