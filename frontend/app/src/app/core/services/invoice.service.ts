import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { InvoiceDataViewModel } from 'src/app/shared/models/InvoiceDataViewModel';
import { environment } from 'src/environments/environment';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  getInvoiceById(invoiceId: number): Observable<InvoiceDataViewModel> {
    return this.http.get<InvoiceDataViewModel>(
      `${environment.apiUrl}/${invoiceId}`
    );
  }

  addNewInvoice(itemId: number): Observable<number> {
    return this.http
      .post<number>(`${environment.apiUrl}/invoice`, {
        itemId,
      })
      .pipe(
        tap(() =>
          this.snackBarService.showSuccessMessage('Your invoice is ready')
        )
      );
  }
}
