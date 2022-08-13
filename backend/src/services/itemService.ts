import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { itemRepository } from '../repositories/itemRepository';

export const itemService = {
  async addNewItem(newItem: AddNewItemRequestModel) {
    await itemRepository.addNewItem(
      newItem.name,
      newItem.description,
      newItem.photoUrl,
      newItem.price,
      newItem.userId,
    );
  },
};
