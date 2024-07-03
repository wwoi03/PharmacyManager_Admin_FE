import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { ListCategoryResponse } from "../../models/responses/category/list-category-response";
import { CreateCategoryRequest } from "../../models/requests/category/create-category-request";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/category/";

  constructor(private http: HttpClient) {}

  // Lấy danh sách loại sản phẩm
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

  // Thêm loại sản phẩm
  create(request: CreateCategoryRequest): Observable<ResponseApi<string>> {
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

  // Thêm loại sản phẩm
  getCategoryByCode(codeCategory: string): Observable<ResponseApi<any>> {
    const params = new HttpParams().set('codeCategory', codeCategory);
    
    return this.http.get<ResponseApi<any>>(this.apiUrl + "GetCategoryByCode", { params })
    .pipe(
      tap((response: ResponseApi<any>) => {
        if (response.isSuccessed) {
          return response;
        } else {

        }
      })
    );
  }
}