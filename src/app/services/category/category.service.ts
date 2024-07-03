import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { ListCategoryResponse } from "../../models/responses/category/list-category-response";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/category/";

  constructor(private http: HttpClient) {}

  getCategoriesByLevel(): Observable<ResponseApi<ListCategoryResponse[]>> {
    return this.http
      .get<ResponseApi<ListCategoryResponse[]>>(this.apiUrl + "GetCategoriesByLevel")
      .pipe(
        tap((response: ResponseApi<ListCategoryResponse[]>) => {
          if (response.isSuccessed) {
            return response;
          } else {

          }
        })
      );
  }
}
