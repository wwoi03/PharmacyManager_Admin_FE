import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ErrorNotify } from "../../helpers/error-notify";
import { Observable } from "rxjs";
import { ResponseApi } from "../../models/response-apis/response-api";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  private apiUrl: string = environment.API_BASE_URL + "/admin/upload/";
  private apiUrlPhoto: string = "http://localhost:5281" + "/Photos/";

  constructor(private http: HttpClient, private errorNotify: ErrorNotify) {}

  // save file
  saveFile(file: File): Observable<ResponseApi<string>> {
    let formData = new FormData();
    formData.append("file", file, file.name);

    return this.http
      .post<ResponseApi<string>>(this.apiUrl + "SaveFile", formData)
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

  // Load Image
  loadImage(fileName: string) {
    return this.apiUrlPhoto + fileName;
  }
}
