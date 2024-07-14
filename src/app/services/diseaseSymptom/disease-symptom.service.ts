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
  apiURL: string = environment.API_BASE_URL + '/admin/';
  url: string;
  constructor(private http: HttpClient, private errorNotify : ErrorNotify) { }

  getLink(link: number){
    if(link == 1){
      this.url = `${this.apiURL}Disease/`;
    }
    else if(link == 2){
      this.url = `${this.apiURL}Symptom/`;
    }
  }

  //Lấy danh sách bệnh-triệu chứng
  getDiseaseSymptoms(Id: string): Observable<ResponseApi<DiseaseSymptomResponse[]>>{
    const params = new HttpParams().set("id", Id);

    return this.http.get<ResponseApi<DiseaseSymptomResponse[]>> (this.url + 'GetDiseaseSymptoms', {params})
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


  // //Lấy danh sách triệu chứng-bệnh
  // getSymptomDiseases(symptomId: string): Observable<ResponseApi<DiseaseSymptomResponse[]>>{
  //   const params = new HttpParams().set("id", symptomId);

  //   return this.http.get<ResponseApi<DiseaseSymptomResponse[]>> (this.url + 'GetSymptomDiseases', {params})
  //   .pipe(

  //     tap((response: ResponseApi<DiseaseSymptomResponse[]>) => {
  //       if (response.isSuccessed) {
  //         return response;
  //       } else {
  //         this.errorNotify.handleStatusError(response.code);
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       return this.errorNotify.handleStatusError(error.status);
  //     })
  //   );
  // }

  //Tạo
  create(request: CreateDiseaseSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.url + 'CreateDiseaseSymptom', request)
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
  
    return this.http.delete<ResponseApi<string>>(this.url + 'DeleteDiseaseSymptom', {params} )
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
