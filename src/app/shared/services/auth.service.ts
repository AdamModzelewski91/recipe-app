import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginData, SignupData } from '../models/auth-data.model';
import { Router } from '@angular/router';

const APIUrl = environment.apiUrl;

export type Auth = {
  token: string;
  userId: string;
  nick: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = signal(false);

  token = signal('');

  userId = signal('');

  nick = signal('');

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
    this.checkLogged();
  }

  checkLogged(): void {
    const credentials = localStorage.getItem('recipe-app');
    if (credentials) {
      const parsed = JSON.parse(credentials);
      this.setAuth(true, parsed);
    }
  }

  login(value: LoginData): void {
    this.http.post<Auth>(APIUrl + '/login', value).subscribe((res) => {
      localStorage.setItem('recipe-app', JSON.stringify(res));
      this.setAuth(true, res);
      this.route.navigate(['/my-recipes']);
    });
  }

  private setAuth(logged: boolean, auth: Auth): void {
    this.isLogged.set(logged);
    this.token.set(auth.token);
    this.userId.set(auth.userId);
    this.nick.set(auth.nick);
  }

  logout(): void {
    localStorage.removeItem('recipe-app');
    this.setAuth(false, {
      token: '',
      userId: '',
      nick: '',
    });
    this.route.navigate(['/global-list']);
  }

  signup(value: SignupData): void {
    this.http.post(APIUrl + '/signup', value).subscribe(() => {});
  }
}
