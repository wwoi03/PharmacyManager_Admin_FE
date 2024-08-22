import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ListProductResponse } from '../../models/responses/product/list-product-response';
import { ResponseApi } from '../../models/response-apis/response-api';
import { catchError, tap } from 'rxjs/operators';
import { CreateProductRequest } from '../../models/requests/product/create-product-request';
import { SelectProductResponse } from '../../models/responses/product/select-product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/product/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // Lấy danh sách sản phẩm
  getProducts(): Observable<ResponseApi<ListProductResponse[]>> {
    return this.http
      .get<ResponseApi<ListProductResponse[]>>(this.apiUrl + "GetProducts")
      .pipe(
        tap((response: ResponseApi<ListProductResponse[]>) => {
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
  create(request: CreateProductRequest): Observable<ResponseApi<string>> {
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

  // Product Select
  getProductsSelect(): Observable<ResponseApi<SelectProductResponse[]>> {
    return this.http
      .get<ResponseApi<SelectProductResponse[]>>(this.apiUrl + "GetProductsSelect")
      .pipe(
        tap((response: ResponseApi<SelectProductResponse[]>) => {
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

  // delete
  delete(productId: string): Observable<ResponseApi<string>> {
    const params = new HttpParams().set("productId", productId);

    return this.http
      .delete<ResponseApi<string>>(
        this.apiUrl + "Delete", { params }
      )
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

}
