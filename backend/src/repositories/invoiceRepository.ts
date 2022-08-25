import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { InvoiceDataDomainModel } from '../models/domian/InvoiceDataDomainModel';
import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { utilService } from '../services/utilService';

export const invoiceRepository = {
  async getInvoiceByBuyerId(buyerId: number): Promise<InvoiceDataDomainModel> {
    const getInvoiceByIdQuery: string = `SELECT *
                                         FROM
                                                invoices
                                         WHERE
                                                buyer_id = ?`;

    const invoiceResult = await db.query<InvoiceDataDomainModel>(
      getInvoiceByIdQuery,
      [buyerId.toString()],
    );

    return invoiceResult;
  },

  async addNewInvoice(
    invoiceData: AddNewInvoiceRequestViewModel,
  ): Promise<number> {
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

    const invoice = await db.query<OkPacket>(addNewInvoiceQuery, [
      invoiceData.itemId.toString(),
      date,
      invoiceData.buyerId.toString(),
    ]);

    return invoice.insertId;
  },
};
