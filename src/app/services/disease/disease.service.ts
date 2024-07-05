import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResponseApi } from '../../models/response-apis/response-api';
import { listDiseaseResponse } from '../../models/responses/disease/list-disease-response';
import { CreateDiseaseRequest } from '../../models/requests/disease/create-disease-request';
import { EditDiseaseRequest } from '../../models/requests/disease/edit-disease-request';
import { DetailsDiseaseRequest } from '../../models/requests/disease/get-details-disease-request';
import { DiseaseDTO } from '../../models/DTOs/Disease/DiseaseDTO';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Disease/';

  constructor(private http: HttpClient) { }

  //Lấy danh sách
  getDisease(): Observable<listDiseaseResponse[]>{
    return this.http.get<ResponseApi<listDiseaseResponse[]>> (this.apiURL + 'GetDiseases')
    .pipe(
      map((reponse: ResponseApi<listDiseaseResponse[]>)=> reponse.obj)
    )
  }

  //Thêm bệnh
  create(request: CreateDiseaseRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateDisease', request)
    .pipe( tap((response: ResponseApi<string>)=> response))
  }

  //Sửa bệnh
  edit(request: EditDiseaseRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateDisease', request)
    .pipe(
      tap((response: ResponseApi<string>) => response)
    )
  }

  //Chi tiết bệnh
  details(request: DetailsDiseaseRequest) : Observable<ResponseApi<DiseaseDTO>>{
     // Tạo HttpParams từ đối tượng request
     let params = new HttpParams();
     for (const key in request) {
       if (request.hasOwnProperty(key)) {
         params = params.append(key, request[key]);
       }
     }

    return this.http.get(this.apiURL + 'DetailsDisease', {params})
    .pipe(
      tap((response: ResponseApi<DiseaseDTO>)=> response)
    )
  }
}
