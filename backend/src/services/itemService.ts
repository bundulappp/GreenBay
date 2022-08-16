import { ItemDataDomainModel } from '../models/domian/ItemDataDomainModel';
import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { itemRepository } from '../repositories/itemRepository';
import { userRepository } from '../repositories/userRepository';
import { notFoundError, unauthorizedError } from './generalErrorService';

export const itemService = {
  async addNewItem(newItem: AddNewItemRequestModel): Promise<number> {
    const user = userRepository.getUserById(newItem.userId);

    if (!user) {
      throw notFoundError('User not found with this id');
    }

    return await itemRepository.addNewItem(
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

  async getAllSelableItems(userId: number) {},

  async setItemSalability(itemId: number, userId: number): Promise<void> {
    const itemData = await itemRepository.getItemById(itemId);
    const userData = await userRepository.getUserById(userId);

    if (!itemData) {
      throw notFoundError('Item not found');
    }

    if (itemData.sellersName !== userData.name) {
      throw unauthorizedError('You can not modify an item if it is not yours');
    }

    itemData.selable
      ? itemRepository.setItemSalabilityToFalse(itemId)
      : itemRepository.setItemSalabilityToTrue(itemId);
  },
};
