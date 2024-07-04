import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Đảm bảo bạn đã tạo AuthService như hướng dẫn trước đó

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/admin-public/sign-in']); // Chuyển hướng đến trang đăng nhập của bạn
      return false;
    }
  }
}
