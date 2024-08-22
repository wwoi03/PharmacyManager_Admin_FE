import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { PromotionResponse } from '../../models/responses/promotion/promotion-response';
import { catchError, tap } from 'rxjs/operators';
import { PromotionRequest } from '../../models/requests/promotion/promotion-create-request';
import { EditPromotionRequest } from '../../models/requests/promotion/promotion-edit-request';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Promotion/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify,
    private authService: AuthService) { 

  }

  //Lấy danh sách
  getPromotions(): Observable<ResponseApi<PromotionResponse[]>>{
    
    return this.http.get<ResponseApi<PromotionResponse[]>> (this.apiURL + 'GetPromotions')
    .pipe(
      tap((response: ResponseApi<PromotionResponse[]>) => {
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

  
  //Thêm khuyến mãi
  create(request: PromotionRequest): Observable<ResponseApi<string>>{
      return this.http.post<ResponseApi<string>>(this.apiURL + 'CreatePromotion', request)
      .pipe( tap((response: ResponseApi<string>) => {
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

  //Xóa khuyến mãi
  delete(request: string): Observable<ResponseApi<string>>{
    const params = new HttpParams().set("id", request);

    return this.http.delete<ResponseApi<string>>(this.apiURL + 'DeletePromotion', {params})
      .pipe( tap((response: ResponseApi<string>) => {
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

  //Sửa khuyến mãi
  edit(request: EditPromotionRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdatePromotion', request)
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

  //Chi tiết khuyến mãi
  details(request: string) : Observable<ResponseApi<PromotionResponse>>{
    const params = new HttpParams().set("id", request);

    return this.http.get(this.apiURL + 'DetailsPromotion', {params})
    .pipe(
      tap((response: ResponseApi<PromotionResponse>) => {
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