import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:2010/auth/token';

  constructor(private http: HttpClient) { }

  async login(credentials: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(this.baseUrl, credentials)

      );
      return response;

    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('HTTP Error:', error.status, error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
      throw error;
    }
  }

  saveToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem('jwt_token', token);   // ✅ remembered
    } else {
      sessionStorage.setItem('jwt_token', token); // ❌ removed on browser close
    }
  }

  getToken(): string | null {
    return (
      localStorage.getItem('jwt_token') ||
      sessionStorage.getItem('jwt_token')
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('username');
  }

}