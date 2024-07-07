import { Router } from "@angular/router";
import { throwError } from "rxjs";

import { Injectable } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root',
})

export class ErrorNotify {
  constructor(private router: Router, private authService: AuthService) {}

  public handleStatusError(status: number){
    if (status === 403) {
      this.router.navigate(["/admin/miscellaneous/not-found"]);
    } else if (status === 401) {
      this.authService.deleteToken();
      this.router.navigate(["/admin-public/sign-in"]);
    }
    
    return throwError(() => new Error("Mày phá đúng không?"));
  }
}
