import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AddItemResponseViewModel } from 'src/app/shared/models/AddItemResponseViewModel';
import { AddNewItemRequestViewModel } from 'src/app/shared/models/AddNewItemRequestViewModel';
import { ItemDataViewModel } from 'src/app/shared/models/ItemDataViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private router: Router) {}

  addNewItem(newItemObject: AddNewItemRequestViewModel): Observable<void> {
    return this.http
      .post<AddItemResponseViewModel>(
        `${environment.apiUrl}/item`,
        newItemObject
      )
      .pipe(
        tap((x) => {
          this.router.navigate([`/main/view-item`, x.itemId]);
        }),
        map(() => undefined)
      );
  }

  getItemData(itemId: number): Observable<ItemDataViewModel> {
    return this.http.get<ItemDataViewModel>(
      `${environment.apiUrl}/item/${itemId}`
    );
  }

  getAllSaleableItems(): Observable<ItemDataViewModel[]> {
    return this.http.get<ItemDataViewModel[]>(`${environment.apiUrl}/item`);
  }

  setItemSalability(itemId: number): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/item/modify/${itemId}`,
      null
    );
  }
}
