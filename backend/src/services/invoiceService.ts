import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { InvoiceDataViewModel } from '../models/view/InvoiceDataViewModel';
import { InvoiceDataWithItemDataViewModel } from '../models/view/InvoiceDataWithItemDataViewModel';
import { invoiceRepository } from '../repositories/invoiceRepository';
import { notFoundError } from './generalErrorService';
import { itemService } from './itemService';

export const invoiceService = {
  async getInvoiceByBuyerId(
    buyerId: number,
  ): Promise<InvoiceDataWithItemDataViewModel[]> {
    const invoice = await invoiceRepository.getInvoiceByBuyerId(buyerId);

    if (!invoice) {
      throw notFoundError('Invoice not found');
    }

    return invoice;
  },

  async getInvoiceById(invoiceId: number): Promise<InvoiceDataViewModel> {
    const invoice = await invoiceRepository.getInvoiceById(invoiceId);

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
