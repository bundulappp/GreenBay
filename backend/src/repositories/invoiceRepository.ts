import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { InvoiceDataDomainModel } from '../models/domian/InvoiceDataDomainModel';
import { InvoiceDataWithItemDataDomainModel } from '../models/domian/InvoiceDataWithItemDataDomainModel';
import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';
import { utilService } from '../services/utilService';

export const invoiceRepository = {
  async getInvoiceByBuyerId(
    buyerId: number,
  ): Promise<InvoiceDataWithItemDataDomainModel[]> {
    const getInvoiceByBuyerIdQuery: string = `SELECT 
                                                    i.id, i.purchase_date, it.name, it.price
                                              FROM
                                                    invoices i
                                              JOIN
                                                    items it
                                              ON
                                                    i.item_id = it.id
                                              WHERE
                                                    buyer_id = ?`;

    const invoiceResult = await db.query<InvoiceDataWithItemDataDomainModel[]>(
      getInvoiceByBuyerIdQuery,
      [buyerId.toString()],
    );

    return invoiceResult;
  },

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
