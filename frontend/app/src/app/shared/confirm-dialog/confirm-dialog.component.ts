import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ItemService } from 'src/app/core/services/item.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogItemDataViewModel } from '../models/DialogItemDataViewModel';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialog {
  constructor(
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogItemDataViewModel
  ) {}

  buyItem(): void {
    this.itemService.buyItem(this.data.itemId).subscribe(() => {
      this.invoiceService.addNewInvoice(this.data.itemId).subscribe();
    });
  }
}
