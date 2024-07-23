import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.prod";
import { ListCategoryResponse } from "../../models/responses/category/list-category-response";
import { CreateCategoryRequest } from "../../models/requests/category/create-category-request";
import { ErrorNotify } from "../../helpers/error-notify";
import { DetailsCategoryResponse } from "../../models/responses/category/details-category-response";
import { UpdateCategoryRequest } from "../../models/requests/category/update-category-request";
import { SelectCategoryResponse } from "../../models/responses/category/select-category-response";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/category/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách loại sản phẩm
  getCategoriesByLevel(): Observable<ResponseApi<ListCategoryResponse[]>> {
    return this.http
      .get<ResponseApi<ListCategoryResponse[]>>(
        this.apiUrl + "GetCategoriesByLevel"
      )
      .pipe(
        tap((response: ResponseApi<ListCategoryResponse[]>) => {
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

  // Thêm loại sản phẩm
  create(request: CreateCategoryRequest): Observable<ResponseApi<string>> {
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

  // Lấy loại sản phẩm theo code
  getCategoryByCode(codeCategory: string): Observable<ResponseApi<any>> {
    const params = new HttpParams().set("codeCategory", codeCategory);

    return this.http
      .get<ResponseApi<any>>(this.apiUrl + "GetCategoryByCode", { params })
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

  // Xóa loại sản phẩm
  delete(categoryId: string): Observable<ResponseApi<string>> {
    const params = new HttpParams().set("categoryId", categoryId);

    return this.http
      .delete<ResponseApi<string>>(this.apiUrl + "Delete", { params })
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

  // Xem chi tiết loại sản phẩm
  details(categoryId: string): Observable<ResponseApi<DetailsCategoryResponse>> {
    const params = new HttpParams().set("categoryId", categoryId);

    return this.http
      .get<ResponseApi<DetailsCategoryResponse>>(this.apiUrl + "Details", { params })
      .pipe(
        tap((response: ResponseApi<DetailsCategoryResponse>) => {
          if (response.isSuccessed) {
            return response;
          } else {
            this.errorNotify.handleStatusError(response.code);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return this.errorNotify.handleStatusError(error.status);
        })
      )
  }

  // Sửa loại sản phẩm
  update(request: UpdateCategoryRequest): Observable<ResponseApi<string>> {
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
          return this.errorNotify.handleStatusError(error.status);
        })
      );
  }

  // Lấy danh sách loại sản phẩm
  getCategoriesSelect(): Observable<ResponseApi<SelectCategoryResponse[]>> {
    return this.http
      .get<ResponseApi<SelectCategoryResponse[]>>(
        this.apiUrl + "GetCategoriesSelect"
      )
      .pipe(
        tap((response: ResponseApi<SelectCategoryResponse[]>) => {
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
