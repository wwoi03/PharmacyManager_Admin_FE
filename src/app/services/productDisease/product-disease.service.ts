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
  private apiURL: string = environment.API_BASE_URL + '/admin/Disease/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  //Lấy danh sách
  getProductDiseases(diseaseId: string): Observable<ResponseApi<ProductDiseaseResponse[]>>{
    const params = new HttpParams().set("id", diseaseId);

    return this.http.get<ResponseApi<ProductDiseaseResponse[]>> (this.apiURL + 'GetProductDiseases', {params})
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
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateProductDisease', request)
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
  
    return this.http.delete<ResponseApi<string>>(this.apiURL + 'DeleteProductDisease', {params} )
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
