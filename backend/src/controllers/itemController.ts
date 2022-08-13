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

    const { name, description, photoUrl, price } = req.body;

    if (!name) {
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
    }

    const isPriceValid = utilService.isValidPrice(price);

    if (!isPriceValid) {
      next(badRequestError('Price should be a positive whole number'));
    }

    const newItem: AddNewItemRequestModel = {
      name,
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
};
