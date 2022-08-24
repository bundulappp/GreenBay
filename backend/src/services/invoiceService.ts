import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { InvoiceDataViewModel } from '../models/view/InvoiceDataViewModel';
import { invoiceRepository } from '../repositories/invoiceRepository';
import { notFoundError } from './generalErrorService';
import { itemService } from './itemService';

export const invoiceService = {
  async getInvoiceById(invoiceId: number): Promise<InvoiceDataViewModel> {
    const invoice = await invoiceRepository.getInvoiceById(invoiceId);

    if (!invoice) {
      throw notFoundError('Invoice not found');
    }

    return invoice;
  },

  async addNewInvoice(
    invoiceData: AddNewInvoiceRequestViewModel,
  ): Promise<void> {
    const item = await itemService.getItemData(invoiceData.itemId);

    if (!item) {
      throw notFoundError('Item not found');
    }

    await invoiceRepository.addNewInvoice(invoiceData);
  },
};
