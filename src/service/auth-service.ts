import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthRequest, AuthResponse } from '../model/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl : string = "https://localhost:7084/";
  private readonly http : HttpClient = inject(HttpClient);

  public login(auth : AuthRequest ) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl.concat("api/auth/login"), auth);
  }

}
