import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateProductDiseaseRequest } from '../../models/requests/productDisease/create-product-disease-request';
import { ProductDiseaseResponse } from '../../models/responses/productDisease/productDisease-response';

@Injectable({
  providedIn: 'root'
})
export class ProductDiseaseService {
  private apiURL: string = environment.API_BASE_URL + '/admin/';
  url: string;

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  
  getLink(link: number){
    if(link == 1){
      this.url = `${this.apiURL}Product/`;
    }
    else if(link == 2){
      this.url = `${this.apiURL}Disease/`;
    }
  }

  //Lấy danh sách
  getProductDiseases(Id: string): Observable<ResponseApi<ProductDiseaseResponse[]>>{
    const params = new HttpParams().set("id", Id);

    return this.http.get<ResponseApi<ProductDiseaseResponse[]>> (this.url + 'GetProductDiseases', {params})
    .pipe(
      tap((response: ResponseApi<ProductDiseaseResponse[]>) => {
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
   create(request: CreateProductDiseaseRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.url + 'CreateProductDisease', request)
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
  delete(diseaseId: string, productId: string): Observable<ResponseApi<string>>{
    const params = new HttpParams()
    .set("productId", productId)
    .set("diseaseId", diseaseId);
  
    return this.http.delete<ResponseApi<string>>(this.url + 'DeleteProductDisease', {params} )
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
