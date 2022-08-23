import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsViewModel } from '../../shared/models/UserDetailsViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<UserDetailsViewModel> {
    return this.http.get<UserDetailsViewModel>(
      `${environment.apiUrl}/user-details`
    );
  }
}
