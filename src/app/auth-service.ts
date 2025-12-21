import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:2010/auth/token';

  constructor(private http: HttpClient) {}

  login(credentials: any) {
  return this.http.post(
    'http://localhost:2010/auth/token',
    credentials,
    { responseType: 'text' } // 🔑 IMPORTANT
  );
}


  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }
}