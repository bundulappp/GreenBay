import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { InvoiceDataDomainModel } from '../models/domian/InvoiceDataDomainModel';
import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { utilService } from '../services/utilService';

export const invoiceRepository = {
  async getInvoiceById(invoiceId: number): Promise<InvoiceDataDomainModel> {
    const getInvoiceByIdQuery: string = `SELECT *
                                         FROM
                                                invoices
                                         WHERE
                                                id = ?`;

    const invoiceResult = await db.query<InvoiceDataDomainModel>(
      getInvoiceByIdQuery,
      [invoiceId.toString()],
    );

    return invoiceResult;
  },

  async addNewInvoice(
    invoiceData: AddNewInvoiceRequestViewModel,
  ): Promise<void> {
    const addNewInvoiceQuery: string = `INSERT INTO
                                                invoices(
                                                        item_id,
                                                        purchase_date,
                                                        buyer_id
                                                        )
                                    VALUES (
                                        ?,?,?
                                    )`;

    const date = utilService.generateDateTimeToMysql(new Date());

    await db.query<OkPacket>(addNewInvoiceQuery, [
      invoiceData.itemId.toString(),
      date,
      invoiceData.buyerId.toString(),
    ]);
  },
};
