import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Tipamos la respuesta que nos dará FastAPI
export interface LoginResponse {
  access_token: string;
  token_type: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // En la vida real esta URL iría en un archivo de entorno
  private apiUrl = 'http://localhost:8000';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      credentials
    );
  }

  getProtectedData(): Observable<any> {
    // El interceptor añadirá el token automáticamente
    // Aquí no hay que hacer nada especial
    return this.http.get(`${this.apiUrl}/protected/me`);
  }
}
