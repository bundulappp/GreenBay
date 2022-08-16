import { NextFunction, Response, Request } from 'express';
import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { badRequestError } from '../services/generalErrorService';
import { itemService } from '../services/itemService';
import { jwtService } from '../services/jwtService';
import { utilService } from '../services/utilService';

export const itemController = {
  async addNewItem(req: Request, res: Response, next: NextFunction) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    const { itemName, description, photoUrl, price } = req.body;

    if (!itemName) {
      next(badRequestError('Item name is required'));
      return;
    }

    if (!description) {
      next(badRequestError('Item description is required'));
      return;
    }

    if (!photoUrl) {
      next(badRequestError('PhotoUrl is required'));
      return;
    }

    if (!price) {
      next(badRequestError('Item price is required'));
      return;
    }

    const isUrlValid = utilService.isValidUrl(photoUrl);

    if (!isUrlValid) {
      next(badRequestError('PhotoUrl is invalid'));
      return;
    }

    const isPriceValid = utilService.isValidPrice(price);

    if (!isPriceValid) {
      next(badRequestError('Price should be a positive whole number'));
      return;
    }

    const newItem: AddNewItemRequestModel = {
      itemName,
      description,
      photoUrl,
      price,
      userId,
    };

    try {
      await itemService.addNewItem(newItem);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async getItemData(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (isNaN(+id)) {
      next(badRequestError('Id is not a number'));
      return;
    }

    try {
      const item = await itemService.getItemData(+id);
      res.status(200).send(item);
    } catch (error) {
      next(error);
    }
  },
};
