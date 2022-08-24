import { Request, Response, NextFunction } from 'express';
import { InvoiceDataViewModel } from '../models/view/InvoiceDataViewModel';
import { jwtService } from '../services/jwtService';
import { invoiceService } from '../services/invoiceService';
import { badRequestError } from '../services/generalErrorService';
import { AddNewInvoiceRequestViewModel } from '../models/request/AddNewInvoiceRequestViewModel';

export const invoiceController = {
  async getInvoiceById(
    req: Request,
    res: Response<InvoiceDataViewModel>,
    next: NextFunction,
  ) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    try {
      const invoice = await invoiceService.getInvoiceByBuyerId(userId);
      res.status(200).send(invoice);
    } catch (error) {
      next(error);
    }
  },

  async addNewInvoice(req: Request, res: Response, next: NextFunction) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    const { itemId } = req.body;

    if (!itemId) {
      next(badRequestError('item id is required'));
      return;
    }

    const invoiceData: AddNewInvoiceRequestViewModel = {
      itemId,
      buyerId: userId,
    };

    try {
      await invoiceService.addNewInvoice(invoiceData);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
};
