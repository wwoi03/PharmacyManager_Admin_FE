import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = 'jwt_token';
  private readonly ROLES = 'roles';z
  private readonly NAME = 'name';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    // Lưu token vào session cookie với thuộc tính bảo mật
    this.cookieService.set(this.TOKEN_NAME, token, 0, '/admin', null, true, 'Strict');
  }

  getToken(): string {
    return this.cookieService.get(this.TOKEN_NAME);
  }

  deleteToken(): void {
    this.cookieService.delete(this.TOKEN_NAME, '/admin');
  }

  setRoles(roles: string[]): void {
    this.cookieService.set(this.ROLES, JSON.stringify(roles), 0, '/admin', null, true, 'Strict');
  }

  getRoles(): string[] {
    const roles = this.cookieService.get(this.ROLES);
    return roles ? JSON.parse(roles) : [];
  }

  setName(name: string): void {
    this.cookieService.set(this.NAME, name, 0, '/admin', null, true, 'Strict');
  }

  getName(): string {
    return this.cookieService.get(this.NAME);
  }

  logout(): void {
    this.cookieService.delete(this.TOKEN_NAME, '/admin');
    this.cookieService.delete(this.ROLES, '/admin');
    this.cookieService.delete(this.NAME, '/admin');
  }

  isTokenExpired(): boolean {
    var token = this.getToken();
    
    if (!token) return true;

    try {
      // Giải mã token để lấy thông tin payload, bao gồm cả `exp`
      const decodedToken: any = jwtDecode(token);

      // Kiểm tra nếu `exp` không tồn tại trong token
      if (!decodedToken.exp) {
        return true;
      }

      // Chuyển `exp` từ giây sang milliseconds
      const expirationDate = decodedToken.exp * 1000;
      const currentTime = Date.now();

      // Nếu thời gian hiện tại đã qua thời gian hết hạn thì token đã hết hạn
      return currentTime > expirationDate;
    } catch (error) {
      // Nếu có lỗi trong quá trình giải mã token, coi như token đã hết hạn hoặc không hợp lệ
      console.error('Error decoding token:', error);
      return true;
    }
  }
}
