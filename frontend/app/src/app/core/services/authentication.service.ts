import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, mapTo, Observable, of, tap } from 'rxjs';
import { UserLoginRequestViewModel } from 'src/app/shared/models/UserLoginRequestViewModel';
import { UserLoginViewModel } from 'src/app/shared/models/UserLoginViewModel';
import { UserRegistrationRequestViewModel } from 'src/app/shared/models/UserRegistrationRequestViewModel';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

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

  getUsername(): string {
    return localStorage.getItem('username') as string;
  }

  register(userData: UserRegistrationRequestViewModel): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/user/register`, userData)
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
          this.snackBarService.showSuccessMessage(
            'You have registered successfully'
          );
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
          this.router.navigate(['/main/list']);
          this.snackBarService.showSuccessMessage(
            'You have logged in successfully'
          );
        }),
        mapTo(undefined)
      );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
