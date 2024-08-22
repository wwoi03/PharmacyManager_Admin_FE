import { Router } from "@angular/router";
import { throwError } from "rxjs";

import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Toast } from "./toast";
import { LoadingService } from "./loading-service";

@Injectable({
  providedIn: "root",
})
export class ErrorNotify {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: Toast,
    private loadingService: LoadingService
  ) {}

  public handleStatusError(status: number) {
    this.loadingService.show();

    if (status === 403) {
      this.loadingService.hide();
      this.router.navigate(["/admin/miscellaneous/not-found"]);
    } else if (status === 401) {
      // if (this.authService.isTokenExpired()) {

      // }

      this.authService.deleteToken();
      this.toast.dangerToast(
        "Lỗi",
        "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại."
      );
      setTimeout(() => {
        this.loadingService.hide();
        this.router.navigate(["/admin-public/sign-in"]);
      }, 3000);
    } else if (status === 500) {
      this.toast.dangerToast("Lỗi hệ thống", "Vui lòng thử lại.");
      setTimeout(() => {
        this.loadingService.hide();
        this.router.navigate(["/admin/miscellaneous/not-found"]);
      }, 3000);
    }

    this.loadingService.hide();

    return throwError(() => new Error("Mày phá đúng không?"));
  }
}
