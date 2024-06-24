import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListStaffResponse } from '../../models/responses/staff/list-staff-response';
import { ResponseApi } from '../../models/response-apis/response-api';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl: string = environment.API_BASE_URL + '/admin/staff/';

  constructor(private http: HttpClient) { }

  getStaffs(): Observable<ListStaffResponse[]> {
    // var result = this.http.get<ResponseApi<ListStaffResponse[]>>(this.apiUrl + 'GetStaffs');

    return this.http.get<ResponseApi<ListStaffResponse[]>>(this.apiUrl + 'GetStaffs')
      .pipe(
        map((response: ResponseApi<ListStaffResponse[]>) => response.obj)
      );
  }
}