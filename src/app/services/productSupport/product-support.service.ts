import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { ProductSupportResponse } from '../../models/responses/productSupport/productSupport-response';
import { catchError, tap } from 'rxjs/operators';
import { CreateProductSupportRequest } from '../../models/requests/productSupport/create-product-support-request';

@Injectable({
  providedIn: 'root'
})
export class ProductSupportService {
  private apiURL: string = environment.API_BASE_URL + '/admin/';
  url: string;

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  
  getLink(link: number){
    if(link == 1){
      this.url = `${this.apiURL}Product/`;
    }
    else if(link == 2){
      this.url = `${this.apiURL}Support/`;

    }
  }

  //Lấy danh sách
  getProductSupports(Id: string): Observable<ResponseApi<ProductSupportResponse[]>>{
    const params = new HttpParams().set("id", Id);

    return this.http.get<ResponseApi<ProductSupportResponse[]>> (this.url + 'GetProductSupports', {params})
    .pipe(
      tap((response: ResponseApi<ProductSupportResponse[]>) => {
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

   //Tạo
   create(request: CreateProductSupportRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.url + 'CreateProductSupport', request)
    .pipe(   tap((response: ResponseApi<string>) => {
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
  //Xóa
  delete(supportId: string, productId: string): Observable<ResponseApi<string>>{
    const params = new HttpParams()
    .set("productId", productId)
    .set("supportId", supportId);
  
    return this.http.delete<ResponseApi<string>>(this.url + 'DeleteProductSupport', {params} )
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
