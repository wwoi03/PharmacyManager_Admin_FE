import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ResponseApi } from '../../models/response-apis/response-api';
import { listDiseaseResponse } from '../../models/responses/disease/list-disease-response';
import { CreateDiseaseRequest } from '../../models/requests/disease/create-disease-request';
import { EditDiseaseRequest } from '../../models/requests/disease/edit-disease-request';
import { DetailsDiseaseRequest } from '../../models/requests/disease/get-details-disease-request';
import { ErrorNotify } from '../../helpers/error-notify';
import { DiseaseResponse } from '../../models/responses/disease/disease-response';


@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Disease/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  //Lấy danh sách
  getDisease(): Observable<ResponseApi<listDiseaseResponse[]>>{
    return this.http.get<ResponseApi<listDiseaseResponse[]>> (this.apiURL + 'GetDiseases')
    .pipe(
      map((response: ResponseApi<listDiseaseResponse[]>) => {
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
  create(request: CreateDiseaseRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateDisease', request)
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

  //Sửa bệnh
  edit(request: EditDiseaseRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateDisease', request)
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
  details(request: DetailsDiseaseRequest) : Observable<ResponseApi<DiseaseResponse>>{
     // Tạo HttpParams từ đối tượng request
     let params = new HttpParams();
     for (const key in request) {
       if (request.hasOwnProperty(key)) {
         params = params.append(key, request[key]);
       }
     }

    return this.http.get(this.apiURL + 'DetailsDisease', {params})
    .pipe(
      map((response: ResponseApi<DiseaseResponse>) => {
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

  //xóa bệnh
  delete(diseaseId: string): Observable<ResponseApi<string>>{

    const params = new HttpParams().set("id", diseaseId);
  
    return this.http.delete<ResponseApi<string>>(this.apiURL + 'DeleteDisease', {params} )
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
