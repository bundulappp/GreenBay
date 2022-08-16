import { UserDomainModel } from '../../src/models/domian/UserDomainModel';
import { AddNewItemRequestModel } from '../../src/models/request/AddNewItemRequestModel';
import { itemRepository } from '../../src/repositories/itemRepository';
import { userRepository } from '../../src/repositories/userRepository';
import { notFoundError } from '../../src/services/generalErrorService';
import { itemService } from '../../src/services/itemService';

describe('itemService', () => {
  it('user not found', async () => {
    //Arrange
    const itemData: AddNewItemRequestModel = {
      itemName: 'Phone',
      description: 'iphone',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1120,
      userId: 66,
    };

    userRepository.getUserById = jest.fn().mockResolvedValue(null);
    itemRepository.addNewItem = jest.fn();
    try {
      //Act
      const result = await itemService.addNewItem(itemData);
    } catch (error) {
      //Assert
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(66);
      expect(error).toEqual(notFoundError('User not found with this id'));
    }
  });

  it('item added and send return the item id', async () => {
    //Arrange
    const itemData: AddNewItemRequestModel = {
      itemName: 'Phone',
      description: 'iphone',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1120,
      userId: 66,
    };

    const userData: UserDomainModel = {
      id: 66,
      password: 'asasdaélkpőok',
      name: 'patrik',
      dollar: 100,
    };
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.addNewItem = jest.fn().mockResolvedValue(1);
    //Act
    const result = await itemService.addNewItem(itemData);
    //Assert
    expect(result).toEqual(1);
  });
});
