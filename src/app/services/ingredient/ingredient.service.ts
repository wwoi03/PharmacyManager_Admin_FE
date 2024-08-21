import { Injectable } from "@angular/core";
import { ErrorNotify } from "../../helpers/error-notify";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { SelectIngredientResponse } from "../../models/responses/ingredient/select-ingredient-response";
import { ResponseApi } from "../../models/response-apis/response-api";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/ingredient/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}
  
  // Product Select
  getIngredientSelect(): Observable<ResponseApi<SelectIngredientResponse[]>> {
    return this.http
      .get<ResponseApi<SelectIngredientResponse[]>>(
        this.apiUrl + "GetIngredientSelect"
      )
      .pipe(
        tap((response: ResponseApi<SelectIngredientResponse[]>) => {
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
