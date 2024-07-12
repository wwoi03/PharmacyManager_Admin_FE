import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ErrorNotify } from '../../helpers/error-notify';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { catchError, tap } from 'rxjs/operators';
import { CreateDiseaseSymptomRequest } from '../../models/requests/diseaseSymptom/create-disease-symptom-request';
import { DiseaseSymptomResponse } from '../../models/responses/diseaseSymptom/diseaseSympton-response';

@Injectable({
  providedIn: 'root'
})
export class DiseaseSymptomService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Disease/';

  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  //Lấy danh sách
  getDiseaseSymptoms(diseaseId: string): Observable<ResponseApi<DiseaseSymptomResponse[]>>{
    const params = new HttpParams().set("id", diseaseId);

    return this.http.get<ResponseApi<DiseaseSymptomResponse[]>> (this.apiURL + 'GetDiseaseSymptoms', {params})
    .pipe(

      tap((response: ResponseApi<DiseaseSymptomResponse[]>) => {
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
  create(request: CreateDiseaseSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateDiseaseSymptom', request)
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
  delete(diseaseId: string, symptomId: string): Observable<ResponseApi<string>>{
    const params = new HttpParams()
    .set("symptomId", symptomId)
    .set("diseaseId", diseaseId);
  
    return this.http.delete<ResponseApi<string>>(this.apiURL + 'DeleteDiseaseSymptom', {params} )
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
