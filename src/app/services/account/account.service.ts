import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from '../../models/response-apis/response-api';
import { SignInRequest } from '../../models/requests/account/sign-in-request';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/account/";
  
  constructor(
    private http: HttpClient,
  ) { }

  // Sign In
  signIn(request: SignInRequest): Observable<ResponseApi<string>> {
    return this.http
      .post<ResponseApi<string>>(this.apiUrl + "SignIn", request)
      .pipe(
        tap((response: ResponseApi<string>) => {
          if (response.isSuccessed) {
            return response;
          } else {

          }
        })
      );
  }
}
