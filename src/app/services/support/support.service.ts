import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../models/response-apis/response-api';
import { map, tap } from 'rxjs/operators';
import { ListSupportResponse } from '../../models/responses/support/list-support-response';
import { CreateSupportRequest } from '../../models/requests/support/create-support-request';
import { EditSupportRequest } from '../../models/requests/support/edit-support-request';
import { DetailsSupportRequest } from '../../models/requests/support/get-details-support-request';
import { SupportResponse } from '../../models/responses/support/support-response';


@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiURL: string = environment.API_BASE_URL + '/admin/Support/';

  constructor(private http: HttpClient) { }

  //Lấy danh sách
  getSupport(): Observable<ListSupportResponse[]>{
    return this.http.get<ResponseApi<ListSupportResponse[]>> (this.apiURL + 'GetSupports')
    .pipe(
      map((response: ResponseApi<ListSupportResponse[]>)=> response.obj)
    )
  }

  //Thêm bệnh
  create(request: CreateSupportRequest): Observable<ResponseApi<string>>{
    return this.http.post<ResponseApi<string>>(this.apiURL + 'CreateSupport', request)
    .pipe( tap((response: ResponseApi<string>)=> response))
  }

  //Sửa bệnh
  edit(request: EditSupportRequest): Observable<ResponseApi<string>>{
    return this.http.put<ResponseApi<string>>(this.apiURL + 'UpdateSupport', request)
    .pipe(
      tap((response: ResponseApi<string>) => response)
    )
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
      tap((response: ResponseApi<SupportResponse>)=> response)
    )
  }
}
