import { ItemDataDomainModel } from '../models/domian/ItemDataDomainModel';
import { ItemIsSelable } from '../models/enums/ItemIsSellable';
import { AddNewItemRequestModel } from '../models/request/AddNewItemRequestModel';
import { GetAllSaleableItemViewModel } from '../models/view/GetAllSaleableItemViewModel';
import { itemRepository } from '../repositories/itemRepository';
import { userRepository } from '../repositories/userRepository';
import {
  forbiddenError,
  notFoundError,
  unauthorizedError,
} from './generalErrorService';

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

  async getAllSelableItems(): Promise<GetAllSaleableItemViewModel[]> {
    return await itemRepository.getAllSelableItems();
  },

  async setItemSalability(itemId: number, userId: number): Promise<void> {
    const itemData = await itemRepository.getItemById(itemId);
    const userData = await userRepository.getUserById(userId);

    if (!itemData) {
      throw notFoundError('Item not found');
    }

    if (itemData.sellersName !== userData.name) {
      throw unauthorizedError('You can not modify an item if it is not yours');
    }

    if (itemData.selable === ItemIsSelable.sold) {
      throw forbiddenError('Item is already sold');
    }

    itemData.selable === ItemIsSelable.saleable
      ? itemRepository.setItemSalabilityToUnsaleable(itemId)
      : itemRepository.setItemSalabilityToSaleable(itemId);
  },
};
