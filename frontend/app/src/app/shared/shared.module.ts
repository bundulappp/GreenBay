import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HeaderComponent, InvoiceDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    HeaderComponent,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
