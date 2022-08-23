import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserWithDollarViewModel } from 'src/app/shared/models/UserWithDollarViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDollar(): Observable<UserWithDollarViewModel> {
    return this.http.get<UserWithDollarViewModel>(
      `${environment.apiUrl}/user-details/money`
    );
  }
}
