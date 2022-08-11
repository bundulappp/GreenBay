import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserRegistrationRequestViewModel} from'../../shared/models/UserRegistrationRequestViewModel
import { UserRegistrationViewModel } from 'src/app/shared/models/UserRegistrationViewModel';
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

  register(
    userData: UserRegistrationRequestViewModel
  ): Observable<UserRegistrationViewModel> {
    return this.http
      .post<UserRegistrationViewModel>(
        `${environment.apiUrl}/user/register`,
        userData
      )
      .pipe(
        tap((response) => {
          if (response !== null) {
            this.setToken(response.token);
            this.setUsername(response.username);
            this.router.navigate(['/login']);
            return;
          }
        }),
        catchError(() => of())
      );
  }
}
