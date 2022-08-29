import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { InvoiceDataViewModel } from 'src/app/shared/models/InvoiceDataViewModel';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  userInvoices: InvoiceDataViewModel[];
  columnsToDisplay = ['id', 'purchase_date', 'name', 'price'];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoiceByBuyerId().subscribe((x) => {
      this.userInvoices = x;
    });
  }
}
