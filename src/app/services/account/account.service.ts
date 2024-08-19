import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ResponseApi } from '../../models/response-apis/response-api';
import { SignInRequest } from '../../models/requests/account/sign-in-request';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '../../helpers/loading-service';
import { ErrorNotify } from '../../helpers/error-notify';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/account/";
  
  constructor(
    private http: HttpClient,
    private errorNotify: ErrorNotify,
    private loadingService: LoadingService
  ) { }

  // Sign In
  signIn(request: SignInRequest): Observable<ResponseApi<any>> {
    return this.http
      .post<ResponseApi<any>>(this.apiUrl + "SignIn", request)
      .pipe(
        tap((response: ResponseApi<string>) => {
          if (response.isSuccessed) {
            return response;
          } else {

          }
        })
      );
  }

  // chi tiết staff
  revokeToken(id: string): Observable<ResponseApi<string>> {
    const params = new HttpParams().set("id", id);

    this.loadingService.show();

    return this.http
      .put<ResponseApi<string>>(this.apiUrl + "RevokeToken", null, { params })
      .pipe(
        tap((response: ResponseApi<string>) => {
          setTimeout(() => {
            this.loadingService.hide();

            if (response.isSuccessed) {
              return response;
            } else {
              this.errorNotify.handleStatusError(response.code);
            }
          }, 1000)
        }),
        catchError((error: HttpErrorResponse) => {
          return this.errorNotify.handleStatusError(error.status);
        })
      );
  }
}
