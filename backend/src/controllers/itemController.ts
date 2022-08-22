import { NextFunction, Response, Request } from 'express';
import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { GetAllSaleableItemViewModel } from '../models/view/GetAllSaleableItemViewModel';
import { GetItemsByUserIdViewModel } from '../models/view/GetItemsByUserIdViewModel';
import { badRequestError } from '../services/generalErrorService';
import { itemService } from '../services/itemService';
import { jwtService } from '../services/jwtService';
import { utilService } from '../services/utilService';

export const itemController = {
  async getAllSaleableItems(
    req: Request,
    res: Response<GetAllSaleableItemViewModel[]>,
    next: NextFunction,
  ) {
    try {
      const items = await itemService.getAllSelableItems();
      res.status(200).send(items);
    } catch (error) {
      next(error);
    }
  },

  async getDisabledItemsByUserId(
    req: Request,
    res: Response<GetItemsByUserIdViewModel[]>,
    next: NextFunction,
  ) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);

    try {
      const items = await itemService.getDisabledItemsByUserId(userId);
      res.status(200).send(items);
    } catch (error) {
      next(error);
    }
  },

  async getItemData(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (isNaN(+id)) {
      next(badRequestError('Item id need to be a number'));
      return;
    }

    try {
      const item = await itemService.getItemData(+id);
      res.status(200).send(item);
    } catch (error) {
      next(error);
    }
  },

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
      return;
    }

    const isPriceValid = utilService.isValidPrice(price);

    if (!isPriceValid) {
      next(badRequestError('Price should be a positive whole number'));
      return;
    }

    const newItem: AddNewItemRequestModel = {
      itemName: name,
      description,
      photoUrl,
      price,
      userId,
    };

    try {
      const itemId = await itemService.addNewItem(newItem);
      res.status(201).send({ itemId });
    } catch (error) {
      next(error);
    }
  },

  async setItemSalability(req: Request, res: Response, next: NextFunction) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);
    const { id } = req.params;

    if (isNaN(+id)) {
      next(badRequestError('Item id need to be a number'));
      return;
    }

    try {
      await itemService.setItemSalability(+id, userId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async buyItem(req: Request, res: Response, next: NextFunction) {
    const token = jwtService.getTokenFromRequest(req);
    const { userId } = jwtService.getTokenPayload(token);
    const { itemId } = req.body;

    if (!itemId) {
      next(badRequestError('Item id is required'));
      return;
    }

    try {
      await itemService.buyItem(+itemId, userId);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
