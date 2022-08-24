import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { InvoiceDataDomainModel } from '../models/domian/InvoiceDataDomainModel';
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

  async addNewInvoice(itemId: number, userId: number): Promise<number> {
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

    const newInvoiceId = await db.query<OkPacket>(addNewInvoiceQuery, [
      itemId.toString(),
      date,
      userId.toString(),
    ]);

    return newInvoiceId.insertId;
  },
};
