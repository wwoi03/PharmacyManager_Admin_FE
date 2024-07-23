import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { catchError, map, tap } from 'rxjs/operators';
import { ListSymptomResponse } from '../../models/responses/symptom/list-symptom-response';
import { DetailsSymptomRequest } from '../../models/requests/symptom/get-details-symptom-request';
import { SymptomResponse } from '../../models/responses/symptom/symptom-response';
import { CreateSymptomRequest } from '../../models/requests/symptom/create-symptom-request';
import { EditSymptomRequest } from '../../models/requests/symptom/edit-symptom-request';
import { ErrorNotify } from '../../helpers/error-notify';


@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Symptom/';

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) { }

  //Lấy danh sách
  getSymptom(): Observable<ResponseApi<ListSymptomResponse[]>>{
    return this.http.get<ResponseApi<ListSymptomResponse[]>> (this.apiURL + 'GetSymptoms')
    .pipe(
      map((response: ResponseApi<ListSymptomResponse[]>) => {
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
  create(request: CreateSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateSymptom', request)
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
  edit(request: EditSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateSymptom', request)
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
  details(request: DetailsSymptomRequest) : Observable<ResponseApi<SymptomResponse>>{
     // Tạo HttpParams từ đối tượng request
     let params = new HttpParams();
     for (const key in request) {
       if (request.hasOwnProperty(key)) {
         params = params.append(key, request[key]);
       }
     }

    return this.http.get(this.apiURL + 'DetailsSymptom', {params})
    .pipe(
      map((response: ResponseApi<SymptomResponse>) => {
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

    //xóa triệu chứng
delete(symptomId: string): Observable<ResponseApi<string>>{

  const url = `${this.apiURL}DeleteSymptom?id=${symptomId}`;
    // const params = new HttpParams().set("id", symptomId);
  
    return this.http.delete<ResponseApi<string>>(url )
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
