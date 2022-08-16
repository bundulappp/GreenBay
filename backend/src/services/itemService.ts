import { ItemDataDomainModel } from '../models/domian/ItemDataDomainModel';
import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { itemRepository } from '../repositories/itemRepository';
import { userRepository } from '../repositories/userRepository';
import { notFoundError } from './generalErrorService';

export const itemService = {
  async addNewItem(newItem: AddNewItemRequestModel) {
    const user = userRepository.getUserById(newItem.userId);

    if (!user) {
      throw notFoundError('User not found with this id');
    }

    await itemRepository.addNewItem(
      newItem.itemName,
      newItem.description,
      newItem.photoUrl,
      newItem.price,
      newItem.userId,
    );
  },

  async getItemData(id: number): Promise<ItemDataDomainModel> {
    const itemData = await itemRepository.getItemById(id);

    if (!itemData) {
      throw notFoundError('Item not found');
    }

    return itemData;
  },
};
