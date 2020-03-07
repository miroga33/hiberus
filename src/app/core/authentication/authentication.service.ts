import { Injectable } from '@angular/core';
import { Register } from '../../models/register.model';
import { environment } from '../../globals/environments/environment';
import { AuthLoginDto } from '../../models/authLoginDto.model';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: HttpClient) { }

  logIn(auth: AuthLoginDto) {
    const url = environment.apiBaseAuth + '/login';
    return this.http.post(url, auth);

  }
  register(registerUser: Register) {
    const url = environment.apiBaseAuth + '/register';
    return this.http.post(url, registerUser);
  }

  getUser(): Token {
    if (this.loggedIn) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return null;
  }

  getToken(): string {
    if (this.loggedIn()) {
      return JSON.parse(localStorage.getItem('token')).accessToken;
    }
    return null;
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
