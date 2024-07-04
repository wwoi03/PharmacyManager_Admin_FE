import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_NAME = 'jwt_token';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    // Lưu token vào session cookie với thuộc tính bảo mật
    this.cookieService.set(this.TOKEN_NAME, token, 0, '/', null, true, 'Strict');
  }

  getToken(): string {
    return this.cookieService.get(this.TOKEN_NAME);
  }

  deleteToken(): void {
    this.cookieService.delete(this.TOKEN_NAME, '/');
  }
}
