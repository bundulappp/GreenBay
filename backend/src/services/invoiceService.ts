import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { InvoiceDataViewModel } from '../models/view/InvoiceDataViewModel';
import { invoiceRepository } from '../repositories/invoiceRepository';
import { notFoundError } from './generalErrorService';
import { itemService } from './itemService';

export const invoiceService = {
  async getInvoiceByBuyerId(invoiceId: number): Promise<InvoiceDataViewModel> {
    const invoice = await invoiceRepository.getInvoiceByBuyerId(invoiceId);

    if (!invoice) {
      throw notFoundError('Invoice not found');
    }

    return invoice;
  },

  async addNewInvoice(
    invoiceData: AddNewInvoiceRequestViewModel,
  ): Promise<number> {
    const item = await itemService.getItemData(invoiceData.itemId);

    if (!item) {
      throw notFoundError('Item not found');
    }

    return await invoiceRepository.addNewInvoice(invoiceData);
  },
};
