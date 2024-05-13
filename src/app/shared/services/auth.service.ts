import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginData, SignupData } from '../models/auth-data.model';
import { Router } from '@angular/router';

const APIUrl = environment.apiUrl;

export type Auth = {
  token: string;
  userId: string;
  nick: string;
  expiresIn: number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = signal(false);

  token = signal('');

  userId = signal('');

  nick = signal('');

  expiresIn: any;

  constructor(
    private http: HttpClient,
    private router: Router,
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
      this.router.navigate(['/my-recipes']);
    });
  }

  private setAuth(logged: boolean, auth: Auth): void {
    this.isLogged.set(logged);
    this.token.set(auth.token);
    this.userId.set(auth.userId);
    this.nick.set(auth.nick);

    if (!auth.expiresIn) return;
    this.expiresIn = setTimeout(() => {
      this.logout();
    }, this.timeToExpire(auth.expiresIn));
  }

  private timeToExpire(expiresIn: number): number {
    const now = new Date().getTime();
    return expiresIn - now;
  }

  logout(): void {
    localStorage.removeItem('recipe-app');
    this.setAuth(false, {
      token: '',
      userId: '',
      nick: '',
      expiresIn: 0,
    });
    clearTimeout(this.expiresIn);
    this.router.navigate(['/global-list']);
  }

  signup(value: SignupData): void {
    this.http.post(APIUrl + '/signup', value).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
