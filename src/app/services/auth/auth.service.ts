import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = 'jwt_token';
  private readonly ROLES = 'roles';
  private readonly NAME = 'name';

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

  setRoles(roles: string[]): void {
    this.cookieService.set(this.ROLES, JSON.stringify(roles), 0, '/', null, true, 'Strict');
  }

  getRoles(): string[] {
    const roles = this.cookieService.get(this.ROLES);
    return roles ? JSON.parse(roles) : [];
  }

  setName(name: string): void {
    this.cookieService.set(this.NAME, name, 0, '/', null, true, 'Strict');
  }

  getName(): string {
    return this.cookieService.get(this.NAME);
  }

  logout(): void {
    this.cookieService.delete(this.TOKEN_NAME, '/');
    this.cookieService.delete(this.ROLES, '/');
    this.cookieService.delete(this.NAME, '/');
  }
}
