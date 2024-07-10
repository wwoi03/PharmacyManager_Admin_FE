import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { catchError, map, tap } from 'rxjs/operators';
import { ListSupportResponse } from '../../models/responses/support/list-support-response';
import { CreateSupportRequest } from '../../models/requests/support/create-support-request';
import { EditSupportRequest } from '../../models/requests/support/edit-support-request';
import { DetailsSupportRequest } from '../../models/requests/support/get-details-support-request';
import { SupportResponse } from '../../models/responses/support/support-response';
import { ErrorNotify } from '../../helpers/error-notify';


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Support/';

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) { }

  //Lấy danh sách
  getSupport(): Observable<ResponseApi<ListSupportResponse[]>>{
    return this.http.get<ResponseApi<ListSupportResponse[]>> (this.apiURL + 'GetSupports')
    .pipe( map((response: ResponseApi<ListSupportResponse[]>) => {
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

  //Thêm bệnh
  create(request: CreateSupportRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateSupport', request)
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

  //Sửa bệnh
  edit(request: EditSupportRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateSupport', request)
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

  //Chi tiết bệnh
  details(request: DetailsSupportRequest) : Observable<ResponseApi<SupportResponse>>{
     // Tạo HttpParams từ đối tượng request
     let params = new HttpParams();
     for (const key in request) {
       if (request.hasOwnProperty(key)) {
         params = params.append(key, request[key]);
       }
     }

    return this.http.get(this.apiURL + 'DetailsSupport', {params})
    .pipe(
      map((response: ResponseApi<SupportResponse>) => {
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

  //xóa Hỗ trợ
delete(supportId: string): Observable<ResponseApi<string>>{

  //const url = `${this.apiURL}DeleteSupport`;
     const params = new HttpParams().set("id", supportId);
  
    return this.http.delete<ResponseApi<string>>(this.apiURL + 'DeleteSupport',{params} )
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
