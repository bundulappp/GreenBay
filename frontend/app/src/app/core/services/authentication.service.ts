import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, mapTo, Observable, of, tap } from 'rxjs';
import { UserLoginRequestViewModel } from 'src/app/shared/models/UserLoginRequestViewModel';
import { UserLoginViewModel } from 'src/app/shared/models/UserLoginViewModel';
import { UserRegistrationRequestViewModel } from 'src/app/shared/models/UserRegistrationRequestViewModel';
import { UserWithDollarViewModel } from 'src/app/shared/models/UserWithDollarViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userNameObject = new BehaviorSubject<string>(this.getUsername());
  userNameObservable$ = this.userNameObject.asObservable();

  private userDollarObject = new BehaviorSubject<string>(this.getUserDollar());
  userDollarObservable$ = this.userDollarObject.asObservable();

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

  getUsername(): string {
    return localStorage.getItem('username') as string;
  }

  setUserDollar(dollar: number): void {
    localStorage.setItem('dollar', dollar.toString());
  }

  getUserDollar(): string {
    return localStorage.getItem('dollar') as string;
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
          this.setUserDollar(response.dollar);
          this.router.navigate(['/main/list']);
        }),
        mapTo(undefined)
      );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  getUserInfo(): Observable<UserWithDollarViewModel> {
    return this.http.get<UserWithDollarViewModel>(
      `${environment.apiUrl}/user/money`
    );
  }
}
