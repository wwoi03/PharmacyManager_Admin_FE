import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ResponseApi } from '../../models/response-apis/response-api';
import { listDiseaseResponse } from '../../models/responses/disease/list-disease-response';
import { CreateDiseaseRequest } from '../../models/requests/disease/create-disease-request';

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
}
