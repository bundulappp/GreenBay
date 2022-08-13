import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { UserLoginRequestViewModel } from 'src/app/shared/models/UserLoginRequestViewModel';
import { UserLoginViewModel } from 'src/app/shared/models/UserLoginViewModel';
import { UserRegistrationRequestViewModel } from 'src/app/shared/models/UserRegistrationRequestViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  register(userData: UserRegistrationRequestViewModel): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/user/register`, userData)
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        }),
        catchError(() => of())
      );
  }

  login(loginData: UserLoginRequestViewModel): Observable<void> {
    return this.http
      .post<UserLoginViewModel>(`${environment.apiUrl}/user/login`, loginData)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setUsername(response.username);
          this.router.navigate(['/main']);
        }),
        mapTo(undefined)
      );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
