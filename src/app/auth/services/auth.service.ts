import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, LoginCredentials } from '../models/auth.interface';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
        `${this.API_URL}${API_ENDPOINTS.auth.login}`, 
        credentials
    );
  }
}