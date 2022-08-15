import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AddNewItemRequestViewModel } from 'src/app/shared/models/AddNewItemRequestViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private router: Router) {}

  addNewItem(newItemObject: AddNewItemRequestViewModel): Observable<void> {
    return this.http
      .post<AddNewItemRequestViewModel>(
        `${environment.apiUrl}/item`,
        newItemObject
      )
      .pipe(
        tap((x) => {
          console.log(x);
        }),
        map(() => undefined)
      );
  }
}
