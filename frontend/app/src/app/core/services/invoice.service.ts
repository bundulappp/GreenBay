import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  addNewInvoice(itemId: number): Observable<void> {
    return this.http
      .post<number>(`${environment.apiUrl}/invoice`, {
        itemId,
      })
      .pipe(
        tap((x) => {
          console.log(x);
        }),
        map((x) => undefined)
      );
  }
}
