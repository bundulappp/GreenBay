import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, InvoiceRoutingModule, SharedModule],
})
export class InvoiceModule {}
