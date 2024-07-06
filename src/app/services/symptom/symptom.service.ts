import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { map, tap } from 'rxjs/operators';
import { ListSymptomResponse } from '../../models/responses/symptom/list-symptom-response';
import { DetailsSymptomRequest } from '../../models/requests/symptom/get-details-symptom-request';
import { SymptomResponse } from '../../models/responses/symptom/symptom-response';
import { CreateSymptomRequest } from '../../models/requests/symptom/create-symptom-request';
import { EditSymptomRequest } from '../../models/requests/symptom/edit-symptom-request';


@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Symptom/';

  constructor(private http: HttpClient) { }

  //Lấy danh sách
  getSymptom(): Observable<ListSymptomResponse[]>{
    return this.http.get<ResponseApi<ListSymptomResponse[]>> (this.apiURL + 'GetSymptoms')
    .pipe(
      map((response: ResponseApi<ListSymptomResponse[]>)=> response.obj)
    )
  }

  //Thêm bệnh
  create(request: CreateSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateSymptom', request)
    .pipe( tap((response: ResponseApi<string>)=> response))
  }

  //Sửa bệnh
  edit(request: EditSymptomRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateSymptom', request)
    .pipe(
      tap((response: ResponseApi<string>) => response)
    )
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
      tap((response: ResponseApi<SymptomResponse>)=> response)
    )
  }
}
