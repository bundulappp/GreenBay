import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  duration = 4000;
  actionText = 'close';
  constructor(private snackBar: MatSnackBar) {}

  showErrorMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, this.actionText, {
      duration: this.duration,
      panelClass: ['red-snackbar'],
    });
  }

  showSuccessMessage(successMessage: string): void {
    this.snackBar.open(successMessage, this.actionText, {
      duration: this.duration,
      panelClass: ['green-snackbar'],
    });
  }
}
