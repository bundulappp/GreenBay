import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AddItemResponseViewModel } from 'src/app/shared/models/AddItemResponseViewModel';
import { AddNewItemRequestViewModel } from 'src/app/shared/models/AddNewItemRequestViewModel';
import { ItemDataViewModel } from 'src/app/shared/models/ItemDataViewModel';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  getItemData(itemId: number): Observable<ItemDataViewModel> {
    return this.http.get<ItemDataViewModel>(
      `${environment.apiUrl}/item/${itemId}`
    );
  }

  getAllSaleableItems(): Observable<ItemDataViewModel[]> {
    return this.http.get<ItemDataViewModel[]>(`${environment.apiUrl}/item`);
  }

  getDisabledUserItem(): Observable<ItemDataViewModel[]> {
    return this.http.get<ItemDataViewModel[]>(
      `${environment.apiUrl}/user-details/item`
    );
  }

  setItemSalability(itemId: number): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/item/selable/${itemId}`,
      null
    );
  }

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

  buyItem(itemId: number): Observable<void> {
    return this.http
      .put<void>(`${environment.apiUrl}/item/buy`, {
        itemId,
      })
      .pipe(
        tap(() => {
          this.snackBarService.showSuccessMessage(
            'You bought the item successfully'
          );

          this.router.navigate(['/main/list']);
        })
      );
  }
}
